import { createContext, useContext } from 'react';
export type RenderContext = {
  renderCount: number;
  Rerender: () => void;
};
export const MyRenderContext = createContext<RenderContext>({
  renderCount: 0,
  Rerender: () => {},
});
export const useRenderContext = () => useContext(MyRenderContext);
