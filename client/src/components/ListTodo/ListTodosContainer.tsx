import { useEffect, useState } from 'react';
import { ListTodosView } from './ListTodosView';

export type Todo = {
  description: string;
  todo_id: number;
};

export const ListTodosContainer = () => {
  const [todos, setTodos] = useState([]);

  async function getTodos() {
    try {
      await fetch('/todos', {
        method: 'get',
      })
        .then((res) => res.json())
        .then((todoArray) => setTodos(todoArray));
    } catch (error) {
      console.error({ error });
    }
  }

  useEffect(() => {
    getTodos();
  }, []);

  async function deleteTodo(id: number) {
    try {
      await fetch(`/todos/${id}`, {
        method: 'delete',
      }).then((res) => res.json());
      setTodos((todos) => todos.filter((todo: Todo) => todo.todo_id !== id));
    } catch (error) {
      console.error({ error });
    }
  }

  return <ListTodosView todos={todos} deleteTodo={deleteTodo} />;
};
