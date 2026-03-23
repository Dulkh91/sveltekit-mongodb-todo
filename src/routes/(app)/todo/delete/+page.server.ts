import type { PageServerLoad, Actions } from './$types';
import { deleteTodo } from '$lib/server/todo';
import { fail, redirect } from '@sveltejs/kit';

export const load = (async () => {
    throw redirect(303,'/todo');
}) satisfies PageServerLoad;

export const actions: Actions ={
    default: async ({request, locals}) =>{
        if(!locals.user){
            throw redirect(303, '/login')
        }

        const data = await request.formData()
        const todoId = data.get('todoDeleteId')?.toString()

        if(!todoId){
            return fail(400, {error: 'មិនមានលេខសម្គាល់កិច្ចការ'})
        }

        try {
            await deleteTodo(locals.db, todoId, locals.user.userId)
        } catch (error) {
            return fail(500, { error: 'មានបញ្ហាក្នុងការលុបកិច្ចការ' })
        }

        // console.log("Id todo ", todoId)
        return {success: true}
    }
}