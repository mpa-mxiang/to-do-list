import './style.css';
import './storage.js';
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = ''; // clear previous items

  tasks.sort((a, b) => a.index - b.index);

  tasks.forEach((task, index) => {
    const taskItem = document.createElement('li');
    taskItem.innerHTML += `<input class='checkbox' type="checkbox" ${task.completed ? 'checked' : ''}>${task.description}</input> <i class="fa">&#xf142;</i>`;
    taskItem.querySelector('input').addEventListener('click', () => toggleTaskCompletion(index));
    taskItem.querySelector('p').addEventListener('click', () => editTask(index));

    if (task.completed) {
      taskItem.classList.add('completed');
    }

    todoList.appendChild(taskItem);
  });
}

function addTask(description) {
  const task = {
    description: description,
    completed: false,
    index: tasks.length + 1
  };

  tasks.push(task);
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const taskItem = document.querySelector(`#todo-list li:nth-child(${index+1})`);
  const descriptionElement = taskItem.querySelector('p');
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
}

function toggleTaskCompletion(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

const newTaskForm = document.querySelector('form');
newTaskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const newTaskInput = newTaskForm.querySelector('.new-task-input');
  addTask(newTaskInput.value);
  newTaskInput.value = '';
});

const clearCompletedBtn = document.querySelector('.clear-completed-btn');
clearCompletedBtn.addEventListener('click', () => {
  tasks = tasks.filter((task) => !task.completed);
  tasks.forEach((task, i) => task.index = i + 1);
  saveTasks();
  renderTasks();
});

renderTasks();
