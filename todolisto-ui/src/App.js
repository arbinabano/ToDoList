import logo from './logo.svg';
import './App.css';
import { Container ,Button } from 'react-bootstrap';
import TaskForm from "./Components/TaskForm"
import TaskList from './Components/TaskList';
import { useState } from 'react';
function App() {
  
  
  const [isAdd,setIsAdd]=useState(false);
  return (
   <>
    {/* <TaskForm/> */}
   
    {/* <TaskList/> */}
   {isAdd ? (<TaskForm setIsAdd={setIsAdd}/>) : (
    <Container>
     <Button variant="primary" className="mr-2" onClick={()=>setIsAdd(true)}>Add +</Button>
     
    <TaskList/>
    </Container>)}
    </>
  );
}

export default App;
