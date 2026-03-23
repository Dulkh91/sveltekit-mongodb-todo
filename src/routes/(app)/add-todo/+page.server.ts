import type { PageServerLoad, Actions } from './$types';
import { createTodo } from '$lib/server/todo';
import { fail,redirect } from '@sveltejs/kit';


export const load = (async ({locals}) => {
    if(!locals.user){
        throw redirect(303, '/login')
    }
}) satisfies PageServerLoad;


export const actions: Actions = {
    default: async({request, locals}) => {
        const data = await request.formData()
        const title = data.get('addtodo')?.toString()
        const description = data.get('description')?.toString()
        const priority = data.get("priority")?.toString();

        if(!title){
            return fail(400, {
                error: 'សូមបញ្ចូលចំណងជើងកិច្ចការ',
                description,
                priority
            });
        }

        try {
            await createTodo(locals.db, locals.user.userId,{
                title: title,
                description,
                priority: priority || "mediam"
            })
        } catch (error) {
            console.error('Error creating todo:', error);
            return fail(500, { error: 'មានបញ្ហាពេលបង្កើត TODO' });
        }
        throw redirect(303, '/todo');
    }
}
