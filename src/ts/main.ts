import { TodoList } from "./TodoList"; //Importerar klassen.

document.addEventListener("DOMContentLoaded", init);
const todoList = new TodoList();

function init(): void {
  const todoForm = document.querySelector<HTMLFormElement>("#addcomponents");

  const todoTaskInput = document.querySelector<HTMLInputElement>("#todoinput");
  const todoPriorityInput =
    document.querySelector<HTMLInputElement>("#priorityinput");
  //Variabler för formulär och input.

  if (todoForm !== null) {
    todoForm.addEventListener("submit", (event: SubmitEvent) => {
      event.preventDefault(); //Med hjälp av detta kan informationen som skrivs in kontrolleras på önskat sätt.
      if (
        !todoList.addTodo(
          todoTaskInput?.value || "",
          Number(todoPriorityInput?.value),
        ) //Om input ej godkänns kommer ett felmeddelande skapas och placeras i toppen av formuläret.
      ) {
        const errorContainer =
          document.querySelector<HTMLDivElement>("#errorcontainer");
        if (errorContainer !== null) {
          errorContainer.innerHTML = ""; //Rensa felmeddelande.
        }
        const errorEl = document.createElement("p");
        const errorMessage = document.createTextNode(
          "För att lägga till en ny punkt i listan behöver beskrivning fyllas i tillsammans med en prioritetsnivå mellan 1-3!",
        );
        errorEl.appendChild(errorMessage);
        errorContainer?.appendChild(errorEl);
      }
      printTodos(); //Skriver ut todos.
      todoForm.reset(); //Rensa formulär.
    });
  }
  printTodos(); //Skriver ut todos.
}

function printTodos(): void {
  const todoContainer = document.querySelector<HTMLUListElement>("#todolist");
  if (todoContainer !== null) {
    todoContainer.innerHTML = ""; //Rensa listan
  }

  const storedTodos = todoList.getTodos(); //Med getTodos hämtas de objekt som finns i todos-arrayen från klassen.

  storedTodos.forEach((storedTodo, todoIndex) => {
    //Värdet och index skickas med i forEachen.
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    const spaceCheckboxPriority = document.createTextNode(" ");
    checkbox.addEventListener("click", () => taskCompleted(todoIndex));
    //Här skapas en checkbox med ett klickevent där index för objektet i arrayen skickas in i funktionen taskCompleted.

    const liEl = document.createElement("li");
    const priority = document.createTextNode(storedTodo.priority.toString());
    const spaceTaskPriority = document.createTextNode(" - ");
    const task = document.createTextNode(storedTodo.task);
    const breakEl = document.createElement("br");
    //Ovan skapas element med innehåll från input som sedan skrivs ut under "Att göra:".
    liEl.appendChild(checkbox);
    liEl.appendChild(spaceCheckboxPriority);
    liEl.appendChild(priority);
    liEl.appendChild(spaceTaskPriority);
    liEl.appendChild(task);

    if (storedTodo.completed === true) {
      liEl.classList.add("completedtask");
      checkbox.setAttribute("disabled", "true");
    } //Om uppgiften är utförd och completed ändrats till true, kommer en annan klass tilldelas till detta listelement som ger ett annat utseende.

    todoContainer?.appendChild(liEl);
    todoContainer?.appendChild(breakEl);
  });
}

function taskCompleted(index: number): void {
  todoList.markTodoCompleted(index); //Här anropas markTodoCompleted från klassen med valt index, och ändrar värdet på completed till true.
  printTodos(); //Skriver ut todos.
}
