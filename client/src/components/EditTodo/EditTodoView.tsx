import React from 'react';
import { EditIcon, CrossIcon } from '@welcome-ui/icons';
import { Button } from '@welcome-ui/button';
import { Flex } from '@welcome-ui/flex';
import { Text } from '@welcome-ui/text';
import { Box } from '@welcome-ui/box';
import { AddTodoForm, FormDataType } from '../Form/TodoForm';
import { Todo } from '../ListTodo/ListTodosContainer';

export type EditTodoProps = {
  ToggleCreateTodoModal: () => void;
  showCreateTodoDialog: boolean;
  todo: Todo;
  handleFormSubmit: (formData: FormDataType) => void;
  setTodoToCompleted: (arr: number, arr2: boolean) => void;
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
          <Box className="dialog">
            <Flex direction="column" justify="center">
              <Text variant="h2" color="black" mt="0px">
                Editing todo item
              </Text>
              <AddTodoForm
                submitHandler={(data: FormDataType) => handleFormSubmit(data)}
                todo={todo}
                submitButtonText="Mettre à jour"
                toggleModal={ToggleCreateTodoModal}
                setTodoToCompleted={setTodoToCompleted}
              />
            </Flex>
          </Box>
          <div className="backdrop" onClick={ToggleCreateTodoModal}></div>
        </>
      )}
    </>
  );
};
