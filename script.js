const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

window.onload = () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach((element) => {
    createTask(element);
  });
};

function addTask() {
  const text = taskInput.value;
  if (!text) return;
  createTask(text);
  saveTasks();
  taskInput.value = "";
}

function createTask(text) {
  const li = document.createElement("li");
  li.textContent = text;
  li.onclick = () => {
    li.classList.toggle("done");
    saveTasks();
  };

  const delBtn = document.createElement("button");
  delBtn.textContent = "✕";
  delBtn.className = "del-btn";
  delBtn.onclick = (e) => {
    e.stopPropagation();
    li.remove();
    saveTasks();
  };

  li.appendChild(delBtn);
  taskList.appendChild(li);
}

function saveTasks() {
  const tasks = Array.from(taskList.querySelectorAll("li")).map(
    (li) => li.childNodes[0].textContent
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
