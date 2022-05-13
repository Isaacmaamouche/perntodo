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

  return (
    <AddTodoView
      ToggleCreateTodoModal={ToggleCreateTodoModal}
      showCreateTodoDialog={showCreateTodoDialog}
      handleFormSubmit={handleFormSubmit}
    />
  );
};
