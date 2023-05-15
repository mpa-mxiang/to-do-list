import { JSDOM } from 'jsdom';
import { addTask, deleteTask } from '../src/app.js';
import tasks from '../src/tasks.js';
import 'jest-localstorage-mock';

const taskList = tasks;
let todoList;
let taskItem;
const renderTasks = jest.fn(() => {
  taskList.sort((a, b) => a.index - b.index);
  taskList.forEach((task) => {
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
    taskItem = document.createElement('li');
    tasks.length = 0; // Clear the tasks array before each test
  });

  afterEach(() => {
    delete global.window;
    delete global.document;
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('adds a new task to the list and localStorage', () => {
    addTask('Task 1');
    renderTasks();
    const updatedTaskList = JSON.parse(localStorage.getItem('tasks'));

    expect(updatedTaskList).toEqual([{ description: 'Task 1', completed: false, index: 1 }]);

    expect(todoList.children.length).toBe(1);
    expect(todoList.children[0].querySelector('p').textContent).toBe('Task 1');
  });
  test('deletes a task from the list and localStorage', () => {
    addTask('Task 1');
  
    addTask('Task 2');
    renderTasks(); 
    const updatedTaskList = JSON.parse(localStorage.getItem('tasks'));
  
    expect(updatedTaskList).toEqual([
      { description: 'Task 1', completed: false, index: 1 },
      { description: 'Task 2', completed: false, index: 2 },
    ]);
  
    expect(todoList.children.length).toBe(2);
    expect(todoList.children[1].querySelector('p').textContent).toBe('Task 2');
  
    deleteTask(0);
    renderTasks();
  
    expect(updatedTaskList).toEqual([
      { description: 'Task 2', completed: false, index: 2 },
    ]);
  
    expect(todoList.children.length).toBe(1);
    expect(todoList.children[0].querySelector('p').textContent).toBe('Task 2');
  });
  

});
