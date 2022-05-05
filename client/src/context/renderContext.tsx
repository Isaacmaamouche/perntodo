import { createContext, useContext } from 'react';
export type RenderContext = {
  render: number;
  triggerRender: (n: number) => void;
};
export const MyRenderContext = createContext<RenderContext>({
  render: 0,
  triggerRender: () => {},
});
export const useRenderContext = () => useContext(MyRenderContext);
