import type { ChangeEvent, FC } from 'react';
import type { TodoItemTypes } from './todo-item.types';
import { memo } from 'react';

export const TodoItemComponent: FC<TodoItemTypes> = ({todo, updateStatus, handleDelete}) => {
  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const checked = ev.target.checked;
    if (typeof updateStatus === 'function') {
      updateStatus(todo.id, checked);
    }
  };
  const deleteTodo = () => {
    if (typeof handleDelete === 'function') {
      handleDelete(todo.id);
    }
  };
  return (
    <li key={todo.id} className="gap-4 flex col-auto m-2 w-60 justify-between content-center">
      <label className="flex items-center gap-2">
        {Boolean(updateStatus) && <input type="checkbox" checked={todo.completed} onChange={handleChange}/>}
        <span className="text-gray-700 text-base">{todo.text}</span>
      </label>
      {Boolean(handleDelete) && <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={deleteTodo}
      >
        Delete
      </button>}
    </li>
  );
};

export const TodoItemComponentWithMemo = memo(TodoItemComponent);
TodoItemComponentWithMemo.displayName = 'TodoItemComponentWithMemo';
