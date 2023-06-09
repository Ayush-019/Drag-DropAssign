const todos = document.querySelectorAll(".todo");
const all_status = document.querySelectorAll(".status");
const toastContent = document.querySelector(".toast");
const resetButton = document.querySelector(".resetButton");
let draggableTodo = null;
let todosArray = [];
const inputBox = document.getElementById("todo_input");

todos.forEach((todo) => {
  todosArray.push(todo);
});
inputBox.onkeyup = () => {
  let userEnteredValue = inputBox.value;
  if (userEnteredValue.trim() != 0) {
    add_btn.classList.add("active");
  } else {
    add_btn.classList.remove("active");
  }
};

todos.forEach((todo) => {
  todo.addEventListener("dragstart", dragStart);
  todo.addEventListener("dragend", dragEnd);
});

function dragStart() {
  draggableTodo = this;
  setTimeout(() => {
    this.style.display = "none";
  }, 0);
  console.log("dragStart");
}

function dragEnd() {
  draggableTodo = null;
  setTimeout(() => {
    this.style.display = "block";
  }, 0);
  document.getElementsByClassName("toast").show();
}

all_status.forEach((status) => {
  status.addEventListener("dragover", dragOver);
  status.addEventListener("dragenter", dragEnter);
  status.addEventListener("dragleave", dragLeave);
  status.addEventListener("drop", dragDrop);
});

function dragOver(e) {
  e.preventDefault();
}

function dragEnter() {
  this.style.border = "1px dashed #ccc";
}

function dragLeave() {
  this.style.border = "none";
}

function dragDrop() {
  this.style.border = "none";
  this.appendChild(draggableTodo);
  const toast = new bootstrap.Toast(toastContent);
  toast.show();
}

const btns = document.querySelectorAll("[data-target-modal]");
const todo_submit = document.getElementById("add_btn");

todo_submit.addEventListener("click", createTodo);

function createTodo() {
  const todo_div = document.createElement("div");
  const input_val = document.getElementById("todo_input").value;
  const txt = document.createTextNode(input_val);

  todo_div.appendChild(txt);
  todosArray.push(todo_div);
  todo_div.classList.add("todo");
  todo_div.setAttribute("draggable", "true");

  /* create span */
  const span = document.createElement("span");
  const span_txt = document.createTextNode("\u00D7");
  span.classList.add("close");
  span.appendChild(span_txt);

  todo_div.appendChild(span);

  no_status.appendChild(todo_div);

  span.addEventListener("click", () => {
    span.parentElement.style.display = "none";
  });

  todo_div.addEventListener("dragstart", dragStart);
  todo_div.addEventListener("dragend", dragEnd);

  document.getElementById("todo_input").value = "";
  todo_form.classList.remove("active");
  overlay.classList.remove("active");
}

const close_btns = document.querySelectorAll(".close");

close_btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.parentElement.style.display = "none";
  });
});

//delete todos from list 2 and move 2 list 1
resetButton.addEventListener("click", () => {
  todos.forEach((todo) => {
    todo.remove();
  });
  todosArray.forEach((todo) => {
    console.log(todo);
    no_status.appendChild(todo);
  });
});
