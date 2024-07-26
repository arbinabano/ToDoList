const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

let tasks = [];

app.use(cors()); // Add this line before your routes
app.use(express.json());

// Get all tasks
app.get('/tasks', (req, res) => {
  res.send({ data: tasks, message: "All records found" });
});

// Add a todo
app.post('/tasks', (req, res) => {

  const newTodo = { id: tasks.length + 1, content: req.body.content, completed:  req.body.isCheck };
  tasks.push(newTodo);
  res.status(201).send({ data: newTodo, message: "Record inserted successfully" });
});

// Update a todo
app.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).send("Task Not Found!");
  }

  // Update task properties
  task.content = req.body.content;
  task.completed = req.body.completed;

  res.send({ data: task, message: "Record updated successfully" });
});

// Delete a todo
app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).send("Task Not Found!");
  }

  tasks.splice(index, 1);
  res.send({ message: "Record deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
