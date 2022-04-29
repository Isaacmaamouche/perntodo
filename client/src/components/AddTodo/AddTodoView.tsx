import { Button } from '@welcome-ui/button';
import { Text } from '@welcome-ui/text';
import { AddIcon, CrossIcon } from '@welcome-ui/icons';
import { Box } from '@welcome-ui/box';
import { Flex } from '@welcome-ui/flex';
import React from 'react';

export type AddTodoProps = {
  ToggleCreateTodoModal: () => void;
  showCreateTodoDialog: boolean;
  description: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  CreateTodo: () => void;
};

export const AddTodoView: React.FC<AddTodoProps> = ({
  ToggleCreateTodoModal,
  showCreateTodoDialog,
  description,
  handleChange,
  CreateTodo,
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
            <form>
              <Flex direction="column" gap="1rem" justify="center">
                <Text variant="h2" color="black">
                  Add a todo item
                </Text>
                <input
                  type="text"
                  className="form-control"
                  placeholder="My new todo"
                  value={description}
                  onChange={(e) => handleChange(e)}
                />
                <Flex direction="row" align="right" justify="end" gap="1rem">
                  <Button
                    variant="primary-info"
                    onClick={CreateTodo}
                    disabled={description.length == 0 && true}
                  >
                    <Text variant="body2" as="span">
                      Create
                    </Text>
                    <AddIcon />
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
