import { addTask, deleteTask } from '../src/app.js';
import localStorageMock from './localStorageMock';

// set localStorage to the mock object before running the tests
beforeEach(() => {
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  });
});
describe('addTask function', () => {
    // create a mock localStorage object
    const localStorageMock = (() => {
      let store = {};
      return {
        getItem: key => store[key] || null,
        setItem: (key, value) => {
          store[key] = value.toString();
        },
        clear: () => {
          store = {};
        },
        removeItem: (key) => {
          delete store[key];
        }
      };
    })();
    
    // create a mock todo list
    const tastList = [
      { description: 'Task 1', completed: false, index: 1 },
      { description: 'Task 2', completed: true, index: 2 }
    ];
  
    // mock the DOM
    document.body.innerHTML = `
      <ul id="todo-list">
        <li>
          <input class="checkbox" type="checkbox" checked>
          <p>Task 2</p>
          <div class="icons">
            <i class="fa tri-dots">&#xf142;</i>
            <i class="fa fa-trash-o trash"></i>
          </div>
        </li>
      </ul>
    `;
    
    // set localStorage
    localStorage.setItem('tastList', JSON.stringify(tastList));
  
    test('adds a new task to the list and localStorage', () => {
      // call the addTask function with a new task
      addTask(tastList, 'Task 3');
      
      // get the updated tastList from localStorage
      const updatedTastList = JSON.parse(localStorage.getItem('tastList'));
  
      // get the todo list from the DOM
      const todoList = document.getElementById('todo-list');
      
      // check that the new task was added to the tastList and localStorage
      expect(updatedTastList).toEqual([
        { description: 'Task 1', completed: false, index: 1 },
        { description: 'Task 2', completed: true, index: 2 },
        { description: 'Task 3', completed: false, index: 3 }
      ]);
      
      // check that the new task was added to the DOM
      expect(todoList.children.length).toBe(2);
      expect(todoList.children[1].querySelector('p').textContent).toBe('Task 3');
    });
  });

  describe('deleteTask function', () => {
    // create a mock localStorage object
    const localStorageMock = (() => {
      let store = {};
      return {
        getItem: key => store[key] || null,
        setItem: (key, value) => {
          store[key] = value.toString();
        },
        removeItem: (key) => {
          delete store[key];
        },
        clear: () => {
          store = {};
        },
      };
    })();
  
    beforeEach(() => {
      // set up our document body
      document.body.innerHTML = `
        <ul id="todo-list">
          <li>Task 1</li>
          <li>Task 2</li>
          <li>Task 3</li>
        </ul>
      `;
      // set up our localStorage
      localStorageMock.setItem('tastList', JSON.stringify([
        { description: 'Task 1', completed: false, index: 1 },
        { description: 'Task 2', completed: false, index: 2 },
        { description: 'Task 3', completed: false, index: 3 },
      ]));
      Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
      });
    });
  
    afterEach(() => {
      // reset localStorage after each test
      localStorageMock.clear();
    });
  
    test('should delete task from list and update localStorage', () => {
      const indexToDelete = 1; // delete second task in list
      deleteTask(indexToDelete);
      const list = document.getElementById('todo-list');
      expect(list.children.length).toBe(2); // make sure element was removed from list
      const storedList = JSON.parse(localStorageMock.getItem('tastList'));
      expect(storedList.length).toBe(2); // make sure element was removed from localStorage
      expect(storedList[0].description).toBe('Task 1'); // make sure other elements are still in list
      expect(storedList[1].description).toBe('Task 3');
    });
  
    test('should do nothing if index is out of bounds', () => {
      const indexToDelete = 3; // out of bounds index
      deleteTask(indexToDelete);
      const list = document.getElementById('todo-list');
      expect(list.children.length).toBe(3); // make sure element was not removed from list
      const storedList = JSON.parse(localStorageMock.getItem('tastList'));
      expect(storedList.length).toBe(3); // make sure element was not removed from localStorage
    });
  });
