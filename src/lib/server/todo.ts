
import type { Db } from 'mongodb';
import { ObjectId as MongoObjectId } from 'mongodb';
import type {Todo, CreateTodoDto, UpdateTodoDto} from '../server/model/todo.model'

export async function createTodo(
    db: Db,
    userId: string,
    todoData: CreateTodoDto
): Promise<Todo>{
    const todo: Todo = {
        userId,
        title: todoData.title,
        description: todoData.description || '',
        completed: false,
        createdAt: new Date,
        updatedAt: new Date,
        dueDate: todoData.dueDate,
        priority: todoData.priority || 'mediam'
    };

    const result = await db.collection('todos').insertOne(todo)
    return {...todo, _id: result.insertedId}
}

//MARK: យក Todos ទាំងអស់របស់ User
export async function getUserTodos(
  db: Db, 
  userId: string,
  filter?: {
    completed?: boolean;
    priority?: string;
  }
): Promise<Todo[]> {
  const query: any = { userId };
  
  if (filter?.completed !== undefined) {
    query.completed = filter.completed;
  }
  
  if (filter?.priority) {
    query.priority = filter.priority;
  }

  return await db
    .collection<Todo>('todos')
    .find(query)
    .sort({ createdAt: -1 }) // ថ្មីបំផុតមុនគេ
    .toArray();
}

//MARK: យក Todo តាម ID
export async function getTodoById(
  db: Db, 
  todoId: string, 
  userId: string
): Promise<Todo | null> {
  return await db
    .collection<Todo>('todos')
    .findOne({
    _id: new MongoObjectId(todoId),
    userId
  });
}

//MARK: កែប្រែ Todo
export async function updateTodo(
  db: Db,
  todoId: string,
  userId: string,
  updates: UpdateTodoDto
): Promise<Todo | null> {
  const result = await db
    .collection<Todo>('todos')
    .findOneAndUpdate(
    {
      _id: new MongoObjectId(todoId),
      userId
    },
    {
      $set: {
        ...updates,
        updatedAt: new Date()
      }
    },
    { returnDocument: 'after' }
  );
  return result;
}

//MARK: លុប Todo
export async function deleteTodo(
  db: Db,
  todoId: string,
  userId: string
): Promise<boolean> {
  const result = await db.collection('todos').deleteOne({
    _id: new MongoObjectId(todoId),
    userId
  });

  return result.deletedCount > 0;
}
// export async function deleteTodo(
//   db: Db,
//   todoId: string,
//   userId: string
// ): Promise<{ success: boolean; error?: string }> {
//   try {
//     const result = await db.collection('todos').deleteOne({
//       _id: new ObjectId(todoId),
//       userId
//     });
    
//     if (result.deletedCount === 0) {
//       return { 
//         success: false, 
//         error: 'មិនឃើញមានកិច្ចការនេះទេ' 
//       };
//     }
    
//     return { success: true };
//   } catch (error) {
//     console.error('Error deleting todo:', error);
//     return { 
//       success: false, 
//       error: 'មានបញ្ហាក្នុងការលុបកិច្ចការ' 
//     };
//   }
// }

//MARK: ប្តូរស្ថានភាព Todo (completed/uncompleted)
export async function toggleTodoStatus(
  db: Db,
  todoId: string,
  userId: string
): Promise<Todo | null> {
  const todo = await getTodoById(db, todoId, userId);
  
  if (!todo) return null;

  return await updateTodo(db, todoId, userId, {
    completed: !todo.completed
  });
}

//MARK: រាប់ចំនួន Todos របស់ User
export async function countUserTodos(
  db: Db,
  userId: string
): Promise<{ total: number; completed: number; pending: number }> {
  const [total, completed, pending] = await Promise.all([
    db.collection('todos').countDocuments({ userId }),
    db.collection('todos').countDocuments({ userId, completed: true }),
    db.collection('todos').countDocuments({ userId, completed: false })
  ]);

  return { total, completed, pending };
}