// Use generic (<>) to specify the type of each element (apply for querySelector, not work for getElementById)
const list = document.querySelector<HTMLUListElement>("#list")
const form = document.querySelector<HTMLFormElement>("#new-task-form")
const input = document.querySelector<HTMLInputElement>("#new-task-title")

// If using getElementById, use 'as' to specify the types
// const list = document.getElementById("list")  as HTMLUListElement | null
// const form = document.getElementById("new-task-form") as HTMLFormElement | null
// const input = document.getElementById("new-task-title") as HTMLInputElement | null

form?.addEventListener("submit", e => {
  e.preventDefault();
})