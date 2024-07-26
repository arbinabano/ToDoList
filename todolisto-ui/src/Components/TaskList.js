import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';
import { ListGroup, Spinner, Alert, Modal, Button, Form } from 'react-bootstrap';
import {  toast } from 'react-toastify';
const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [isCheck, setIsCheck] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        await axios.get('http://localhost:5000/tasks').then(res => {
          setTasks(res?.data?.data);
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`).then(
        res =>  toast(res.data.message, {
          position: 'top-right',
          autoClose: 9000,
          className: 'custom-toast',        
        })
      );
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      setError(err.message);
      console.log(`Error deleting task with id ${id}: ${err.message}`);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setEditContent(task.content);
    setIsCheck(task.completed);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/tasks/${editingTask.id}`, {
        content: editContent,
        completed: isCheck,
      });
      toast(response.data.message, {
        position: 'top-right',
        autoClose: 9000,
        className: 'custom-toast',        
      })
      if (response?.data?.data) {
        await axios.get('http://localhost:5000/tasks').then(res => {
          setTasks(res?.data?.data);
          setEditingTask(null);
          setEditContent('');
          setIsCheck(false);
        });
      }
    } catch (err) {
      setError(err.message);
      console.log(`Error editing task with id ${editingTask.id}: ${err.message}`);
    }
  };

  const handleCloseEdit = () => {
    setEditingTask(null);
    setEditContent('');
    setIsCheck(false);
  };

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!tasks.length) {
    return <Alert variant="info">No tasks available.</Alert>;
  }

  return (
    <>
      {tasks.length ? (
        <>
          <ListGroup>
            {tasks.map(task => (
              <TaskItem key={task.id} task={task} onDelete={handleDelete} onEdit={handleEdit} />
            ))}
          </ListGroup>

          <Modal show={editingTask !== null} onHide={handleCloseEdit}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Task</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSaveEdit}>
              <Modal.Body>
                <Form.Group controlId="formTaskContent">
                  <Form.Label>Task</Form.Label>
                  <Form.Control
                    type="text"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    required
                  />
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Check this switch"
                    checked={isCheck}
                    onChange={(e) => { setIsCheck(e.target.checked); }}
                  />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseEdit}>
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Save Changes
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default TaskList;
