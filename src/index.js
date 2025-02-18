import '../src/style.css';
import TodoController from "./modules/todosController";
import ProjectController from "./modules/projectsController";
import { formatDate } from "./modules/date";

const todoController = new TodoController();
const projectController = new ProjectController(todoController);

const addProjectBtn = document.getElementById('add-project-btn');
const addTodoBtn = document.getElementById('add-todo-btn');
const projectList = document.querySelector('.project-list');
const todoList = document.querySelector('.todo-list');
const projectName = document.getElementById('project-name');

addProjectBtn.addEventListener('click', () => {
  const projectNamePrompt = prompt('Enter project name:');
  if (projectNamePrompt) {
    todoController.addProject(projectNamePrompt);
    updateProjectList();
  }
});

addTodoBtn.addEventListener('click', () => {
  const title = prompt('Enter task title:');
  const description = prompt('Enter task description:');
  const dueDate = prompt('Enter due date (YYYY-MM-DD):');
  const priority = prompt('Enter priority (high, medium, low):');
  if (title && description && dueDate && priority) {
    todoController.addTodo(title, description, dueDate, priority);
    updateTodoList();
  }
});

function updateProjectList() {
  projectList.innerHTML = '';
  const projects = Object.keys(todoController.projects);
  projects.forEach((project) => {
    const li = document.createElement('li');
    li.classList.add('project-item');
    li.textContent = project;
    li.addEventListener('click', () => {
      todoController.changeProject(project);
      updateTodoList();
    });
    projectList.appendChild(li);
  });
}

function updateTodoList() {
  todoList.innerHTML = '';
  const todos = todoController.getTodos();
  todos.forEach((todo, index) => {
    const div = document.createElement('div');
    div.classList.add('todo-item');
    if (todo.completed) div.classList.add('completed');

    const title = document.createElement('span');
    title.classList.add('todo-title');
    title.textContent = todo.title;
    div.appendChild(title);

    const dueDate = document.createElement('span');
    dueDate.classList.add('todo-due-date');
    dueDate.textContent = todo.dueDate;
    div.appendChild(dueDate);

    const priority = document.createElement('span');
    priority.classList.add('todo-priority');
    priority.textContent = todo.priority;
    div.appendChild(priority);

    const completeButton = document.createElement('button');
    completeButton.textContent = 'Complete';
    completeButton.addEventListener('click', () => {
      todoController.markTodoAsComplete(index);
      updateTodoList();
    });
    div.appendChild(completeButton);

    todoList.appendChild(div);
  });
}

export const UI = {
  updateProjectTitle(projectName) {
    const titleElement = document.querySelector('h1');
    if (titleElement) {
      titleElement.textContent = projectName;
    }
  },

  renderTodos(todos) {
    const todoContainer = document.querySelector('.todo-list');
    todoContainer.innerHTML = '';

    todos.forEach(todo => {
      const todoItem = document.createElement('div');
      todoItem.textContent = `${todo.title} (дата: ${todo.dueDate})`;
      todoContainer.appendChild(todoItem);
    });
  }
};

updateProjectList();
updateTodoList();