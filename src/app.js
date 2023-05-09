import tasks from "./tasks";
export function addTask(description) {
  const task = {
    description,
    completed: false,
    index: tasks.length + 1,
  };
  tasks.push(task);
  localStorageMock.setItem('tasks', JSON.stringify(tasks));
}

export function deleteTask(index) {
  tasks.splice(index, 1);
  // Update the indexes of the remaining tasks
  tasks.forEach((task, i) => {
    task.index = i + 1;
    return task;
  });
  localStorageMock.setItem('tasks', JSON.stringify(tasks));
}

export default tasks;
