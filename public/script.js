document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
  
    taskForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const taskText = taskInput.value.trim();
      if (taskText) {
        addTask(taskText);
        taskInput.value = '';
      }
    });
  
    function createTaskElement(task) {
      const li = document.createElement('li');
  
      const span = document.createElement('span');
      span.textContent = task;
      span.classList.add('task-text');
      li.appendChild(span);
  
      const toggleButton = document.createElement('button');
      toggleButton.textContent = 'Toggle';
      toggleButton.classList.add('toggle-button');
      toggleButton.addEventListener('click', () => {
        li.classList.toggle('completed');
      });
      li.appendChild(toggleButton);
  
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.classList.add('edit-button');
      editButton.addEventListener('click', () => {
        const newTaskText = prompt('Enter the new task text:', task);
        if (newTaskText) {
          span.textContent = newTaskText;
        }
      });
      li.appendChild(editButton);
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.classList.add('delete-button');
      deleteButton.addEventListener('click', () => {
        li.remove();
      });
      li.appendChild(deleteButton);
  
      return li;
    }
  
    function addTask(task) {
      const taskElement = createTaskElement(task);
      taskList.appendChild(taskElement);
    }
  });
  