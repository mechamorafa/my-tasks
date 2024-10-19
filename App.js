document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const task = {
            id: Date.now(),
            text: taskText,
            status: 'todo'
        };
        saveTask(task);
        renderTask(task);
        taskInput.value = '';
        updateTaskCounter();
    }
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(renderTask);
    updateTaskCounter();
}

function renderTask(task) {
    const taskElement = document.createElement('li');
    taskElement.setAttribute('data-id', task.id);
    taskElement.innerHTML = `
        <input type="checkbox" ${task.status === 'done' ? 'checked' : ''} onchange="toggleTaskStatus(${task.id})">
        <span>${task.text}</span>
        <button onclick="deleteTask(${task.id})">x</button>
    `;

    if (task.status === 'todo') {
        document.getElementById('todoList').appendChild(taskElement);
    } else if (task.status === 'doing') {
        document.getElementById('doingList').appendChild(taskElement);
    } else if (task.status === 'done') {
        document.getElementById('doneList').appendChild(taskElement);
    }
}

function toggleTaskStatus(id) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(task => {
        if (task.id === id) {
            if (task.status === 'todo') {
                task.status = 'doing';
            } else if (task.status === 'doing') {
                task.status = 'done';
            } else {
                task.status = 'todo';
            }
        }
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    refreshTasks();
}

function deleteTask(id) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    refreshTasks();
}

function refreshTasks() {
    document.getElementById('todoList').innerHTML = '';
    document.getElementById('doingList').innerHTML = '';
    document.getElementById('doneList').innerHTML = '';
    loadTasks();
}

function updateTaskCounter() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskCounter = document.getElementById('taskCounter');
    const titleCounter = document.getElementById('titleCounter');
    taskCounter.textContent = `Total tasks: ${tasks.length}`;
    titleCounter.textContent = `My Tasks (${tasks.length})`;
}
