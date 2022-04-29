import { AddTodoContainer } from '../AddTodo/AddTodoContainer';
import { InputTodoView } from './InputTodoView';

export const InputTodoContainer = () => {
  async function resetDemoData() {
    try {
      await fetch('/todos/reset');
    } catch (error) {
      console.error({ error });
    }
  }

  function loadDemoData() {
    resetDemoData();
    window.location.href = '/';
  }
  return <InputTodoView loadDemoData={loadDemoData} />;
};
