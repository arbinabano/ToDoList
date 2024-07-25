import logo from './logo.svg';
import './App.css';
import { Container } from 'react-bootstrap';
import TaskForm from "./Components/TaskForm"
function App() {
  return (
    // <div className="App">
    //   <TaskForm/>
    //  TaskList
    // </div>
    <Container>
      <h1> hellow </h1>
    <TaskForm/>
    </Container>
  );
}

export default App;
