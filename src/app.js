import tasks from './tasks.js';

export function addTask(tasks, description) {
  console.log('add');
  const task = {
    description,
    completed: false,
    index: tasks.length + 1,
  };
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function editTask(index) {
  console.log('edit');
  const taskItem = document.querySelector(`#todo-list li:nth-child(${index + 1})`);
  const descriptionElement = taskItem.querySelector('p');
  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.value = descriptionElement.innerText;
  editInput.addEventListener('blur', () => {
    tasks[index].description = editInput.value;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  });
  descriptionElement.replaceWith(editInput);
  editInput.focus();
}

export function deleteTask(index) {
  console.log('delete');
  tasks.splice(index, 1);
  // Update the indexes of the remaining tasks
  tasks.forEach((task, i) => {
    task.index = i + 1;
    return task;
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
