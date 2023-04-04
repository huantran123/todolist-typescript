import {v4 as uuidV4} from "uuid";

// Use generic (<>) to specify the type of each element (apply for querySelector, not work for getElementById)
const list = document.querySelector<HTMLUListElement>("#list")
const form = document.querySelector<HTMLFormElement>("#new-task-form")
const input = document.querySelector<HTMLInputElement>("#new-task-title")
const tasks: Task[] = loadTasks()
tasks.forEach(addListItem) // Render all the existing tasks in local storage

type Task = {
  id: string,
  title: string,
  completed: boolean,
  createAt: Date}

// If using getElementById, use 'as' to specify the types
// const list = document.getElementById("list")  as HTMLUListElement | null
// const form = document.getElementById("new-task-form") as HTMLFormElement | null
// const input = document.getElementById("new-task-title") as HTMLInputElement | null

form?.addEventListener("submit", e => {
  e.preventDefault();

  // Add ? (optional chaining) in case input is null because nothing with the id #new-task-title exists
  if (input?.value === '' || input?.value === null) return

  const newTask:Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createAt: new Date()
  }
  tasks.push(newTask)
  saveTasks()

  addListItem(newTask)
  input.value = ''
})

function addListItem(task: Task) {
  const item = document.createElement("li")
  const label = document.createElement("label")
  const checkbox = document.createElement("input")
  checkbox.type = "checkbox"
  checkbox.checked = task.completed
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked
    saveTasks()
  })
  label.append(checkbox, task.title)
  item.append(label)
  list?.append(item)
}

function saveTasks() {
  localStorage.setItem("TASKS", JSON.stringify(tasks))
}

function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem("TASKS");
  if (taskJSON === null) return []
  return JSON.parse(taskJSON)
}