import React from 'react';
import { EditIcon, CrossIcon } from '@welcome-ui/icons';
import { Button } from '@welcome-ui/button';
import { Flex } from '@welcome-ui/flex';
import { Text } from '@welcome-ui/text';
import { Box } from '@welcome-ui/box';

export type EditTodoProps = {
  ToggleCreateTodoModal: () => void;
  showCreateTodoDialog: boolean;
  newDescription: string;
  description: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  updateTodo: () => void;
};

export const EditTodoView: React.FC<EditTodoProps> = ({
  ToggleCreateTodoModal,
  showCreateTodoDialog,
  description,
  newDescription,
  handleChange,
  updateTodo,
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
            <form>
              <Flex direction="column" gap="1rem" justify="center">
                <Text variant="h2" color="black">
                  Editing todo item
                </Text>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={description}
                  onChange={(e) => handleChange(e)}
                />
                <Flex direction="row" align="right" justify="end" gap="1rem">
                  <Button
                    variant="primary-info"
                    onClick={updateTodo}
                    disabled={newDescription.length == 0 && true}
                  >
                    <Text variant="body2" as="span">
                      Update
                    </Text>
                    <EditIcon />
                  </Button>
                  <Button
                    variant="primary-warning"
                    onClick={ToggleCreateTodoModal}
                  >
                    <Text variant="body2" as="span">
                      Cancel
                    </Text>
                    <CrossIcon />
                  </Button>
                </Flex>
              </Flex>
            </form>
          </Box>
          <div className="backdrop" onClick={ToggleCreateTodoModal}></div>
        </>
      )}
    </>
  );
};
