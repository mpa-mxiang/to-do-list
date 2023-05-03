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
    taskItem.addEventListener('click', () => toggleTaskCompletion(index));
    taskItem.querySelector('i').addEventListener('click', () => deleteTask(index));

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

function deleteTask(index) {
  tasks.splice(index, 1);
  // Update the indexes of the remaining tasks
  tasks.forEach((task, i) => task.index = i + 1);
  saveTasks();
  renderTasks();
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
