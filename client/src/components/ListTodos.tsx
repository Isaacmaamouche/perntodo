import { useEffect, useState } from 'react';
import EditTodo from '../components/EditTodo';

export type Todo = {
  description: string;
  todo_id: number;
};

export default function ListTodos() {
  const [todos, setTodos] = useState([]);

  async function getTodos() {
    try {
      await fetch('http://localhost:5000/todos', {
        method: 'get'
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
    console.log('delete ', id);
    try {
      await fetch(`http://localhost:5000/todos/${id}`, {
        method: 'delete'
      }).then((res) => res.json());
      setTodos((todos) => todos.filter((todo: Todo) => todo.todo_id !== id));
    } catch (error) {
      console.error({ error });
    }
  }

  return (
    <div>
      {todos.length > 0 ? (
        <table className="table text-light mt-5">
          <thead>
            <tr>
              <th>Description</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo: Todo) => (
              <tr key={todo.todo_id}>
                <td>{todo.description}</td>

                <td>
                  <EditTodo todo={todo} />
                </td>
                <td>
                  <button
                    className="btn btn-danger px-5"
                    onClick={() => deleteTodo(todo.todo_id)}
                  >
                    Delete todo
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>There is no Todo item yet. Create one to update the list !</p>
      )}
    </div>
  );
}
