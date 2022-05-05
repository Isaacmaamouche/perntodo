import type { Todo } from './ListTodosContainer';
import { Box } from '@welcome-ui/box';
import { Table } from '@welcome-ui/table';
import { Accordion } from '@welcome-ui/accordion';
import { Text } from '@welcome-ui/text';
import { ListTodosEditBar } from './ListTodosEditBar';

export type ListTodosProps = {
  todos: Todo[];
  deleteTodo: (arr: number) => void;
  completedTodo: (arr: number, arr2: boolean) => void;
};

export const ListTodosView: React.FC<ListTodosProps> = ({
  todos,
  deleteTodo,
  completedTodo,
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
                    <Accordion
                      title={
                        <Box display="flex" alignItems="center" gap="5px">
                          {todo.todo_id} -{' '}
                          {todo.completed == false ? 'En cours' : 'Terminée'} |
                          ⌚
                          <Text as="h3" m="0" fontWeight="bold">
                            🙊 {todo.emoji}
                          </Text>
                          <Text as="h3" m="0" fontWeight="bold">
                            {todo.title}
                          </Text>
                        </Box>
                      }
                    >
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="left"
                        gap="5px"
                      >
                        <Text as="h3" m="0" fontWeight="bold">
                          Date : {todo.date} | En retard !
                        </Text>
                        <Text as="h3" m="0" fontWeight="bold">
                          {todo.description}
                        </Text>
                        <ListTodosEditBar
                          deleteTodo={deleteTodo}
                          completedTodo={completedTodo}
                          todo={todo}
                        />
                      </Box>
                    </Accordion>
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
