import { TodoList } from "./TodoList";

document.addEventListener("DOMContentLoaded", init);
const todoList = new TodoList();

function init(): void {
  const todoForm = document.querySelector<HTMLFormElement>("#addcomponents");

  const todoTaskInput = document.querySelector<HTMLInputElement>("#todoinput");
  const todoPriorityInput =
    document.querySelector<HTMLInputElement>("#priorityinput");

  if (todoForm !== null) {
    todoForm.addEventListener("submit", (event: SubmitEvent) => {
      event.preventDefault();
      if (
        !todoList.addTodo(
          todoTaskInput?.value || "",
          Number(todoPriorityInput?.value),
        )
      ) {
        const errorContainer =
          document.querySelector<HTMLDivElement>("#errorcontainer");
        if (errorContainer !== null) {
          errorContainer.innerHTML = "";
        }
        const errorEl = document.createElement("p");
        const errorMessage = document.createTextNode(
          "För att lägga till en ny punkt i listan behöver beskrivning fyllas i tillsammans med en prioritetsnivå mellan 1-3!",
        );
        errorEl.appendChild(errorMessage);
        errorContainer?.appendChild(errorEl);
      }
      printTodos();
    });
  }
  printTodos();
}

function printTodos(): void {
  const todoContainer = document.querySelector<HTMLUListElement>("#todolist");
  if (todoContainer !== null) {
    todoContainer.innerHTML = "";
  }

  const storedTodos = todoList.getTodos();
  console.log(storedTodos);

  storedTodos.forEach((storedTodo, todoIndex) => {
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    const spaceCheckboxPriority = document.createTextNode(" ");
    checkbox.addEventListener("click", () => taskCompleted(todoIndex));

    const liEl = document.createElement("li");
    const priority = document.createTextNode(storedTodo.priority.toString());
    const spaceTaskPriority = document.createTextNode(" - ");
    const task = document.createTextNode(storedTodo.task);
    const breakEl = document.createElement("br");

    liEl.appendChild(checkbox);
    liEl.appendChild(spaceCheckboxPriority);
    liEl.appendChild(priority);
    liEl.appendChild(spaceTaskPriority);
    liEl.appendChild(task);

    if (storedTodo.completed === true) {
      liEl.classList.add("completedtask");
      checkbox.setAttribute("disabled", "true");
    }

    todoContainer?.appendChild(liEl);
    todoContainer?.appendChild(breakEl);
  });
}

function taskCompleted(index: number): void {
  todoList.markTodoCompleted(index);
  printTodos();
}
