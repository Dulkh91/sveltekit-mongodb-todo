import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({url,locals}) => {
    if(url.pathname === '/'){
        throw redirect(303, locals.user? '/todo': '/login')
    }
    return {};
}) satisfies LayoutServerLoad;