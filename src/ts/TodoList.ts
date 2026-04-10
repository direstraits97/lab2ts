import type { Todo } from "./ITodo";

export class TodoList {
  private todos: Todo[];

  constructor() {
    this.todos = [];
    this.loadFromLocalStorage();
  }

  addTodo(task: string, priority: number): boolean {
    if (task === "") {
      return false;
    }
    if (!(priority === 1 || priority === 2 || priority === 3)) {
      return false;
    }
    const newTodo: Todo = { task, priority, completed: false };
    this.todos.push(newTodo);
    this.saveToLocalStorage();
    return true;
  }

  markTodoCompleted(todoIndex: number): void {
    this.todos[todoIndex].completed = true;
    this.saveToLocalStorage();
  }

  getTodos(): Todo[] {
    return this.todos;
  }

  private saveToLocalStorage(): void {
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  private loadFromLocalStorage(): void {
    const todosString: string = localStorage.getItem("todos") || "[]";
    const todos: Todo[] = JSON.parse(todosString);
    this.todos = todos;
  }
}
