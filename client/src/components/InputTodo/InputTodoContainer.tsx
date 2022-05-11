import { resolveTypeReferenceDirective } from 'typescript';
import { useRenderContext } from '../../context/renderContext';
import { AddTodoContainer } from '../AddTodo/AddTodoContainer';
import { InputTodoView } from './InputTodoView';

export const InputTodoContainer = () => {
  const { Rerender } = useRenderContext();

  async function resetDemoData() {
    try {
      await fetch('/todos/reset').then(() => Rerender());
    } catch (error) {
      console.error({ error });
    }
  }

  return <InputTodoView resetDemoData={resetDemoData} />;
};
