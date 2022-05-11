import { useEffect, useState } from 'react';
import { EditTodoView } from './EditTodoView';
import { useRenderContext } from '../../context/renderContext';
import { Todo } from '../ListTodo/ListTodosContainer';
import { FormDataType } from '../Form/TodoForm';

interface EditProps {
  todo: Todo;
}

export const EditTodoContainer: React.FC<EditProps> = ({ todo }: EditProps) => {
  const { Rerender } = useRenderContext();

  const [showCreateTodoDialog, setShowCreateTodoDialog] = useState(false);

  function ToggleCreateTodoModal() {
    setShowCreateTodoDialog(!showCreateTodoDialog);
  }
  const { todo_id } = todo;

  function handleFormSubmit(formData: FormDataType) {
    updateTodo(formData);
  }

  async function updateTodo(formData: FormDataType) {
    try {
      const body = { formData };
      await fetch(`/todos/${todo_id}`, {
        method: 'put',
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
    <EditTodoView
      ToggleCreateTodoModal={ToggleCreateTodoModal}
      showCreateTodoDialog={showCreateTodoDialog}
      handleFormSubmit={handleFormSubmit}
      todo={todo}
    />
  );
};
