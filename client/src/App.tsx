import './App.css';
import { Box } from '@welcome-ui/box';
import { MyRenderContext } from './context/renderContext';

import { HeaderContainer } from './components/Header/HeaderContainer';
import { InputTodoContainer } from './components/InputTodo/InputTodoContainer';
import { ListTodosContainer } from './components/ListTodo/ListTodosContainer';
import { useState } from 'react';
function App() {
  const [render, triggerRender] = useState(0);
  return (
    <MyRenderContext.Provider
      value={{ render: render, triggerRender: triggerRender }}
    >
      <div className="App">
        <Box mx="md">
          <HeaderContainer />
          <ListTodosContainer />
          <InputTodoContainer />
        </Box>
      </div>
    </MyRenderContext.Provider>
  );
}

export default App;
