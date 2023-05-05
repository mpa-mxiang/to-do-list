import tasks from './tasks.js';
import './style.css';
import './storage.js';
import { addTask, deleteTask } from './app.js';
import { updateStatus, clearCompleted } from './update.js';

let tastList = tasks;
export default function renderTasks() {
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = ''; // clear previous items
  tastList.sort((a, b) => a.index - b.index);
  tastList.forEach((task, index) => {
    const taskItem = document.createElement('li');
    taskItem.innerHTML += `<input class='checkbox' type="checkbox" ${task.completed ? 'checked' : ''}/><p>${task.description}</p> <div class="icons"> <i class="fa tri-dots">&#xf142;</i>
    <i class="fa fa-trash-o trash"></i></div>`;
    taskItem.querySelector('input').addEventListener('change', (event) => {
      updateStatus(tastList, index, event.target.checked);
      renderTasks();
    });
    taskItem.querySelector('p').addEventListener('click', function editTask() {
      const descriptionElement = this;
      const editInput = document.createElement('input');
      editInput.type = 'text';
      editInput.value = descriptionElement.innerText;
      editInput.addEventListener('blur', () => {
        tastList[index].description = editInput.value;
        localStorage.setItem('tastList', JSON.stringify(tastList));
        renderTasks();
      });
      descriptionElement.replaceWith(editInput);
      editInput.focus();
    });

    taskItem.querySelector('div').addEventListener('click', () => {
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
  addTask(tastList, newTaskInput.value);
  renderTasks();
  newTaskInput.value = '';
});

const clearCompletedBtn = document.querySelector('.clear-completed-btn');
clearCompletedBtn.addEventListener('click', () => {
  tastList = clearCompleted(tastList);
  renderTasks();
});
renderTasks();