import tasks from './tasks.js';
import './style.css';
import './storage.js';

export default function renderTasks() {
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = ''; // clear previous items
  tasks.sort((a, b) => a.index - b.index);

  tasks.forEach((task, index) => {
    const taskItem = document.createElement('li');
    taskItem.innerHTML += `<input class='checkbox' type="checkbox" ${task.completed ? 'checked' : ''}/><p>${task.description}</p> <i class="fa">&#xf142;</i>`;
    taskItem.querySelector('input').addEventListener('click', () => {
      tasks[index].completed = !tasks[index].completed;
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
    });
    taskItem.querySelector('p').addEventListener('click', function editTask() {
      const descriptionElement = this;
      const editInput = document.createElement('input');
      editInput.type = 'text';
      editInput.value = descriptionElement.innerText;
      editInput.addEventListener('blur', () => {
        tasks[index].description = editInput.value;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
      });
      descriptionElement.replaceWith(editInput);
      editInput.focus();
    });
    taskItem.querySelector('i').addEventListener('click', () => {
      // deleteTasks
      const index = tasks.findIndex((task) => task === taskItem);
      tasks.splice(index, 1);
      tasks.forEach((task, i) => {
        task.index = i + 1;
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
    });

    if (task.completed) {
      taskItem.classList.add('completed');
    }

    todoList.appendChild(taskItem);
  });
}
