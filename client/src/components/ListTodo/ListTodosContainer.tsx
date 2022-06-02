import { useEffect, useState } from 'react';
import { useRenderContext } from '../../context/renderContext';
import { ListTodosView } from './ListTodosView';
import { formatToFullDate, dateIsLate } from '../../utils/DateUtils';

export type Todo = {
  description: string;
  todo_id: number;
  emoji: string;
  date: string;
  completed: boolean;
  tag: string[];
  title: string;
};

export type completedTodoPayload = { formData: { completed: boolean } };

export const ListTodosContainer = () => {
  const [todos, setTodos] = useState([]);
  const { renderCount, Rerender } = useRenderContext();

  async function getTodos() {
    try {
      await fetch('/todos', {
        method: 'get',
      })
        .then((res) => res.json())
        .then((todoArray) => setTodos(todoArray))
        .then(() => console.log(todos));
    } catch (error) {
      console.error({ error });
    }
  }

  useEffect(() => {
    getTodos();
  }, [renderCount]);

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

  async function setTodoToCompleted(id: number, completed: boolean) {
    try {
      const body: completedTodoPayload = {
        formData: { completed },
      };
      await fetch(`/todos/${id}`, {
        method: 'put',
        headers: { 'Content-Type': 'Application/JSON' },
        body: JSON.stringify(body),
      }).then(() => Rerender());
    } catch (error) {
      console.error({ error });
    }
  }

  return (
    <ListTodosView
      todos={todos}
      deleteTodo={deleteTodo}
      setTodoToCompleted={setTodoToCompleted}
      formatToFullDate={formatToFullDate}
      dateIsLate={dateIsLate}
    />
  );
};
