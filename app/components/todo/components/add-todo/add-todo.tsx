import { type FC, type FormEvent, useState, memo } from 'react';
import type { TodoItem } from '~/components/todo/todo.types';
import type { AddTodoTypes } from './add-todo.types';

export const AddTodo: FC<AddTodoTypes> = ({addTodo}) => {
  const [newTodoValue, setNewTodoValue] = useState('');

  const handleChangeNewTodoValue = (ev: FormEvent<HTMLInputElement>) => {
    setNewTodoValue(ev.currentTarget.value);
  };

  const handleAddTodoItem = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const newTodo: TodoItem = {
      id: crypto.randomUUID(),
      text: newTodoValue,
      completed: false,
    };
    addTodo(newTodo);
    setNewTodoValue('');
  };

  return (
    <form onSubmit={handleAddTodoItem}>
      <input
        name="new_todo"
        type="text"
        value={newTodoValue}
        onChange={handleChangeNewTodoValue}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export const AddTodoWithMemo = memo(AddTodo);
AddTodoWithMemo.displayName = 'AddTodoWithMemo';
