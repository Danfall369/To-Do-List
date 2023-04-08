import './style.css';
import {
  taskList, addTask, clearCompleted, removeItem, Checkbox, mainTitle,
} from './modules/ToDoList.js';

window.addEventListener('load', () => {
  taskList();
  addTask();
  taskList(Checkbox);
  clearCompleted();
  mainTitle();
});
taskList(removeItem);