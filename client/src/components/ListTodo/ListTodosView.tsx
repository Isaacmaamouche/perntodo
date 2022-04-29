import type { Todo } from './ListTodosContainer';
import { EditTodoContainer } from '../EditTodo/EditTodoContainer';
import { CrossIcon } from '@welcome-ui/icons';
import { Button } from '@welcome-ui/button';
import { Box } from '@welcome-ui/box';
import { Table } from '@welcome-ui/table';
import { Accordion } from '@welcome-ui/accordion';

export type ListTodosProps = {
  todos: Todo[];
  deleteTodo: (arr: number) => void;
};

export const ListTodosView: React.FC<ListTodosProps> = ({
  todos,
  deleteTodo,
}) => {
  return (
    <>
      {todos.length > 0 ? (
        <>
          <Table>
            <Table.Tbody>
              {todos.map((todo: Todo) => (
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
    </>
  );
};
