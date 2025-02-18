import Project from "./projects";
import Todo from "./todos";

export default class Storage {
  static saveData(projects) {
    localStorage.setItem('projects', JSON.stringify(projects));
  }

  static loadData() {
    const data = JSON.parse(localStorage.getItem('projects')) || {};

    Object.keys(data).forEach((projectName) => {
      const project = Object.assign(new Project(projectName), data[projectName]);

      project.todos = project.todos.map(todo =>
        Object.assign(new Todo(todo.title, todo.description, todo.dueDate, todo.priority), todo)
      );

      data[projectName] = project;
    });

    return data;
  }
}