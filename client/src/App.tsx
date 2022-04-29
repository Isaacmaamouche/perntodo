import './App.css';
import { Box } from '@welcome-ui/box';

import { HeaderContainer } from './components/Header/HeaderContainer';
import { InputTodoContainer } from './components/InputTodo/InputTodoContainer';
import { ListTodosContainer } from './components/ListTodo/ListTodosContainer';
function App() {
  return (
    <div className="App">
      <Box mx="md">
        <HeaderContainer />
        <ListTodosContainer />
        <InputTodoContainer />
      </Box>
    </div>
  );
}

export default App;
