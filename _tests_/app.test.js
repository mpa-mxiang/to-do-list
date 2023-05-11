import { JSDOM } from 'jsdom';
import { addTask, deleteTask } from '../src/app.js';
import tasks from '../src/tasks.js';
import 'jest-localstorage-mock';

const tastList = tasks;
let todoList;

const renderTasks = jest.fn(() => {
  tastList.sort((a, b) => a.index - b.index);
  tastList.forEach((task) => {
    const taskItem = document.createElement('li');
    taskItem.innerHTML += `
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
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('adds a new task to the list and localStorage', () => {
    addTask('Task 1');
    expect(todoList.children.length).toBe(1);

    addTask('Task 2');
    expect(todoList.children.length).toBe(2);

    addTask('Task 3');
    expect(todoList.children.length).toBe(3);

    addTask('Task 4');
    expect(todoList.children.length).toBe(4);

    renderTasks();
    const updatedTastList = JSON.parse(localStorage.getItem('tasks'));

    // check that the new task was added to the tastList and localStorage
    expect(todoList.children[0].querySelector('p').textContent).toBe('Task 1');
    expect(todoList.children[1].querySelector('p').textContent).toBe('Task 2');
    expect(todoList.children[2].querySelector('p').textContent).toBe('Task 3');
    expect(todoList.children[3].querySelector('p').textContent).toBe('Task 4');
    
  });

  test('delete a task from the list and localStorage', () => {
    deleteTask(2);

    renderTasks();
    const updatedTastList = JSON.parse(localStorage.getItem('tasks'));

    // check that the new task was added to the tastList and localStorage
    expect(todoList.children.length).toBe(3);
    
  });
});
