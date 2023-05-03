import tasks from './tasks.js';
import renderTasks from './index.js';
console.log("app!")
export default function addTask(description) {
  console.log("add!")
  const task = {
    description,
    completed: false,
    index: tasks.length + 1,
  };
  console.log('hi');
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
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
  tasks.forEach((task, i) => {
    task.index = i + 1;
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
});
