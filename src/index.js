document.addEventListener("DOMContentLoaded", () => {
  console.log("Document is ready!");
  let taskInput = document.querySelector("#task-input");
  let addTaskButton = document.querySelector("#addTaskButton");
  let taskList = document.querySelector("#task-list");
  let emptyImage = document.querySelector("#empty-image");

  function addTask(event) {
    event.preventDefault();
    let taskText = taskInput.value.trim();
    if (taskText !== "") {
      let li = document.createElement("li");
      li.innerHTML = `
      <input type="checkbox" class="task-checkbox" />
      <span class="task-text">${taskText}</span>
      `;

      taskList.appendChild(li);
      taskInput.value = "";
    }

    toggleEmptyState();
  }

  function handleInputChange(event) {
    event.preventDefault();
    console.log("Input changed:", taskInput.value);
    if (taskInput.value.trim() !== "") {
      addTaskButton.disabled = false;
    } else {
      addTaskButton.disabled = true;
    }
  }

  function toggleEmptyState() {
    if (taskList.children.length === 0) {
      emptyImage.style.display = "block";
    } else {
      emptyImage.style.display = "none";
    }
  }

  addTaskButton.addEventListener("click", addTask);
  taskInput.addEventListener("input", handleInputChange);
});
