import { redirect } from '@sveltejs/kit';
import type { PageServerLoad} from './$types';
import { getUserTodos } from '$lib/server/todo';

export const load = (async ({locals}) => {
    if(!locals.user){
        throw redirect(303,'/login')
    }

    try {
        const todosFromDb = await getUserTodos(locals.db, locals.user.userId)
        const todos = todosFromDb.map(todo=>({
            ...todo,
            _id: todo._id?.toString(),
            createdAt: todo.createdAt?.toDateString() ?? todo.createdAt,
            updatedAt: todo.updatedAt?.toDateString() ?? todo.updatedAt
        }))
        return {todos}
    } catch (error) {
        console.error("Error loading todo",error)
        return {
            todos: []
        }
    }

}) satisfies PageServerLoad;
