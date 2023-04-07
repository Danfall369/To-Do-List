let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

export function saveTask() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function removeItem(listItem, index) {
  tasks.splice(index, 1);
  listItem.remove();

  // update indexes of remaining tasks
  for (let i = 0; i < tasks.length; i += 1) {
    tasks[i].index = i + 1;
  }
  saveTask();
}

export function Checkbox(task, listItem) {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.classList.add('checkbox');
  checkbox.checked = task.completed;
  checkbox.addEventListener('change', () => {
    task.completed = checkbox.checked;
    saveTask();
  });
  listItem.appendChild(checkbox);
}

export function editDescription(task, taskDiv) {
  const inputTask = document.createElement('input');
  inputTask.classList.add('taskDiv');
  inputTask.value = task.description;
  taskDiv.replaceWith(inputTask);
  inputTask.focus();
  inputTask.addEventListener('blur', () => {
    task.description = inputTask.value;
    inputTask.replaceWith(taskDiv);
    taskDiv.innerText = task.description;
    saveTask();
  });
}

export function taskList() {
  const taskListElement = document.getElementById('todo-list');
  taskListElement.innerHTML = '';

  tasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.classList.add('listItem');

    Checkbox(task, listItem);

    const taskDiv = document.createElement('div');
    taskDiv.classList.add('taskDiv');
    taskDiv.innerText = task.description;

    taskDiv.addEventListener('dblclick', () => editDescription(task, taskDiv));
    listItem.appendChild(taskDiv);

    const dotsDiv = document.createElement('div');
    dotsDiv.classList.add('dotsDiv');

    const dotsIcon = document.createElement('div');
    dotsIcon.innerHTML = '<i class="bi bi-three-dots-vertical"></i>';
    dotsDiv.appendChild(dotsIcon);
    dotsIcon.addEventListener('click', () => removeItem(listItem, index));
    listItem.appendChild(dotsDiv);
    taskListElement.appendChild(listItem);

    listItem.addEventListener('mouseenter', () => {
      dotsIcon.innerHTML = '<i class="bi bi-trash3"></i>';
    });
    listItem.addEventListener('mouseleave', () => {
      dotsIcon.innerHTML = '<i class="bi bi-three-dots-vertical"></i>';
    });
  });
}

export function addNewTask() {
  const input = document.getElementById('addItem');
  if (!input.value) return;
  const newTask = { description: input.value, completed: false, index: tasks.length + 1 };
  tasks.push(newTask);
  taskList();
  input.value = '';
  saveTask();
}

export function addTask() {
  const input = document.getElementById('addItem');

  addNewTask();

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      addNewTask();
    }
  });
  document.getElementById('Plus').addEventListener('click', addNewTask);
}

export function clearCompleted() {
  const clearButton = document.getElementById('clearButton');
  clearButton.addEventListener('click', () => {
    tasks = tasks.filter((task) => !task.completed);
    taskList();
    saveTask();
  });
}