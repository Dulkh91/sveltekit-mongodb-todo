import type { ObjectId } from "mongodb";

export interface Todo {
  _id?: ObjectId;
  userId: string;        // ភ្ជាប់ទៅកាន់ User
  title: string;         // ចំណងជើង Todo
  description?: string;  // សេចក្តីលម្អិត (មិនចាំបាច់)
  completed: boolean;    // ស្ថានភាព
  createdAt: Date;       // កាលបរិច្ឆេទបង្កើត
  updatedAt: Date;       // កាលបរិច្ឆេទកែប្រែ
  dueDate?: Date;        // ថ្ងៃផុតកំណត់ (មិនចាំបាច់)
  priority?: 'low' | 'mediam' | 'high'; // កម្រិតអាទិភាព
}

// សម្រាប់បង្កើត Todo ថ្មី
export interface CreateTodoDto {
  title: string;
  description?: string;
  dueDate?: Date;
  priority?: 'low' | 'mediam' | 'high';
}

// សម្រាប់កែប្រែ Todo
export interface UpdateTodoDto {
  title?: string;
  description?: string;
  completed?: boolean;
  dueDate?: Date;
  priority?: 'low' | 'mediam' | 'high';
}