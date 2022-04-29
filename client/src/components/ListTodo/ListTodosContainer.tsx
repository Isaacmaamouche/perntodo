import { useEffect, useState } from 'react';
import EditTodoContainer from '../EditTodo/EditTodoContainer';
import { CrossIcon } from '@welcome-ui/icons';
import { Button } from '@welcome-ui/button';
import { Box } from '@welcome-ui/box';
import { Flex } from '@welcome-ui/flex';
import { Table } from '@welcome-ui/table';
import { Accordion } from '@welcome-ui/accordion';

export type Todo = {
  description: string;
  todo_id: number;
};

export default function ListTodos() {
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

  return (
    <div>
      {todos.length > 0 ? (
        <>
          <Table>
            <Table.Tbody>
              {todos.map((todo: Todo, index: number) => (
                <Table.Tr key={todo.todo_id}>
                  <Table.Td>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      key={todo.todo_id}
                    >
                      <div>{todo.description}</div>

                      <Box display="flex" gap=".5rem">
                        <EditTodoContainer todo={todo} />

                        <Button
                          variant="primary-danger"
                          shape="circle"
                          size="sm"
                          onClick={() => deleteTodo(todo.todo_id)}
                        >
                          <CrossIcon size="lg" />
                        </Button>
                      </Box>
                    </Box>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </>
      ) : (
        <p>There is no Todo item yet. Create one to update the list !</p>
      )}
    </div>
  );
}
