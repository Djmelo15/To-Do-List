document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("task-input");
    const addTaskButton = document.getElementById("add-task");
    const taskList = document.getElementById("task-list");
    const duedateinput = document.getElementById("due-date");
    const Priorityinput = document.getElementById("task-priority");
  
    // Function to load tasks from local storage
    function loadTasksFromLocalStorage() {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      for (const task of tasks) {
        addTaskToList(task.taskText, task.dueDate, task.urgency, task.color);
      }
    }
  
    // Function to save tasks to local storage
    function saveTasksToLocalStorage(tasks) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
    function addTaskToList(taskText, dueDate, urgency, color) {
      const listItem = document.createElement("div");
      listItem.className = "task-item";
  
      const completeButton = document.createElement("button");
      completeButton.textContent = "✓";
      completeButton.className = "complete-button";
      completeButton.addEventListener("click", function () {
        listItem.classList.toggle("Completed");
        if (listItem.classList.contains("Completed")) {
          listItem.style.backgroundColor = "lightgreen";
        }
        saveTasksToLocalStorage(getAllTasks());
      });
  
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "X";
      deleteButton.className = "delete-button";
      deleteButton.addEventListener("click", function () {
        taskList.removeChild(listItem);
        const tasks = getAllTasks();
        const index = tasks.findIndex((task) => task.taskText === taskText);
        if (index !== -1) {
          tasks.splice(index, 1);
          saveTasksToLocalStorage(tasks);
        }
      });
  
      listItem.appendChild(completeButton);
  
      const taskTextElement = document.createElement("span");
      taskTextElement.textContent = taskText;
      listItem.appendChild(taskTextElement);
  
      listItem.appendChild(deleteButton);
  
      if (dueDate) {
        const duedateElement = document.createElement("p");
        duedateElement.textContent = "Due Date: " + dueDate;
        listItem.appendChild(duedateElement);
      }
      if (urgency) {
        const PriorityElement = document.createElement("p");
        PriorityElement.textContent = "Priority: " + urgency;
        listItem.appendChild(PriorityElement);
      }
      if (color) {
        listItem.style.backgroundColor = color;
      }
  
      taskList.appendChild(listItem);
    }
  
    function getAllTasks() {
      const tasks = [];
      const taskItems = taskList.querySelectorAll(".task-item");
      taskItems.forEach((taskItem) => {
        const taskText = taskItem.querySelector("span").textContent;
        const dueDateElement = taskItem.querySelector("p");
        const dueDate = dueDateElement ? dueDateElement.textContent.substring(10) : "";
        const urgencyElement = taskItem.querySelector("p");
        const urgency = urgencyElement ? urgencyElement.textContent.substring(10) : "";
        const color = taskItem.style.backgroundColor;
        tasks.push({ taskText, dueDate, urgency, color });
      });
      return tasks;
    }
  
    // Load tasks from local storage when the page loads
    loadTasksFromLocalStorage();
  
    addTaskButton.addEventListener("click", function () {
      const taskText = taskInput.value.trim();
      const dueDate = duedateinput.value;
      const urgency = Priorityinput.value;
      const color = Priorityinput.value === "Urgent" ? "lightcoral" : (Priorityinput.value === "Moderate" ? "orange" : "yellow");
  
      if (taskText) {
        addTaskToList(taskText, dueDate, urgency, color);
  
        // Save the new task to local storage
        const tasks = getAllTasks();
        saveTasksToLocalStorage(tasks);
  
        taskInput.value = "";
        duedateinput.value = "";
        Priorityinput.value = "";
      }
    });
  });
  