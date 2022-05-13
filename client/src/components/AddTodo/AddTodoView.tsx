import { Button } from '@welcome-ui/button';
import { Text } from '@welcome-ui/text';
import { AddIcon, CrossIcon } from '@welcome-ui/icons';
import { Box } from '@welcome-ui/box';
import { Flex } from '@welcome-ui/flex';
import React from 'react';
import { AddTodoForm, FormDataType } from '../Form/TodoForm';

export type AddTodoProps = {
  ToggleCreateTodoModal: () => void;
  showCreateTodoDialog: boolean;
  handleFormSubmit: (formData: FormDataType) => void;
};

export const AddTodoView: React.FC<AddTodoProps> = ({
  ToggleCreateTodoModal,
  showCreateTodoDialog,
  handleFormSubmit,
}) => {
  return (
    <>
      <Button variant="primary-info" onClick={ToggleCreateTodoModal}>
        <Text variant="body2" as="span">
          Add todo
        </Text>
        <AddIcon />
      </Button>

      {showCreateTodoDialog && (
        <>
          <Box className="dialog">
            <Flex direction="column" justify="center">
              <Text variant="h2" color="black" mt="0px">
                Add a todo item
              </Text>
              <AddTodoForm
                submitHandler={handleFormSubmit}
                submitButtonText="Créer une nouvelle tâche"
                toggleModal={ToggleCreateTodoModal}
              />
            </Flex>
          </Box>
          <div className="backdrop" onClick={ToggleCreateTodoModal}></div>
        </>
      )}
    </>
  );
};
