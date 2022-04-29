import { useState } from 'react';
import { AddTodoView } from './AddTodoView';

export const AddTodoContainer = () => {
  const [showCreateTodoDialog, setShowCreateTodoDialog] = useState(false);

  function ToggleCreateTodoModal() {
    setShowCreateTodoDialog(!showCreateTodoDialog);
  }
  const [description, setDescription] = useState('');

  async function CreateTodo(): Promise<void> {
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

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDescription(e.target.value);
  }

  return (
    <AddTodoView
      ToggleCreateTodoModal={ToggleCreateTodoModal}
      showCreateTodoDialog={showCreateTodoDialog}
      description={description}
      handleChange={handleChange}
      CreateTodo={CreateTodo}
    />
  );
};
