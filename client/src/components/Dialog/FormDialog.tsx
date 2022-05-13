import { Box } from '@welcome-ui/box';
import { Flex } from '@welcome-ui/flex';
import { Text } from '@welcome-ui/text';
import { TodoForm, FormDataType } from '../Form/TodoForm';
import { Todo } from '../ListTodo/ListTodosContainer';

export type FormDialogProps = {
  ToggleCreateTodoModal: () => void;
  dialogHeading: string;
  submitButtonText: string;
  handleFormSubmit: (formData: FormDataType) => void;
  todo?: Todo;
  setTodoToCompleted?: (arr: number, arr2: boolean) => void;
};

export const FormDialog: React.FC<FormDialogProps> = ({
  ToggleCreateTodoModal,
  dialogHeading,
  submitButtonText,
  handleFormSubmit,
  todo,
  setTodoToCompleted,
}) => {
  return (
    <>
      <Box className="dialog">
        <Flex direction="column" justify="center">
          <Text variant="h2" color="black" mt="0px">
            {dialogHeading}
          </Text>
          <TodoForm
            submitHandler={handleFormSubmit}
            submitButtonText={submitButtonText}
            toggleModal={ToggleCreateTodoModal}
            todo={todo}
            setTodoToCompleted={setTodoToCompleted}
          />
        </Flex>
      </Box>
      <div className="backdrop" onClick={ToggleCreateTodoModal}></div>
    </>
  );
};
