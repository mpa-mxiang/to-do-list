import "style.css";

const tasks = [
    { description: 'Task 1', completed: false, index: 1 },
    { description: 'Task 2', completed: true, index: 2 },
    { description: 'Task 3', completed: false, index: 3 },
  ];
  
  function renderTasks() {
    const todoList = document.getElementById('todo-list');
  
    tasks.sort((a, b) => a.index - b.index);
  
    tasks.forEach((task) => {
      const taskItem = document.createElement('li');
      taskItem.textContent = task.description;
  
      if (task.completed) {
        taskItem.classList.add('completed');
      }
  
      todoList.appendChild(taskItem);
    });
  }
  
  renderTasks();
  