import todoController from "./todosController";

export default class ProjectController {
  constructor(todoController) {
    this.todoController = todoController;
  }

  renderProjects() {
    const projectNames = Object.keys(this.todoController.projects);
    projectNames.forEach((projectName) => {
      console.log(projectName);
    });
  }
}