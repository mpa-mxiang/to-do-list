import './style.css';
import './storage.js';
import { saveTasks, addTask, deleteTask } from './app.js';

export let tasks = JSON.parse(localStorage.getItem('tasks')) || [];


export function renderTasks() {
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = ''; // clear previous items

  tasks.sort((a, b) => a.index - b.index);

  tasks.forEach((task, index) => {
    const taskItem = document.createElement('li');
    taskItem.innerHTML += `<input class='checkbox' type="checkbox" ${task.completed ? 'checked' : ''}/><p>${task.description}</p> <i class="fa">&#xf142;</i>`;
    taskItem.querySelector('input').addEventListener('click', () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    });
    taskItem.querySelector('p').addEventListener('click', function editTask() {
      const descriptionElement = this;
      const editInput = document.createElement('input');
      editInput.type = 'text';
      editInput.value = descriptionElement.innerText;
      editInput.addEventListener('blur', () => {
        tasks[index].description = editInput.value;
        saveTasks();
        renderTasks();
      });
      descriptionElement.replaceWith(editInput);
      editInput.focus();
    });
    taskItem.querySelector('i').addEventListener('click', () => deleteTask(index));

    if (task.completed) {
      taskItem.classList.add('completed');
    }

    todoList.appendChild(taskItem);
  });
}

renderTasks();
