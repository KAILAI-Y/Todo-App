const express = require('express');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();
const port = process.env.PORT|| 3000;

// Middleware setup
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// task
const tasks = [];
let taskId = 0;

// API routes
// GET route for retrieving all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// POST route for creating a new task
app.post('/tasks', (req, res) => {
    const task = req.body;
    task.id = taskId++;
    tasks.push(task);
    res.status(201).json(task);
});

// PUT route for updating an existing task
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const updatedTask = req.body;

    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if(taskIndex !== -1){
        updatedTask.id = taskId;
        tasks[taskIndex] = updatedTask;
        res.json(updatedTask);
    }else{
        res.status(404).json({ message: `Task with id ${taskId} not found` });
    }
});

// DELETE route for deleting a task
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    if(taskIndex !== -1){
        tasks.splice(taskIndex, 1);
        res.status(204).send();
    }else{
        res.status(404).json({ message: `Task with id ${taskId} not found` });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
