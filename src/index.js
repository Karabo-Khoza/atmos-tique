// Main JavaScript file for the to-do list application
// Wait for the DOM to fully load (Main Function)
document.addEventListener("DOMContentLoaded", () => {
  console.log("Document is ready!");
  let taskInput = document.querySelector("#task-input");
  let addTaskButton = document.querySelector("#addTaskButton");
  let taskList = document.querySelector("#task-list");
  let emptyImage = document.querySelector("#empty-image");
  let todoContainer = document.querySelector(".todo-container");
  let progressBar = document.querySelector("#progress");
  let progressNumber = document.querySelector("#numbers");

  // Initialize progress bar
  function updateProgress() {
    let totalTasks = taskList.children.length;
    let completedTasks = taskList.querySelectorAll(".checkbox:checked").length;
    progressBar.style.width = totalTasks
      ? `${(completedTasks / totalTasks) * 100}%`
      : "0%";
    progressNumber.textContent = `${completedTasks} / ${totalTasks}`;
  }

  function addTask(event, completed = false, checkCompletion = true) {
    // Add a new task to the task list
    event.preventDefault();
    let taskText = taskInput.value.trim();
    if (taskText !== "") {
      // Create new list item
      let li = document.createElement("li");
      li.innerHTML = `
      <input type="checkbox" class="checkbox" ${completed ? "checked" : ""}>
      <span class="task-text">${taskText}</span>
      <div class="task-buttons">
        <button class="edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
      </div>
      `;

      // Function to edit task
      function editTask() {
        if (!checkbox.checked) {
          taskInput.value = li.querySelector(".task-text").textContent;
          taskList.removeChild(li);
          toggleEmptyState();
          updateProgress();
        }
      }

      let checkbox = li.querySelector(".checkbox");

      // Toggle task completion
      let editBtn = li.querySelector(".edit-btn");

      if (completed) {
        li.classList.add("completed");
        editBtn.disabled = true;
        editBtn.style.cursor = "not-allowed";
        editBtn.style.opacity = "0.5";
      }

      function toggleCompletion() {
        let isChecked = checkbox.checked;
        li.classList.toggle("completed", isChecked);
        editBtn.disabled = isChecked;
        editBtn.style.cursor = isChecked ? "not-allowed" : "pointer";
        editBtn.style.opacity = isChecked ? "0.5" : "1";
        updateProgress();
      }

      // Function to delete task
      function deleteTask() {
        taskList.removeChild(li);
        toggleEmptyState();
        updateProgress();
      }

      // Add event listeners for edit, delete, and checkbox buttons
      li.querySelector(".edit-btn").addEventListener("click", editTask);
      li.querySelector(".delete-btn").addEventListener("click", deleteTask);
      checkbox.addEventListener("change", toggleCompletion);

      // Append the new task to the list
      taskList.appendChild(li);
      // Clear input field
      taskInput.value = "";
    }

    toggleEmptyState();
    updateProgress((checkCompletion = true));
  }

  function handleInputChange(event) {
    // Update the add task button state based on input
    event.preventDefault();
    console.log("Input changed:", taskInput.value);
    if (taskInput.value.trim() !== "") {
      addTaskButton.disabled = false;
    } else {
      addTaskButton.disabled = true;
    }
  }

  function toggleEmptyState() {
    // Show or hide the empty image based on task list state
    if (taskList.children.length === 0) {
      emptyImage.style.display = "block";
    } else {
      emptyImage.style.display = "none";
    }

    // Adjust todo container width based on task list state
    todoContainer.style.width = taskList.children.length === 0 ? "100%" : "50%";
  }

  addTaskButton.addEventListener("click", addTask);
  taskInput.addEventListener("input", handleInputChange);
  updateProgress((checkCompletion = true));
});
