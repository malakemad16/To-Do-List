let inputTask = document.querySelector(".input");
let addTask = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

// Empty Array To Store The Tasks
let arrayOfTasks = [];

// Check if There Tasks In Local Storage
if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

getFromLocalStorage();

addTask.addEventListener("click", function () {
    if (inputTask.value !== "") {
        addTaskToArray(inputTask.value); // Add Task To Array Of Tasks
        inputTask.value = ""; // Empty The Input Field
    }
});

tasksDiv.addEventListener("click", (e) => {
    // Delete Button
    if (e.target.classList.contains("del")) {
        // Remove Task From Local Storage 
        deleteTask(e.target.parentElement.getAttribute("data-id"));
        // Remove Element Fe=rom Page
        e.target.parentElement.remove();
    }
    if (e.target.classList.contains("task")) {
        // Toggle Done Class
        e.target.classList.toggle("done");
    }
})
function addTaskToArray(text) {
    // Task Data
    const task = {
        id: Date.now(),
        title: text,
        completed: false,
    }
    // Push Task To Array Of Tasks
    arrayOfTasks.push(task);
    // Add Tasks To Page
    addElements(arrayOfTasks);
    // Add Tasks to Local Storage
    addToLocalStorage(arrayOfTasks);
}

function addElements(arrayOfTasks) {
    // Empty Tasks Div
    tasksDiv.innerHTML = "";
    // Looping On Array Of Tasks
    arrayOfTasks.forEach((task) => {
        let div = document.createElement("div");
        div.className = "task";
        // Check if Task is Done
        if (task.completed) {
            div.className = "task done";
        }
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));
        let span = document.createElement("button");
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"));
        div.appendChild(span);
        tasksDiv.appendChild(div);
    });
}

function addToLocalStorage(arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
};

function getFromLocalStorage() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data);
        addElements(tasks);
    }
}

function deleteTask(taskId) {
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addToLocalStorage(arrayOfTasks);
}

function toggleStatusTask(taskId) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].id == taskId) {
            arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed == true) : (arrayOfTasks[i].completed == false);
        }
    }
    addToLocalStorage(arrayOfTasks);
}