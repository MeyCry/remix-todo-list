import type { TodoItem } from '~/components/todo/todo.types';

export type TodoItemTypes = {
  key: string;
  todo: TodoItem;
  handleDelete?: (id: string) => void;
  updateStatus?: (id: string, checked: boolean) => void;
}
