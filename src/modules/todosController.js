import Todo from './todos';
import Project from './projects';
import Storage from './storage';
import { UI } from '../index';

export default class todoController {
  constructor() {
    this.projects = Storage.loadData();
    this.currentProject = 'default';

    Object.keys(this.projects).forEach((key) => {
      this.projects[key] = Object.assign(new Project(key), this.projects[key]);
    });
  }

  addTodo(title, description, dueDate, priority) {
    const todo = new Todo(title, description, dueDate, priority);
    if (!this.projects[this.currentProject]) {
      this.projects[this.currentProject] = new Project(this.currentProject);
    }
    this.projects[this.currentProject].addTodo(todo);
    Storage.saveData(this.projects);
  }

  getTodos() {
    return this.projects[this.currentProject] ? this.projects[this.currentProject].getTodos() : [];
  }

  markTodoAsComplete(todoIndex) {
    const todo = this.projects[this.currentProject].getTodos()[todoIndex];
    todo.markComplete();
    Storage.saveData(this.projects);
  }

  changeProject(projectName) {
    this.currentProject = projectName;
    UI.updateProjectTitle(projectName);
    UI.renderTodos(this.getTodos());
  }

  addProject(projectName) {
    if (!this.projects[projectName]) {
      this.projects[projectName] = new Project(projectName);
      Storage.saveData(this.projects);
    }
  }
}