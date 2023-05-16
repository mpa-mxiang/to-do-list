import { JSDOM } from 'jsdom';
import { addTask, deleteTask } from '../src/app.js';
import tasks from '../src/tasks.js';

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

  test('adds a new task to the list and localStorage', () => {
    addTask('Task 1');
    addTask('Task 2');
    addTask('Task 3');
    renderTasks();

    expect(todoList.children.length).toBe(3);
    expect(todoList.children[2].querySelector('p').textContent).toBe('Task 3');
  });
  test('deletes a task from the list and localStorage', () => {
    addTask('Task 1');
    addTask('Task 2');
    addTask('Task 3');
    addTask('Task 4');
    deleteTask(2);
    renderTasks();

    expect(todoList.children.length).toBe(3);
    expect(todoList.children[2].querySelector('p').textContent).toBe('Task 4');
  });
});
