let form = document.querySelector(".js-form");
let list = document.querySelector(".js-todo-list");
let todoItems = [];
// FUNCTIONS
// PARAMETR ""
function addTodo(text) {
  let todo = {
    text: text,
    checked: false,
    id: Date.now(),
  };
  todoItems.push(todo);
  renderTodo(todo);
}
function renderTodo(todo) {
  localStorage.setItem("todoItems", JSON.stringify(todoItems));

  let item = document.querySelector(`[data-key='${todo.id}']`);

  if (todo.deleted) {
    item.remove();
    if (todoItems.length === 0) {
      list.innerHTML = "";
    }
    return; // X
  }

  const isChecked = todo.checked ? "done" : ""; // "done" || ""
  const node = document.createElement("li"); //   <li></li>
  node.setAttribute("class", `todo-item ${isChecked}`);
  node.setAttribute("data-key", todo.id);
  node.innerHTML = `
  <input id="${todo.id}" type="checkbox"/>
  <label for="${todo.id}" class="tick js-tick"></label>
  <span>${todo.text}</span>
  <button class="delete-todo js-delete-todo">
  
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
        viewBox="0 0 512 512" xml:space="preserve">
    <path style="fill:#CCCCCC;" d="M255.832,32.021c123.697,0.096,223.907,100.45,223.811,224.147s-100.45,223.907-224.147,223.811
        C131.863,479.883,31.685,379.633,31.685,256C31.869,132.311,132.143,32.117,255.832,32.021 M255.832,0
        C114.443,0.096-0.096,114.779,0,256.168S114.779,512.096,256.168,512C397.485,511.904,512,397.317,512,256
        C511.952,114.571,397.261-0.048,255.832,0z"/>
    <g>
        
            <rect x="227.863" y="113.103" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -106.0971 255.9227)" style="fill:#E21B1B;" width="56.028" height="285.857"/>
        
            <rect x="112.943" y="227.962" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -106.0594 255.9024)" style="fill:#E21B1B;" width="285.857" height="56.028"/>
    </g>
    </svg>
  </button>
`;

  if (item) {
    list.replaceChild(node, item);
  } else {
    list.append(node);
  }
}
function toggleDone(key) {
  let index = todoItems.findIndex((item) => {
    return item.id === Number(key);
  });
  todoItems[index].checked = !todoItems[index].checked;
  renderTodo(todoItems[index]);
}
function deleteTodo(id) {
  let index = todoItems.findIndex((item) => {
    return item.id === Number(id);
  });
  let todo = {
    deleted: true,
    ...todoItems[index],
  };
  todoItems = todoItems.filter((item) => item.id !== Number.key);
  renderTodo(todo);
}

// END FUNCTIONS

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let input = document.querySelector(".js-todo-input");
  // POLUCHITJ TEXT input.value
  let text = input.value.trim();

  if (text !== "") {
    addTodo(text);
    input.value = "";
    input.focus();
  }
});

list.addEventListener("click", (event) => {
  //
  if (event.target.classList.contains("js-tick")) {
    let itemKey = event.target.parentElement.dataset.key;
    toggleDone(itemKey);
  }
  if (event.target.classList.contains("js-delete-todo")) {
    let itemKey = event.target.parentElement.dataset.key;
    deleteTodo(itemKey);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const ref = localStorage.getItem("todoItems");
  if (ref) {
    todoItems = JSON.parse(ref);
    todoItems.forEach((element) => {
      renderTodo(element);
    });
  }
});
