const input = document.getElementById("taskname");
const addBtn = document.getElementById("addtask");
const filters = document.querySelectorAll("input[name='filter']");
const list = document.createElement("div");
list.className = "tasklist";
document.body.insertBefore(list, document.getElementById("counter"));
const counter = document.getElementById("counter");

let tasks = [];

function render() {
  list.innerHTML = "";
  const filter = document.querySelector("input[name='filter']:checked").value;

  tasks.forEach((t, i) => {
    if (filter === "done" && !t.done) return;
    if (filter === "todo" && t.done) return;

    const div = document.createElement("div");
    div.className = "task";

    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = t.done;
    cb.onchange = () => {
      t.done = cb.checked;
      render();
    };

    const span = document.createElement("span");
    span.textContent = t.text;
    if(t.done) span.style.textDecoration="line-through";

    const del = document.createElement("button");
    del.textContent = "🗑️";
    del.onclick = () => {
      tasks.splice(i, 1);
      render();
    };

    div.append(cb, span, del);
    list.appendChild(div);
  });

  updateCounter();
}

function updateCounter() {
  const left = tasks.filter(t => !t.done).length;
  counter.textContent = `Осталось невыполненных задач: ${left}`;
}

function addTask() {
  const text = input.value.trim();
  if (!text) return;
  tasks.push({ text, done: false });
  input.value = "";
  render();
}

addBtn.onclick = addTask;
filters.forEach(f => f.onchange = render);

render();