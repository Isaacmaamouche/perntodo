import { useEffect, useState } from 'react';
import { EditTodoView } from './EditTodoView';

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

export const EditTodoContainer = ({ todo }: EditProps) => {
  const [showCreateTodoDialog, setShowCreateTodoDialog] = useState(false);

  function ToggleCreateTodoModal() {
    setShowCreateTodoDialog(!showCreateTodoDialog);
  }
  const { description, todo_id } = todo;
  const [newDescription, setNewDescription] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewDescription(e.target.value);
  }

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
    <EditTodoView
      ToggleCreateTodoModal={ToggleCreateTodoModal}
      showCreateTodoDialog={showCreateTodoDialog}
      description={description}
      newDescription={newDescription}
      handleChange={handleChange}
      updateTodo={updateTodo}
    />
  );
};
