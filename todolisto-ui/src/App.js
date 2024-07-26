import logo from './logo.svg';
import './App.css';
import { Container ,Button } from 'react-bootstrap';
import TaskForm from "./Components/TaskForm"
import TaskList from './Components/TaskList';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css'; // Import the styles

import { ToastContainer } from 'react-toastify';
function App() {
  
  
  const [isAdd,setIsAdd]=useState(false);
  return (
   <>
      <ToastContainer />
   {isAdd ? (<TaskForm setIsAdd={setIsAdd}/>) : (
    <Container>
     <Button variant="primary" className="mr-2 mb-3 mt-3" onClick={()=>setIsAdd(true)}>Add +</Button>
     
    <TaskList/>
    </Container>)}
    </>
  );
}

export default App;
