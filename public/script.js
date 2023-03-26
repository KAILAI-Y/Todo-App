document.addEventListener('DOMContentLoaded', () => {
  const taskForm = document.getElementById('task-form');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  taskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // Trim the task text and add a new task if it is not empty
    const taskText = taskInput.value.trim();
    if (taskText) {
      addTask(taskText);
      taskInput.value = '';
    }
  });

  // Define a function to add a new task to the task list
  function addTask(task){
    const taskElement = creatTaskElement(task);
    taskList.appendChild(taskElement);
  }

  // Define a function to create a new task element
  function creatTaskElement(task){
    const li = document.createElement('li');

    // Create a new <span> element to display the task text
    const span = document.createElement('span');
    span.textContent = task;
    span.classList.add('task-text');
    li.appendChild(span);

    // Create a new "Complete" button to toggle the completed status of the task
    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Complete';
    toggleButton.classList.add('toggle-button');
    toggleButton.addEventListener('click', () =>{
      li.classList.toggle('completed');
    });
    li.appendChild(toggleButton);

    // Create a new "Edit" button to allow the user to edit the task text
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-button');
    editButton.addEventListener('click', () =>{
      // Prompt the user to enter the new task text and update the span if it is not empty
      const newTaskText = prompt('Enter the new task text:', task);
      if(newTaskText) {
        span.textContent = newTaskText;
      }
    });
    li.appendChild(editButton);
    
    // Create a new "Delete" button to allow the user to delete the task
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', ()=>{
      li.remove();
    });
    li.appendChild(deleteButton);

    return li;
  }
})