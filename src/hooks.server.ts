import { connectToDatabase } from '$lib/server/db';
import { verifyToken } from '$lib/server/auth';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  // ភ្ជាប់ទៅ MongoDB
  const db = await connectToDatabase();
  event.locals.db = db

  // ពិនិត្យមើល Token ពី Cookie
  const token = event.cookies.get('auth-token');
  
  if (token) {
    const user = verifyToken(token);
    if (user) {
      event.locals.user = user;
    } else {
      // បើ Token មិនត្រឹមត្រូវ លុប Cookie ចោល
      event.cookies.delete('auth-token', { path: '/' });
    }
  }

  // ការពារ Route ដែលត្រូវការ Login
  if (event.url.pathname.startsWith('/todo')) {
    if (!event.locals.user) {
      throw redirect(303, '/login');
    }
  }

  // បើអ្នកប្រើបាន Login រួចហើយ មិនអាចចូលទំព័រ Login/Register ទៀតទេ
  if ((event.url.pathname === '/login' || event.url.pathname === '/register') && event.locals.user) {
    throw redirect(303, '/todo');
  }


  return resolve(event);
};