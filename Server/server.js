const express = require('express');
const app = express();
const PORT = 5000;

let tasks = [];

app.use(express.json());

// Get all tasks
app.get('/tasks', (req, res) => {
  res.send({Body :tasks ,message:"All Record Found"});
});

// Add a todo
app.post('/tasks', (req, res) => {
  console.log("req.body :",req.body);
  const newTodo ={ id: tasks.length + 1, content: req.body.content ,completed:false};
  tasks.push(newTodo);
  res.status(201).send({data : newTodo ,message :"Record inserted Sucessfully"});
});

// Update a todo/
app.put('/tasks/:id', (req, res) => {
//   const { id } = req.params;
//   const updatedTodo = req.body;
//   tasks = tasks.map(todo => (todo.id === id ? updatedTodo : todo));
//   res.json(updatedTodo);
const task = task.find(t => t.id ===parseInt(req.params.id));
if (!task)    return res.status(400).send("Task Not Found!")
task.content=req.bosy.content ;
task.completed ==req.bosy.completed;
res.send({data : task ,message:"Record updated Successfully"})
});

// Delete a todo
app.delete('/tasks/:id', (req, res) => {
//   const { id } = req.params;
//   tasks = tasks.filter(todo => todo.id !== id);
//   res.status(204).end();

const task = task.findIndex(t => t.id ===parseInt(req.params.id));
if (task === -1)    return res.status(400).send("Task Not Found!")
 tasks.splice(task,1)
res.send({message:"Record Deleted Successfully"})
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
