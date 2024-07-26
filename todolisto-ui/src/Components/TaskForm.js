import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Modal } from 'react-bootstrap';

import {  toast } from 'react-toastify';

function TaskForm(props) {
  const { setIsAdd } = props;
  const [content, setContent] = useState('');
  const [isCheck, setIsCheck] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/tasks', { content, isCheck }).then(
     res=>   toast(res.data.message, {
          position: 'top-right',
          autoClose: 9000,
          className: 'custom-toast',        
        })
      );
      setContent('');
      setIsCheck(false);
      setIsAdd(false);
     
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };

  return (
    <div className='justify-content-center'>
    
      <Modal show={true} onHide={() => setIsAdd(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group controlId="formTaskContent">
              <Form.Label>Task</Form.Label>
              <Form.Control
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
              <Form.Check
                type="switch"
                id="custom-switch"
                label="Check this switch"
                checked={isCheck}
                onChange={(e) => setIsCheck(e.target.checked)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setIsAdd(false)}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Add Task
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default TaskForm;
