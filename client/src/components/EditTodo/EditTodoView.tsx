import React from 'react';
import { EditIcon, CrossIcon } from '@welcome-ui/icons';
import { Button } from '@welcome-ui/button';
import { Flex } from '@welcome-ui/flex';
import { Text } from '@welcome-ui/text';
import { Box } from '@welcome-ui/box';
import { TodoForm, FormDataType } from '../Form/TodoForm';
import { Todo } from '../ListTodo/ListTodosContainer';
import { FormDialog } from '../Dialog/FormDialog';

export type EditTodoProps = {
  ToggleCreateTodoModal: () => void;
  showCreateTodoDialog: boolean;
  todo: Todo;
  setTodoToCompleted: (arr: number, arr2: boolean) => void;
  handleFormSubmit: (formData: FormDataType) => void;
};

export const EditTodoView: React.FC<EditTodoProps> = ({
  ToggleCreateTodoModal,
  showCreateTodoDialog,
  handleFormSubmit,
  todo,
  setTodoToCompleted,
}) => {
  return (
    <>
      <Button
        variant="primary-warning"
        onClick={ToggleCreateTodoModal}
        shape="circle"
        size="sm"
      >
        <EditIcon size="lg" />
      </Button>

      {showCreateTodoDialog && (
        <>
          <FormDialog
            ToggleCreateTodoModal={ToggleCreateTodoModal}
            handleFormSubmit={handleFormSubmit}
            todo={todo}
            setTodoToCompleted={setTodoToCompleted}
            dialogHeading="Modifier tâche"
            submitButtonText="Modifier"
          />
          {/* <Box className="dialog">
            <Flex direction="column" justify="center">
              <Text variant="h2" color="black" mt="0px">
                Editing todo item
              </Text>
              <TodoForm
                submitHandler={(data: FormDataType) => handleFormSubmit(data)}
                toggleModal={ToggleCreateTodoModal}
                todo={todo}
                setTodoToCompleted={setTodoToCompleted}
                submitButtonText="Mettre à jour"
              />
            </Flex>
          </Box>
          <div className="backdrop" onClick={ToggleCreateTodoModal}></div> */}
        </>
      )}
    </>
  );
};
