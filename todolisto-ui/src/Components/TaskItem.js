import React from 'react';
import { ListGroupItem, Button } from 'react-bootstrap';

const TaskItem = ({ task, onDelete, onEdit }) => {
  return (
    <ListGroupItem className="d-flex justify-content-between align-items-center">
      <div>
        <h5>{task.content}</h5>
        <p>{task.completed ? 'Completed' : 'Not Completed'}</p>
      </div>
      <div>
        <Button variant="success" className="mr-2" onClick={() => onEdit(task)}>Edit</Button>
        <Button variant="danger" onClick={() => onDelete(task.id)}>Delete</Button>
      </div>
    </ListGroupItem>
  );
};

export default TaskItem;
