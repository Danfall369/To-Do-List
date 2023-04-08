import { JSDOM } from 'jsdom';
import 'jest-localstorage-mock';
import {
  saveTask, editDescription, Checkbox, clearCompleted, taskList,
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

  test('Edit Description', () => {
    const task = {
      description: 'input', completed: false, index: 0,
    };
    const taskDiv = document.createElement('div');
    const inputTask = document.createElement('input');
    inputTask.classList.add('taskDiv');
    inputTask.value = task.description;
    taskDiv.replaceWith(inputTask);
    inputTask.focus();
    inputTask.addEventListener('blur', () => {
      editDescription(task, inputTask.value, taskDiv);
      saveTask();

      expect(taskDiv.innerText).toEqual('new input');
    });
  });

  test('Checkbox', () => {
    const task = { description: 'input', completed: false, index: 0 };
    const listItem = document.createElement('li');
    Checkbox(task, listItem);
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox');
    listItem.appendChild(checkbox);
    checkbox.click();
    expect(checkbox.checked).toEqual(true);
  });

  test('Clear Complete', () => {
    const tasks = [
      { description: 'task 1', completed: false, index: 0 },
      { description: 'task 2', completed: true, index: 1 },
    ];
    tasks.forEach((task) => {
      const listItem = document.createElement('li');
      taskList(listItem, task);
    });
    clearCompleted();
    const todoList = document.getElementById('todo-list');
    expect(todoList.children.length).toEqual(0);
  });
});