import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN } from '$env/static/private';
import type { Db } from 'mongodb';
import type { JWTPayload} from '../server/model/user.model'


// បង្កើតអ្នកប្រើប្រាស់ថ្មី
export async function createUser(db: Db, email: string, password: string, name: string) {
  // ពិនិត្យមើលថាអ៊ីមែលមានរួចហើយឬនៅ
  const existingUser = await db.collection('users').findOne({ email });
  if (existingUser) {
    throw new Error('អ៊ីមែលនេះមានរួចហើយ');
  }

  // ធ្វើ Hashing ពាក្យសម្ងាត់
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = {
    email,
    password: hashedPassword,
    name,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const result = await db.collection('users').insertOne(user);
  return { ...user, _id: result.insertedId };
}

// ផ្ទៀងផ្ទាត់ពាក្យសម្ងាត់ពេល Login
export async function verifyUser(db: Db, email: string, password: string) {
  const user = await db.collection('users').findOne({ email });
  
  if (!user) {
    return null;
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return null;
  }

  return user;
}

// បង្កើត JWT Token
export function generateToken(user: any): string {
  const payload: JWTPayload = {
    userId: user._id.toString(),
    email: user.email,
    name: user.name
  };

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  });
}

// ផ្ទៀងផ្ទាត់ JWT Token
export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    return null;
  }
}