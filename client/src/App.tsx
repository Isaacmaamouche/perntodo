import './App.css';
import { Box } from '@welcome-ui/box';
import { MyRenderContext } from './context/renderContext';

import { HeaderContainer } from './components/Header/HeaderContainer';
import { InputTodoContainer } from './components/InputTodo/InputTodoContainer';
import { ListTodosContainer } from './components/ListTodo/ListTodosContainer';
import { useState } from 'react';
function App() {
  const [renderCount, setRenderCount] = useState<number>(0);
  const Rerender = () => {
    // console.log('Rerender');
    setRenderCount(renderCount + 1);
  };
  return (
    <MyRenderContext.Provider
      value={{ renderCount: renderCount, Rerender: Rerender }}
    >
      <div className="App">
        <Box className="main" mx="md">
          <HeaderContainer />
          <ListTodosContainer />
          <InputTodoContainer />
        </Box>
      </div>
    </MyRenderContext.Provider>
  );
}

export default App;
