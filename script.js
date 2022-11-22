// DOM
const body = document.querySelector(".body");
const addBtn = document.querySelector(".add-btn");
const userTask = document.querySelector(".newTask");
const currentList = document.querySelector(".currentToDo-List");
const itemsLeft = document.querySelector(".items-left");
const currentTheme = document.querySelector(".current-theme");
const currentStatus = document.querySelectorAll(".status");
const clearCompleted = document.querySelector(".clear-Completed");
const all = document.querySelector(".all");
const active = document.querySelector(".active");
const completed = document.querySelector(".completed");
const main = document.querySelector(".main");
const toDo = document.querySelector(".toDo-List");

// Variables.

let itemsRemaining = 0;

// Functions.

// Creating of new task.

function todoTask(userTaskValue) {
  const li = document.createElement("li");

  li.setAttribute("class", "new-items");
  li.setAttribute("draggable", "true");
  li.innerHTML = `<div  class="task-info">
  <div class="task-cta">
  <form>
  <label class= "label" ><input type="checkbox" class="userInput"> <span class = "taskName">${userTaskValue}</span></label>
  </form>
  </div>
  <button class = "close-btn"><img  src="./images/icon-cross.svg"></button>  
  </div>
  <hr>`;

  currentList.prepend(li);
}

// Getting the items remaining in the todo list dynamically.

function itemsIncomplete() {
  itemsRemaining =
    document.querySelectorAll(".new-items").length -
    document.querySelectorAll('input[type="checkbox"]:checked').length;
  return itemsRemaining;
}

// Drag and Drop Function
function enableDragSort(listClass) {
  const sortableLists = document.getElementsByClassName(listClass);

  Array.prototype.map.call(sortableLists, (list) => {
    enableDragList(list);
  });
}

function enableDragList(list) {
  Array.prototype.map.call(list.children, (item) => {
    enableDragItem(item);
  });
  console.log("b");
}

function enableDragItem(item) {
  item.setAttribute("draggable", true);
  item.ondrag = handleDrag;
  item.ondragend = handleDrop;
  console.log("c");
}

function handleDrag(item) {
  const selectedItem = item.target,
    list = selectedItem.parentNode,
    x = event.clientX,
    y = event.clientY;

  selectedItem.classList.add("drag-sort-active");
  let swapItem =
    document.elementFromPoint(x, y) === null
      ? selectedItem
      : document.elementFromPoint(x, y);

  if (list === swapItem.parentNode) {
    swapItem =
      swapItem !== selectedItem.nextSibling ? swapItem : swapItem.nextSibling;
    list.insertBefore(selectedItem, swapItem);
  }
}

function handleDrop(item) {
  item.target.classList.remove("drag-sort-active");
  console.log("e");
}

// All,Active,Completed CTA .

currentStatus.forEach((presentState) => {
  presentState.addEventListener("click", function () {
    currentStatus.forEach((clicked) => {
      clicked === presentState
        ? (clicked.style.color = "hsl(220, 98%, 61%)")
        : (clicked.style.color = "");
    });
  });
});

// Theme Change.
currentTheme.addEventListener("click", function () {
  body.classList.toggle("dark-mode");
  main.classList.toggle("dark-theme");
  toDo.classList.toggle("dark-theme");
});

// Add Button Functionality.
addBtn.addEventListener("click", function () {
  if (userTask.value) {
    todoTask(userTask.value);
    userTask.value = "";

    itemsLeft.textContent = itemsIncomplete();

    // Drag and Drop
    if (currentList.childElementCount > 2) {
      enableDragSort("currentToDo-List");
    }

    // Close Button Functionality.
    const closeTask = document.querySelector(".close-btn");
    closeTask.addEventListener("click", function () {
      // checkes if the corresponding inout is checked or not.
      let inputChecked =
        closeTask.previousElementSibling.querySelector(".userInput").checked;

      if (inputChecked) {
        closeTask.parentElement.parentElement.remove();
      } else {
        closeTask.parentElement.parentElement.remove();

        itemsLeft.textContent = itemsIncomplete();
      }
    });

    // Task Completed.
    const taskCompleted = document.querySelector(".userInput");
    const taskName = document.querySelector(".taskName");

    taskCompleted.addEventListener("click", function () {
      let inputChecked = taskName.previousElementSibling.checked;

      if (inputChecked) {
        taskName.style.textDecoration = "line-through";
        taskName.style.color = "hsl(234, 11%, 52%)";
        itemsLeft.textContent = itemsIncomplete();
      } else {
        taskName.style.textDecoration = "none";
        // onClick decoraation depending upon the theme.
        if (main.classList.contains("dark-theme")) {
          taskName.style.color = "white";
        } else {
          taskName.style.color = "black";
        }

        itemsLeft.textContent = itemsIncomplete();
      }
    });
  } else {
    alert("Please Add a Task ");
  }
});

// Active Button.
active.addEventListener("click", function () {
  if (currentList.childElementCount > 1) {
    document.querySelectorAll(".userInput").forEach((input) => {
      if (input.checked) {
        input.closest(".new-items").style.display = "none";
      }
    });
  }
});

// All Button.
all.addEventListener("click", function () {
  document.querySelectorAll(".new-items").forEach((newItem) => {
    newItem.style.display = "flex";
  });
});

// Completed Tasks.

completed.addEventListener("click", function () {
  document.querySelectorAll(".new-items").forEach((newItem) => {
    let inputChecked = newItem.querySelector(
      ".task-info > .task-cta > form > label > .userInput"
    ).checked;

    if (inputChecked) {
      newItem.style.display = "flex";
    } else {
      newItem.style.display = "none";
    }
  });
});

// Clear Completed

clearCompleted.addEventListener("click", function () {
  document.querySelectorAll(".new-items").forEach((newItem) => {
    let inputChecked = newItem.querySelector(
      ".task-info > .task-cta > form > label > .userInput"
    ).checked;
    if (inputChecked) {
      newItem.style.display = "none";
    }
  });
});

if (screen.width > 1000) {
  const parent = document.querySelector(".current-info");
  parent.appendChild(document.querySelector(".current-Status"));
}
