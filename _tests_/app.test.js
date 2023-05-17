import { JSDOM } from 'jsdom';
import { addTask, deleteTask } from '../src/app.js';
import tasks from '../src/tasks.js';
import { updateStatus, clearCompleted, editTask } from '../src/update.js';
let todoList;
let taskItem;
const renderTasks = jest.fn(() => {
  tasks.sort((a, b) => a.index - b.index);
  tasks.forEach((task) => {
    taskItem = document.createElement('li');
    taskItem.innerHTML = `
      <input class='checkbox' type="checkbox" ${task.completed ? 'checked' : ''}/>
      <p>${task.description}</p>
      <div class="icons">
        <i class="fa tri-dots">&#xf142;</i>
        <i class="fa fa-trash-o trash"></i>
      </div>`;
    todoList.appendChild(taskItem);
  });
});

describe('addTask function', () => {
  beforeEach(() => {
    const dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <body>
          <ul id="todo-list"></ul>
        </body>
      </html>
    `);

    global.window = dom.window;
    global.document = dom.window.document;
    todoList = document.getElementById('todo-list');
  });

  afterEach(() => {
    delete global.window;
    delete global.document;
    jest.clearAllMocks();
    tasks.length = 0;
  });

  test('adds new tasks to the list and localStorage', () => {
    addTask('Task 1');
    addTask('Task 2');
    addTask('Task 3');
    renderTasks();

    expect(todoList.children.length).toBe(3);
  });
  test('deletes a task from the list and localStorage', () => {
    addTask('Task 1');
    addTask('Task 2');
    addTask('Task 3');
    addTask('Task 4');
    deleteTask(2);
    renderTasks();

    expect(todoList.children.length).toBe(3);
  });

  test('updates a task from the list and localStorage', () => {
    addTask('Task 1');
    addTask('Task 2');
    addTask('Task 3');
    addTask('Task 4');
    updateStatus(tasks, 2, true);
    renderTasks();
    expect(todoList.children[2].querySelector('input').checked).toBe(true);
  });

  test('clear completed tasks from the list and localStorage', () => {
    addTask('Task 1');
    addTask('Task 2');
    addTask('Task 3');
    addTask('Task 4');
    updateStatus(tasks, 2, true);
    updateStatus(tasks, 3, true);
    const buffer = clearCompleted(tasks);
    renderTasks();
    expect(buffer).toHaveLength(2);

  });

  test('edits a task from the list and localStorage', () => {
    addTask('Task 1');
    addTask('Task 2');
    addTask('Task 3');
    addTask('Task 4');
    editTask(tasks, 2, 'new description');
    renderTasks();
    expect(todoList.children[2].querySelector('p').textContent).toBe('new description');
  });
});
