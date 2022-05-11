import { useState } from 'react';
import { useRenderContext } from '../../context/renderContext';
import { FormDataType } from '../Form/TodoForm';
import { AddTodoView } from './AddTodoView';

export const AddTodoContainer = () => {
  const { Rerender } = useRenderContext();

  const [showCreateTodoDialog, setShowCreateTodoDialog] = useState(false);

  function ToggleCreateTodoModal() {
    setShowCreateTodoDialog(!showCreateTodoDialog);
  }
  const [description, setDescription] = useState('');

  function handleFormSubmit(formData: FormDataType) {
    CreateTodo(formData);
  }

  async function CreateTodo(formData: FormDataType) {
    try {
      const body = { formData };
      await fetch('/todos', {
        method: 'post',
        headers: { 'Content-Type': 'Application/JSON' },
        body: JSON.stringify(body),
      })
        .then(() => Rerender())
        .then(() => ToggleCreateTodoModal());
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
      handleFormSubmit={handleFormSubmit}
    />
  );
};
