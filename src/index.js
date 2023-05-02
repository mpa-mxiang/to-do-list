import './style.css';
const tasks = [
    { description: 'wash the dishes', completed: false, index: 1 },
    { description: 'complete To Do list project', completed: true, index: 2 },
  ];
  
  function renderTasks() {
    const todoList = document.getElementById('todo-list');
  
    tasks.sort((a, b) => a.index - b.index);
  
    tasks.forEach((task) => {
      const taskItem = document.createElement('li');
      taskItem.innerHTML += `<div class="square"></div> <p>${task.description}</p> <i class="fa">&#xf142;</i>`;

      if (task.completed) {
        taskItem.classList.add('completed');
      }
  
      todoList.appendChild(taskItem);
    });
  }
  
  renderTasks();
  
