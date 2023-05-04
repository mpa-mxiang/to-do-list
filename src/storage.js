const typedTodo = document.querySelector('.new-task-input');
const todos = document.querySelector('form');
const todoData = JSON.parse(localStorage.getItem('todoData')) || { todo: '' }; // Initialize todoData with an empty todo property
const savedData = JSON.parse(localStorage.getItem('todoData'));
if (savedData) {
  typedTodo.value = savedData.todo;
}

todos.addEventListener('input', (event) => {
  if (event.target.id === typedTodo.id) {
    todoData.todo = event.target.value;
  }
  localStorage.setItem('todoData', JSON.stringify(todoData));
});

todos.addEventListener('submit', () => {
  todoData.todo = '';
  localStorage.setItem('todoData', JSON.stringify(todoData));
});