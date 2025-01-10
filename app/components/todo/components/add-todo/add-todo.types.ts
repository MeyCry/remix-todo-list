import type { TodoItem } from '~/components/todo/todo.types';

export type AddTodoTypes = {
  addTodo: (newTodoItem: TodoItem) => void;
}
