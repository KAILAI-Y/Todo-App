document.addEventListener('DOMContentLoaded', () => {
  const taskForm = document.getElementById('task-form');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  //Fetch the tasks from the server
  fetch('/tasks')
    .then((response) => response.json())
    .then((tasks) => {
      tasks.forEach((task) => addTask(task));
    });

  taskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // Trim the task text and add a new task if it is not empty
    const taskText = taskInput.value.trim();
    if (taskText) {
      createTask(taskText).then((task) => {
        addTask(task);
        taskInput.value = '';
      });
    }
  });

  // Define a function to create a new task element
  function creatTaskElement(task){
    const li = document.createElement('li');
    li.dataset.id = task.id;

    // Create a new <span> element to display the task text
    const span = document.createElement('span');
    span.textContent = task.text;
    span.classList.add('task-text');
    li.appendChild(span);
    // console.log(task.text, task.id);

    // Create a new "Complete" button to toggle the completed status of the task
    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Complete';
    toggleButton.classList.add('toggle-button');
    toggleButton.addEventListener('click', () =>{
      task.completed = !task.completed;
      updateTask(task);
      li.classList.toggle('completed');
    });
    li.appendChild(toggleButton);

    // Create a new "Edit" button to allow the user to edit the task text
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-button');
    editButton.addEventListener('click', async() =>{
      // Prompt the user to enter the new task text and update the span if it is not empty
      const newTaskText = prompt('Enter the new task text:', task.text);
      if(newTaskText) {
        task.text = newTaskText;
        // pause the function execution until the task is updated on the server
        await updateTask(task);
        span.textContent = newTaskText;
      }
    });
    li.appendChild(editButton);
    
    // Create a new "Delete" button to allow the user to delete the task
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', ()=>{
      deleteTask(task);
      li.remove();
    });
    li.appendChild(deleteButton);

    if(task.completed) {
      li.classList.add('completed');
    }
    return li;
  }

  // Define a function to add a new task to the task list
  function addTask(task){
    const taskElement = creatTaskElement(task);
    taskList.appendChild(taskElement);
  }

  // createTask
  // send a POST request to the server to create a new task 
  function createTask(text){
    return fetch(`/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, completed: false }),
    }).then((response) => response.json());
  }

  // updateTask
  // send a PUT requests to the server to update the task 
  // the task object contain the task ID, text and status
  function updateTask(task){
    return fetch(`/tasks/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
  }

  // deleteTask
  // send a DELETE request to server to delete the task
  function deleteTask(task) {
    return fetch(`/tasks/${task.id}`, {
      method: 'DELETE',
    });
  }
});