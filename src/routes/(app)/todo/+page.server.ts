import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions} from './$types';
import { request } from 'https';

export const load = (async () => {
    // if(locals.user){
    //     throw redirect(303,'/login')
    // }
}) satisfies PageServerLoad;

export const actions: Actions = {
    default async(({request, locals}))=>{

    }
}