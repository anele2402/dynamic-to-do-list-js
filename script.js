let tasks = []; 

function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        tasks.forEach(taskText => {
            createTaskElement(taskText);
        });
    }
}

function createTaskElement(taskText) {
    const taskList = document.getElementById('task-list');

    const li = document.createElement('li');
    li.textContent = taskText;
    li.classList.add('task-item');

    const removeBtn = document.createElement('button');
    removeBtn.textContent = "Remove";
    removeBtn.classList.add('remove-btn');

    removeBtn.onclick = function () {
        taskList.removeChild(li);
        tasks = tasks.filter(task => task !== taskText);
        saveTasks();
    };

    li.appendChild(removeBtn);
    taskList.appendChild(li);
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        createTaskElement(taskText);
        tasks.push(taskText);
        saveTasks();
        taskInput.value = '';
    } else {
        alert("Enter a task");
    }
}


document.addEventListener('DOMContentLoaded', () => {
    loadTasks(); 

    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');


    addButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

});
