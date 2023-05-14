import { JSDOM } from 'jsdom';
import { addTask } from '../src/app.js';
import tasks from '../src/tasks.js';
import 'jest-localstorage-mock';

const tastList = tasks;
let todoList;
let taskItem;
const renderTasks = jest.fn(() => {
  tastList.sort((a, b) => a.index - b.index);
  tastList.forEach((task) => {
    taskItem.innerHTML += `
      <input class='checkbox' type="checkbox" ${task.completed ? 'checked' : ''}/>
        <p>${task.description}</p>
        <div class="icons">
          <i class="fa tri-dots">&#xf142;</i>
          <i class="fa fa-trash-o trash"></i>
        </div>`;
    console.log("render:" + taskItem.textContent)
    todoList.appendChild(taskItem);
    console.log("render:" + todoList)

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
    taskItem = document.createElement('li');
    console.log("before:" + taskItem.textContent)
    console.log("before:" + todoList)
  });

  afterEach(() => {
    delete global.window;
    delete global.document;
    localStorage.clear();
    jest.clearAllMocks();

    console.log("after:" + taskItem.textContent)
    console.log("after:" + todoList)
  });

  test('adds a new task to the list and localStorage', () => {
    addTask('Task 1');
    renderTasks();
    const updatedTastList = JSON.parse(localStorage.getItem('tasks'));

    // check that the new task was added to the tastList and localStorage
    expect(updatedTastList).toEqual([{ description: 'Task 1', completed: false, index: 1 }]);

    expect(todoList.children.length).toBe(1);
    expect(todoList.children[0].querySelector('p').textContent).toBe('Task 1');
  });

  test('deletes a task from the list and localStorage', () => {
    addTask('Task 1');
    addTask('Task 2');
    renderTasks();
    const updatedTastList = JSON.parse(localStorage.getItem('tasks'));
    console.log(updatedTastList)
    // check that the new task was added to the tastList and localStorage
    expect(updatedTastList).toEqual([{ description: 'Task 1', completed: false, index: 1 },{ description: 'Task 2', completed: false, index: 2 }]);

    expect(todoList.children.length).toBe(2);
    expect(todoList.children[1].querySelector('p').textContent).toBe('Task 2');
  });
});