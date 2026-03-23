import type { PageServerLoad, Actions } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async () => {
   throw redirect(303, '/')
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async({cookies})=>{
        cookies.delete('auth-token', {path: '/'})
        throw redirect(303, '/login')
    }
}