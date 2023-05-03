import { tasks, renderTasks } from './index.js';

export function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

export function addTask(description) {
    const task = {
      description,
      completed: false,
      index: tasks.length + 1,
    };
  
    tasks.push(task);
    saveTasks();
    renderTasks();
  }


export function deleteTask(index) {
    tasks.splice(index, 1);
    // Update the indexes of the remaining tasks
    tasks.forEach((task, i) => task.index = i + 1);
    saveTasks();
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
    saveTasks();
    renderTasks();
  });