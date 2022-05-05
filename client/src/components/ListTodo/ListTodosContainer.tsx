import { useEffect, useState } from 'react';
import { useRenderContext } from '../../context/renderContext';
import { ListTodosView } from './ListTodosView';

export type Todo = {
  description: string;
  todo_id: number;
  emoji: string;
  date: string;
  completed: boolean;
  tag: string[];
  title: string;
};

export type completedTodoPayload = { completed: boolean };

export const ListTodosContainer = () => {
  const [todos, setTodos] = useState([]);
  const { render, triggerRender } = useRenderContext();

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
  }, [render]);

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

  async function completedTodo(id: number, completed: boolean) {
    try {
      const body: completedTodoPayload = {
        completed,
      };
      await fetch(`/todos/${id}`, {
        method: 'put',
        headers: { 'Content-Type': 'Application/JSON' },
        body: JSON.stringify(body),
      }).then(() => triggerRender(render + 1));
    } catch (error) {
      console.error({ error });
    }
  }

  return (
    <ListTodosView
      todos={todos}
      deleteTodo={deleteTodo}
      completedTodo={completedTodo}
    />
  );
};
