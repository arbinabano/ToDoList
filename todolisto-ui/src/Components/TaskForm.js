import React ,{useState} from 'react';
import axios from 'axios';
import {Form ,Button} from "react-bootstrap"
function TaskForm( props ) {
  let {setIsAdd}=props;
    const [content,setContent]=useState('');
    const [isCheck,setIsCheck]=useState(false)
    const handleSubmit=async(e)=>{
e.preventDefault();
const response=await axios.post("http://localhost:5000/tasks",{content ,isCheck})
 setContent('') ;
 setIsCheck(false)
  setIsAdd(false);

 }
  return (
    <div className='justify-content-center'>
      
      <Form onSubmit={handleSubmit}>
        <Form.Group >
            <Form.Label  className='mr-8'>
                Task
            </Form.Label>
            <Form.Control
            style={{width :"50%"}}
            type="text"
            value={content}
            onChange={(e)=>setContent(e.target.value)}
            required
            />
             <Form.Check 
        type="switch"
        id="custom-switch"
        label="Check this switch"
        checked={isCheck}
        onChange={(e)=>{setIsCheck(e.target.checked)}}
      />
<Button variant='primary' type="submit">
    Add Task
</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default TaskForm
