import tasks from './tasks.js';

export function addTask(tasks, description) {
  const task = {
    description,
    completed: false,
    index: tasks.length + 1,
  };
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function deleteTask(index) {
  tasks.splice(index, 1);
  // Update the indexes of the remaining tasks
  tasks.forEach((task, i) => {
    task.index = i + 1;
    return task;
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
