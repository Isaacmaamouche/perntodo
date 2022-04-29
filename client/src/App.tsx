import './App.css';

import HeaderContainer from './components/Header/HeaderContainer';
import InputTodoContainer from './components/InputTodo/InputTodoContainer';
import ListTodosContainer from './components/ListTodo/ListTodosContainer';
function App() {
  return (
    <div className="App">
      <>
        <div className="container">
          <HeaderContainer />
          <ListTodosContainer />
          <InputTodoContainer />
        </div>
      </>
    </div>
  );
}

export default App;
