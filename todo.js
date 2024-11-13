import { deadLine } from './todo1.js';

const LIST = JSON.parse(localStorage.getItem('tasks')) || [];
let taskId = LIST.length ? LIST[LIST.length - 1].id + 1 : 0;

window.toadd = function() {
  const inputs = document.getElementById('inputs');
  inputs.style.display = 'block';
  const buttonX = document.getElementById('buttonX');
  buttonX.style.display = 'none';
};

window.submitX = function() {
  const textX = document.getElementById('textX').value.trim();
  const description = document.getElementById('description').value.trim();
  const dueDate = document.getElementById('dueDate').value.trim();
  const priority = document.getElementById('priority').value.trim();

  if (!textX || !description || !dueDate || !priority) {
    alert('Fill all the inputs');
    return;
  }
  document.getElementById('textX').value = '';
  document.getElementById('description').value = '';
  document.getElementById('dueDate').value = '';
  document.getElementById('priority').value = '';

  const task = {
    id: taskId++,
    title: textX,
    description: description,
    dueDate: dueDate,
    priority: priority,
  };

  LIST.push(task);
  saveTasksToStorage();
  displayList();

  document.getElementById('inputs').style.display = 'none';
  document.getElementById('buttonX').style.display = 'block';
};

window.displayList = function() {
  const list = document.getElementById('listX');
  list.innerHTML = '';

  LIST.forEach((item) => {
    const deadlineMessage = deadLine(item.dueDate);
    const listItem = document.createElement('li');
    listItem.id = `task-${item.id}`;
    listItem.innerHTML = `
      <strong>${item.title}</strong><br><br>
      ${item.description}<br><br>
      Due-Date: ${item.dueDate} ${deadlineMessage}<br><br>
      Priority: ${item.priority}<br><br>
    `;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete Task';
    deleteButton.addEventListener('click', () => deleteItem(item.id));

    listItem.appendChild(deleteButton);
    list.appendChild(listItem);
  });
};

window.deleteItem = function(id) {
  const index = LIST.findIndex((item) => item.id === id);
  if (index !== -1) {
    LIST.splice(index, 1);
    saveTasksToStorage();
    displayList();
  }
};

function saveTasksToStorage() {
  localStorage.setItem('tasks', JSON.stringify(LIST));
}

window.onload = function() {
  displayList();
};
