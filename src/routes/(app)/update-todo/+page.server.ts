import { fail,redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getTodoById,updateTodo } from '$lib/server/todo';
import { connectToDatabase } from '$lib/server/db/client';


//Retriev data send to form
export const load = (async ({url,locals}) => {
    const todoId = url.searchParams.get('id')

    if(!locals.user){
        throw redirect(303, '/login')
    }

    if(!todoId){
        return{
            todo: null,
            error: 'មិនមានលេខសម្គាល់កិច្ចការ'
        } 
    }

    try {
        const todo = await getTodoById(locals.db, todoId, locals.user.userId)

        if(!todo){
            return{
                todo: null,
                error: 'មិនឃើញមានកិច្ចការនេះទេ'
            }
        }

        return {
            todo: {
                _id: todo._id?.toString(),
                title: todo.title,
                description: todo.description || '',
                priority: todo.priority || 'medium',
                completed: todo.completed
            }
        };
    } catch (error) {
        console.error('Error loading todo:', error);
        return {
            todo: null,
            error: 'មានបញ្ហាក្នុងការដកទិន្នន័យ'
        };
    }


}) satisfies PageServerLoad;


// To send update to database

export const actions: Actions ={
    default: async({request, locals})=>{
        const data = await request.formData()
        const title = data.get('title')?.toString()
        const description = data.get('description')?.toString()
        const priority = data.get('priority')?.toString()
        const todoId = data.get('todoId')?.toString()

         // ពិនិត្យមើលទិន្នន័យ
        if (!todoId) {
            return fail(400, { error: 'មិនមានលេខសម្គាល់កិច្ចការ' });
        }
        
        if (!title) {
            return fail(400, { 
                error: 'សូមបញ្ចូលចំណងជើងកិច្ចការ',
                todo: { _id: todoId, title, description, priority }
            });
        }

        try {
            const db = await connectToDatabase()
            const updateData = await updateTodo(db, todoId,locals.user.userId,{
                title: title,
                description,
                priority: priority || 'mediam'
            })

            console.log("DB", db)
             if (!updateData) {
                return fail(404, { 
                    error: 'មិនឃើញមានកិច្ចការនេះទេ ឬអ្នកគ្មានសិទ្ធិកែប្រែ'
                });
            }

        } catch (error) {
            console.error('Error updating todo:', error);
            return fail(500, { 
                error: 'មានបញ្ហាក្នុងការកែប្រែកិច្ចការ',
                todo: { _id: todoId, title, description, priority, completed }
            });
        }


         // បញ្ជូនត្រឡប់ទៅកាន់ Todo List ជាមួយ success message
        throw redirect(303, '/todo');
    }
}