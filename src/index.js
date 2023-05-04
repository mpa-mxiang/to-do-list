import tasks from './tasks.js';
import './style.css';
import './storage.js';
import { addTask, editTask, deleteTask } from './app.js';

export default function renderTasks() {
  console.log("render")
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
    taskItem.querySelector('p').addEventListener('click', () => {
      editTask(index);
      renderTasks();
    });
    taskItem.querySelector('i').addEventListener('click', () => {
      deleteTask(index);
      renderTasks();
    });

    if (task.completed) {
      taskItem.classList.add('completed');
    }

    todoList.appendChild(taskItem);
  });
}

const newTaskForm = document.querySelector('form');
newTaskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const newTaskInput = document.querySelector('.new-task-input');
  addTask(tasks, newTaskInput.value);
  newTaskInput.value = '';
});

const clearCompletedBtn = document.querySelector('.clear-completed-btn');
clearCompletedBtn.addEventListener('click', () => {
  tasks = tasks.filter((task) => !task.completed);
  tasks.forEach((task, i) => {
    task.index = i + 1;
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
});
renderTasks();