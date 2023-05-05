export function updateStatus(index) {
  const items = JSON.parse(localStorage.getItem('items'));
  items[index].completed = !items[index].completed;
  localStorage.setItem('items', JSON.stringify(items));
}

export function clearCompleted() {
  let items = JSON.parse(localStorage.getItem('items'));
  items = items.filter((item) => !item.completed);
  items.forEach((item, i) => {
    item.index = i + 1;
  });
  localStorage.setItem('items', JSON.stringify(items));
}
