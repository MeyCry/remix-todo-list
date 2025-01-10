import { type FC, useCallback, useEffect, useState } from 'react';
import type { TodoItem } from '~/components/todo/todo.types';
import { AddTodoWithMemo } from '~/components/todo/components/add-todo/add-todo';
import { TodoItemComponentWithMemo } from '~/components/todo/components/todo-item/todo-item';
import { useFetchHook } from '~/hooks/use-fetch.hook';

export const Todo: FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const {loading, data} = useFetchHook('/api/todo');

  const postChanges = (todos: TodoItem[]) => {
    requestIdleCallback(async () => {
      try {
        const response = await fetch('/api/todo', {
          method: 'POST',
          body: JSON.stringify(todos),
        });

        if (response.status !== 200) {
          throw new Error(`Update request unsuccessful.`);
        }
        return 'ok';
      } catch (e) {
        console.error(e);
      }
    });
  };

  useEffect(() => {
    if (!loading) {
      setTodos(data);
    }
  }, [loading, data]);

  const updateStatus = useCallback((id: string, checked: boolean) => {
    setTodos((oldTodos) => {
      const newTodos = oldTodos.map((todo) =>
        todo.id === id
          ? {...todo, completed: checked}
          : todo,
      );
      postChanges(newTodos);
      return newTodos;
    });
  }, []);

  const handleDelete = useCallback((id: string) => {
    setTodos((oldTodos) => {
      const newTodos = oldTodos.filter((todo) => todo.id !== id);
      postChanges(newTodos);
      return newTodos;
    });
  }, []);

  const addTodo = useCallback((newTodoItem: TodoItem) => {
    setTodos((oldTodos) => {
      const newTodos = [newTodoItem, ...oldTodos];
      postChanges(newTodos);
      return newTodos;
    });
  }, []);

  return (
    <div>
      <AddTodoWithMemo addTodo={addTodo}/>
      {loading ?
        <div>Loading</div> :
        <ul>
          {todos
            .sort((a, b) => {
              if (a.completed === b.completed) {
                return 0;
              }
              return a.completed ? 1 : -1;
            })
            .map((todo) => (
              <TodoItemComponentWithMemo
                key={todo.id}
                todo={todo}
                handleDelete={handleDelete}
                updateStatus={updateStatus}
              />
            ))}
        </ul>}
    </div>
  );
};
