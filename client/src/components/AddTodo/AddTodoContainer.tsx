import { Button } from '@welcome-ui/button';
import { Text } from '@welcome-ui/text';
import { AddIcon, CrossIcon } from '@welcome-ui/icons';

import { useState } from 'react';
import { Box } from '@welcome-ui/box';
import { Flex } from '@welcome-ui/flex';

export default function () {
  const [showcreateTodoDialog, setShowCreateTodoDialog] = useState(false);

  function ToggleCreateTodoModal() {
    setShowCreateTodoDialog(!showcreateTodoDialog);
  }
  const [description, setDescription] = useState('');

  async function onSubmitForm(e: any): Promise<void> {
    e.preventDefault();
    // setShowCreateTodoDialog(!showcreateTodoDialog);

    try {
      const body = { description };
      await fetch('/todos', {
        method: 'post',
        headers: { 'Content-Type': 'Application/JSON' },
        body: JSON.stringify(body),
      });
      window.location.href = '/';
    } catch (error) {
      console.error({ error });
    }
  }

  return (
    <>
      <Button variant="primary-info" onClick={ToggleCreateTodoModal}>
        <Text variant="body2" as="span">
          Add todo
        </Text>
        <AddIcon />
      </Button>

      {showcreateTodoDialog && (
        <>
          <Box className="dialog">
            <form onSubmit={onSubmitForm}>
              <Flex direction="column" gap="1rem" justify="center">
                <Text variant="h2" color="black">
                  Add a todo item
                </Text>
                <input
                  type="text"
                  className="form-control"
                  placeholder="My new todo"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Flex direction="row" align="right" justify="end" gap="1rem">
                  <Button
                    variant="primary-info"
                    type="submit"
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
}
