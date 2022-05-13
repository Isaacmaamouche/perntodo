import { Button } from '@welcome-ui/button';
import { Text } from '@welcome-ui/text';
import { AddIcon, CrossIcon } from '@welcome-ui/icons';
import { Box } from '@welcome-ui/box';
import { Flex } from '@welcome-ui/flex';
import React from 'react';
import { TodoForm, FormDataType } from '../Form/TodoForm';
import { FormDialog } from '../Dialog/FormDialog';

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
          Créer une Tâche
        </Text>
        <AddIcon />
      </Button>

      {showCreateTodoDialog && (
        <FormDialog
          ToggleCreateTodoModal={ToggleCreateTodoModal}
          handleFormSubmit={handleFormSubmit}
          dialogHeading="Créer une nouvelle tâche"
          submitButtonText="Créer"
        />
      )}
    </>
  );
};
