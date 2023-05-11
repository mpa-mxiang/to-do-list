export function updateStatus(tastList, index, completed) {
  tastList[index].completed = completed;
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function clearCompleted(tastList) {
  tastList = tastList.filter((task) => !task.completed);

  tastList.forEach((task, i) => {
    task.index = i + 1;
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
  return tastList;
}
