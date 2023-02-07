console.log("test");
let todos = [];
let button = document.querySelector("#buttonid");
let input = document.querySelector("#inputid");
button.addEventListener("click", onclick);
if (document.querySelector("#inputid").value.length == 0) {
  alert("Please Enter a Task");
} else {
  document.querySelector("#tasks").innerHTML += `
        <div class="task">
            <span id="taskname">
                ${document.querySelector("#inputid").value}
            </span>
            <button class="delete">
                <i class="far fa-trash-alt"></i>
            </button>
        </div>
    `;

  let tasks = document.querySelectorAll(".delete");
  for (let i = 0; i < tasks.length; i++) {
    tasks[i].onclick = function () {
      this.parentNode.remove();
    };
  }
}
