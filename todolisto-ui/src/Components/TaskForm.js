import React ,{useState} from 'react';
import axios from 'axios';
import {Form ,Button} from "react-bootstrap"
function TaskForm() {
    const [content,setContent]=useState('');
    const handleSubmit=async(e)=>{
e.preventDefault();
const response=await axios.post("http://localhost:5000/tasks",{content})
 setContent('') ;
console.log("resss :",response) }
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group >
            <Form.Label>
                Task
            </Form.Label>
            <Form.Control
            type="text"
            value={content}
            onChange={(e)=>setContent(e.target.value)}
            required
            />
<Button variant='primary' type="submit">
    Add Task
</Button>
            {/* </Form.Control> */}
        </Form.Group>
      </Form>
    </div>
  )
}

export default TaskForm
