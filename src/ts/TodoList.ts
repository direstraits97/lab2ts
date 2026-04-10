import type { Todo } from "./ITodo"; //Importerar interface

export class TodoList {
  private todos: Todo[]; //Här ska objekten hamna när de skapas, den kan vara private då den endast behöver ges åtkomst inom klassen.

  constructor() {
    this.todos = []; //Påbörjas med en tom array som sedan fylls med hjälp av loadFromLocalStorage-funktionen varje gång ett nytt att-göra-objekt skapas.
    this.loadFromLocalStorage();
  }

  addTodo(task: string, priority: number): boolean {
    if (task === "") {
      return false;
    }
    if (!(priority === 1 || priority === 2 || priority === 3)) {
      return false;
    } //Ovan valideras input, vilket innebär att tillägg bara görs om task innehåller text och priority innehåller 1,2 eller 3.
    const newTodo: Todo = { task, priority, completed: false }; //Ett nytt tillägg måste följa interfacet, och completed är alltid false till att börja med.
    this.todos.push(newTodo); //Nya todos pushas till klassens todos-array.
    this.saveToLocalStorage(); //Detta sparas med hjälp av saveToLocalStorage-funktionen.
    return true; //Om all input stämmer returneras true.
  }

  markTodoCompleted(todoIndex: number): void {
    this.todos[todoIndex].completed = true;
    this.saveToLocalStorage(); //Denna funktion tar in ett index-nummer från todos-arrayen och ändrar värdet i completed från false till true.
  }

  getTodos(): Todo[] {
    return this.todos; //Demma funktion returnerar todos-arrayen i klassen utan att direkt påverka de andra funktionerna.
  }

  private saveToLocalStorage(): void {
    localStorage.setItem("todos", JSON.stringify(this.todos)); //Denna funktion omvandlar objekten i todos-arrayen till en sträng för att kunna lagras i localStorage.
  }

  private loadFromLocalStorage(): void {
    const todosString: string = localStorage.getItem("todos") || "[]"; //Antingen hämtas det som finns i todos-arrayen, eller så hämtas en tom array.
    const todos: Todo[] = JSON.parse(todosString); //Datat som hämtas omvandlas till ett objekt.
    this.todos = todos; //Arrayen todos i klassen uppdateras för att matcha det som finns i localStorage.
  }
}
//De funktioner som ej behöver ha åtkomst utanför klassen har tilldelats private.
