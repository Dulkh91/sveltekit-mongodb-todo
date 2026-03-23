import type { PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { verifyUser, generateToken } from '$lib/server/auth';
import type { Actions } from './$types';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;


export const actions: Actions = {
  default: async ({ request, cookies, locals }) => {
    const data = await request.formData();
    const email = data.get('email')?.toString();
    const password = data.get('password')?.toString();
    

    if (!email || !password) {
      return fail(400, { 
        error: 'សូមបញ្ចូលអ៊ីមែល និងពាក្យសម្ងាត់',
        email
      });
    }

    // ផ្ទៀងផ្ទាត់អ្នកប្រើប្រាស់
    const user = await verifyUser(locals.db, email, password);
    
    if (!user) {
      return fail(400, { 
        error: 'អ៊ីមែល ឬពាក្យសម្ងាត់មិនត្រឹមត្រូវ',
        email
      });
    }

    // បង្កើត Token
    const token = generateToken(user);

    // កំណត់ Cookie
    cookies.set('auth-token', token, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7 // 7 ថ្ងៃ
    });

    throw redirect(303, '/todo');
  }
};