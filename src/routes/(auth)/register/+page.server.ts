
import { fail, redirect } from '@sveltejs/kit';
import { createUser, generateToken } from '$lib/server/auth';
import type { Actions } from './$types';

export const actions: Actions = {
  default: async ({ request, cookies, locals }) => {
    const data = await request.formData();
    const name = data.get('name')?.toString();
    const email = data.get('email')?.toString();
    const password = data.get('password')?.toString();
    const confirmPassword = data.get('confirmPassword')?.toString();

    // ពិនិត្យមើលថាទិន្នន័យបានបញ្ចូលពេញលេញ
    if (!name || !email || !password || !confirmPassword) {
      return fail(400, { 
        error: 'សូមបំពេញព័ត៌មានទាំងអស់',
        name, email
      });
    }

    // ពិនិត្យមើលពាក្យសម្ងាត់ទាំងពីរត្រូវគ្នា
    if (password !== confirmPassword) {
      return fail(400, { 
        error: 'ពាក្យសម្ងាត់ទាំងពីរមិនត្រូវគ្នា',
        name, email
      });
    }

    // ពិនិត្យមើលប្រវែងពាក្យសម្ងាត់
    if (password.length < 6) {
      return fail(400, { 
        error: 'ពាក្យសម្ងាត់ត្រូវមានយ៉ាងហោចណាស់ ៦ តួអក្សរ',
        name, email
      });
    }

    try {
      // បង្កើតអ្នកប្រើប្រាស់ថ្មី
      const newUser = await createUser(locals.db, email, password, name);
      
      // បង្កើត Token
      const token = generateToken(newUser);

      // កំណត់ Cookie
      cookies.set('auth-token', token, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7 // 7 ថ្ងៃ
      });

    } catch (error: any) {
      return fail(400, { 
        error: error.message,
        name, email
      });
    }

    throw redirect(303, '/todo');
  }
};



