export function updateStatus(index, completed) {
    const items = JSON.parse(localStorage.getItem('items'));
    tastList[index].completed = !tastList[index].completed;
    localStorage.setItem('items', JSON.stringify(items));
}

export function clearCompleted() {
    let items = JSON.parse(localStorage.getItem('items'));
    items = items.filter(item => !item.completed);
    localStorage.setItem('items', JSON.stringify(items));
}