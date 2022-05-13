import { Box } from '@welcome-ui/box';
import { Button } from '@welcome-ui/button';
import { CheckIcon, CrossIcon, ResetIcon } from '@welcome-ui/icons';
import { EditTodoContainer } from '../EditTodo/EditTodoContainer';
import { Todo } from './ListTodosContainer';

type ListTodosEditBarProps = {
  todo: Todo;
  deleteTodo: (arr: number) => void;
  setTodoToCompleted: (arr: number, arr2: boolean) => void;
};

export const ListTodosEditBar: React.FC<ListTodosEditBarProps> = ({
  deleteTodo,
  setTodoToCompleted,
  todo,
}) => {
  return (
    <Box display="flex" justifyContent="flex-end" gap=".5rem">
      <Button
        variant="primary-danger"
        shape="circle"
        size="sm"
        onClick={() => deleteTodo(todo.todo_id)}
      >
        <CrossIcon size="lg" />
      </Button>
      <EditTodoContainer setTodoToCompleted={setTodoToCompleted} todo={todo} />

      {!todo.completed ? (
        <Button
          variant="primary-success"
          shape="circle"
          size="sm"
          onClick={() => setTodoToCompleted(todo.todo_id, !todo.completed)}
        >
          <CheckIcon size="lg" />
        </Button>
      ) : (
        <Button
          variant="primary-warning"
          shape="circle"
          size="sm"
          onClick={() => setTodoToCompleted(todo.todo_id, !todo.completed)}
        >
          <ResetIcon size="lg" />
        </Button>
      )}
    </Box>
  );
};
