import { JSDOM } from 'jsdom';
import 'jest-localstorage-mock';
import {
  addTask, saveTask, removeItem,
} from './ToDoList.js';

describe('list test', () => {
  let document;

  beforeAll(() => {
    localStorage.clear();
    const dom = new JSDOM(`<!DOCTYPE html>
      <body>
        <section id="ToDoList">
          <input type="text" name="Demo" id="Demo" value="Demo" />
          <div>
            <input
              type="text"
              name="AddItem"
              id="addItem"
              placeholder="Add to your list"
            /><i id="Plus" class="bi bi-plus-lg"></i>
          </div>
          <ul id="todo-list">
            <!-- Placeholder for To-Do List -->
          </ul>
          <button type="button" id="clearButton">Clear all completed</button>
        </section>
      </body>
    </html>`);
    global.window = dom.window;
    document = dom.window.document;
    global.document = document;
    global.KeyboardEvent = window.KeyboardEvent;
  });

  test('Add new task', () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const input = document.querySelector('#addItem');
    input.value = 'test example 1';
    addTask(input);
    const newTask = {
      description: input.value, completed: false, index: tasks.length + 1,
    };
    tasks.push(newTask);
    saveTask(tasks);

    expect(tasks.length).toBeGreaterThan(0);
  });

  test('Remove Item', () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const input = document.querySelector('#addItem');
    input.value = 'test example 1';
    addTask(input);
    const listItem = document.querySelector('li');
    removeItem(listItem);
    tasks.pop();
    saveTask(tasks);

    expect(tasks.length).toBe(0);
  });
});
