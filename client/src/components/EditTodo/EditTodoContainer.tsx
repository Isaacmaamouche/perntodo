import { useEffect, useState } from 'react';
import { EditIcon, CrossIcon } from '@welcome-ui/icons';
import { Button } from '@welcome-ui/button';
import { Flex } from '@welcome-ui/flex';
import { Text } from '@welcome-ui/text';
import { Box } from '@welcome-ui/box';

interface EditProps {
  todo: TodoProps;
}

interface TodoProps {
  description: string;
  todo_id: number;
}

interface updatedDescription {
  description: string;
}

export default function EditTodo({ todo }: EditProps) {
  const [showcreateTodoDialog, setShowCreateTodoDialog] = useState(false);

  function ToggleCreateTodoModal() {
    setShowCreateTodoDialog(!showcreateTodoDialog);
  }
  const { description, todo_id } = todo;
  const [newDescription, setNewDescription] = useState('');

  function resetDescription() {
    setNewDescription(description);
  }

  useEffect(() => {
    resetDescription();
  }, []);

  async function updateTodo() {
    try {
      const body: updatedDescription = { description: newDescription };
      await fetch(`/todos/${todo_id}`, {
        method: 'put',
        headers: { 'Content-Type': 'Application/JSON' },
        body: JSON.stringify(body),
      }).then(() => (window.location.href = '/'));
    } catch (error) {
      console.error({ error });
    }
  }

  return (
    <>
      <>
        <Button
          variant="primary-warning"
          onClick={ToggleCreateTodoModal}
          shape="circle"
          size="sm"
        >
          <EditIcon size="lg" />
        </Button>

        {showcreateTodoDialog && (
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
                    onChange={(e) => setNewDescription(e.target.value)}
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
    </>
  );
}
