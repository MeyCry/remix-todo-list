import type { MetaFunction } from "@remix-run/node";
import { Todo } from '~/components/todo/todo';

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div>
      <Todo />
    </div>
  );
}
