import type { ActionFunctionArgs } from '@remix-run/node';
import type { TodoItem } from '~/components/todo/todo.types';

let initialTodos: TodoItem[] = [
  {
    id: 'one',
    text: 'Buy milk',
    completed: false,
  },
  {
    id: 'two',
    text: 'Buy eggs',
    completed: true,
  },
  {
    id: 'three',
    text: 'Buy bread',
    completed: false,
  },
];

export const action = async ({request}: ActionFunctionArgs) => {
  const data = await request.json();
  initialTodos = data;
  return Response.json({message: 'Todo updated!'}, {
    status: 200,
  });
};

export const loader = async () => {
  return Response.json(initialTodos, {
    status: 200,
  });
};
