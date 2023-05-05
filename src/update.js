export function updateStatus(tastList, index, completed) {
    tastList[index].completed = completed;
    localStorage.setItem('tastList', JSON.stringify(tastList));
}

export function clearCompleted() {
    let items = JSON.parse(localStorage.getItem('items'));
    items = items.filter(item => !item.completed);
    localStorage.setItem('items', JSON.stringify(items));
}
