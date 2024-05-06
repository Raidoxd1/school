class TodoApp {
  constructor() {
    this.framework = new Framework();
    this.todoList = [];
    this.filteredTodoList = [];
    this.todoInput = null;
    this.todoListContainer = null;
    this.footer = null;
    this.totalCountElement = null;
    this.completedCountElement = null;
    this.viewAllButton = null;
    this.viewCompletedButton = null;
    this.viewIncompleteButton = null;
    this.deleteCompletedButton = null;
    this.currentView = 'all';

    this.initialize();
  }

  initialize() {
    this.framework.addRoute('', () => this.handleView('all'));
    this.framework.addRoute('completed', () => this.handleView('completed'));
    this.framework.addRoute('active', () => this.handleView('incomplete'));

    this.createElements();
    this.addEventHandlers();
    this.renderTodoList();

    window.onhashchange = () => this.framework.handleHashChange();
  }

  createElements() {
    const header = this.framework.createElement('header');
    const h1 = this.framework.createElement('h1', {}, 'TODO MVC');
    this.todoInput = this.framework.createElement('input', { type: 'text', id: 'todo-input', placeholder: 'Add a new todo...' });
    header.appendChild(h1);
    header.appendChild(this.todoInput);

    this.todoListContainer = this.framework.createElement('section', { id: 'todo-list' });

    const viewAllButton = this.framework.createElement('button', { id: 'view-all' }, 'All');
    const viewCompletedButton = this.framework.createElement('button', { id: 'view-completed' }, 'Completed');
    const viewIncompleteButton = this.framework.createElement('button', { id: 'view-incomplete' }, 'Incomplete');
    this.viewAllButton = viewAllButton;
    this.viewCompletedButton = viewCompletedButton;
    this.viewIncompleteButton = viewIncompleteButton;
    const viewButtonsDiv = this.framework.createElement('div', { id: 'view-buttons' });
    viewButtonsDiv.append(viewAllButton, viewCompletedButton, viewIncompleteButton);

    const totalCountElement = this.framework.createElement('span', { id: 'total-count' }, 'Total Todos: 0');
    const completedCountElement = this.framework.createElement('span', { id: 'completed-count' }, 'Completed: 0 / Incomplete: 0');
    const deleteCompletedButton = this.framework.createElement('button', { id: 'delete-completed' }, 'Delete Completed');
    this.totalCountElement = totalCountElement;
    this.completedCountElement = completedCountElement;
    this.deleteCompletedButton = deleteCompletedButton;
    const countersDiv = this.framework.createElement('div', { id: 'counters' });
    countersDiv.append(totalCountElement, completedCountElement, deleteCompletedButton);

    this.footer = this.framework.createElement('footer', { id: 'footer' });
    this.footer.append(viewButtonsDiv, countersDiv);

    document.body.append(header, this.todoListContainer, this.footer);
  }

  addEventHandlers() {
    this.framework.handleEvent(this.todoInput, 'keydown', this.handleTodoInput.bind(this));
    this.framework.handleEvent(this.viewAllButton, 'click', () => (window.location.hash = ''));
    this.framework.handleEvent(this.viewCompletedButton, 'click', () => (window.location.hash = 'completed'));
    this.framework.handleEvent(this.viewIncompleteButton, 'click', () => (window.location.hash = 'active'));
    this.framework.handleEvent(this.deleteCompletedButton, 'click', this.deleteCompletedTodos.bind(this));
  }

  handleTodoInput(event) {
    if (event.key === 'Enter') {
      const todoText = this.todoInput.value.trim();
      if (todoText !== '') {
        this.addTodoItem(todoText);
        this.todoInput.value = '';
      }
    }
  }

  addTodoItem(text) {
    const todoItem = { id: Date.now(), text, completed: false };
    this.todoList.push(todoItem);
    this.framework.handleStateChange('todoList', this.todoList);
    this.filterTodoList();
    this.renderTodoList();
  }

  toggleTodoItem(todoId) {
    const todoItem = this.todoList.find((todo) => todo.id === todoId);
    if (todoItem) {
      todoItem.completed = !todoItem.completed;
      this.framework.handleStateChange('todoList', this.todoList);
      this.filterTodoList();
      this.renderTodoList();
    }
  }

  deleteTodoItem(todoId) {
    this.todoList = this.todoList.filter((todo) => todo.id !== todoId);
    this.framework.handleStateChange('todoList', this.todoList);
    this.filterTodoList();
    this.renderTodoList();
  }

  handleView(view) {
    this.framework.handleStateChange('currentView', view);
    this.filterTodoList();
    this.renderTodoList();
  }

  deleteCompletedTodos() {
    this.todoList = this.todoList.filter((todo) => !todo.completed);
    this.framework.handleStateChange('todoList', this.todoList);
    this.filterTodoList();
    this.renderTodoList();
  }

  filterTodoList() {
    const currentView = this.framework.currentView; // Retrieve currentView from the Framework instance
    if (currentView === 'completed') {
      this.filteredTodoList = this.todoList.filter((todo) => todo.completed);
    } else if (currentView === 'incomplete') {
      this.filteredTodoList = this.todoList.filter((todo) => !todo.completed);
    } else {
      this.filteredTodoList = [...this.todoList];
    }
  }

  renderTodoList() {
    this.todoListContainer.innerHTML = '';

    let completedCount = 0;

    this.filteredTodoList.forEach((todoItem) => {
      const listItem = this.framework.createElement('li', { class: 'todo-item' });

      const checkbox = this.framework.createElement('input', { type: 'checkbox', checked: todoItem.completed });
      this.framework.handleEvent(checkbox, 'change', () => {
        this.toggleTodoItem(todoItem.id);
      });

      const text = this.framework.createElement('span', { contentEditable: true }, todoItem.text);
      this.framework.handleEvent(text, 'input', () => {
        todoItem.text = text.textContent.trim();
      });

      const deleteButton = this.framework.createElement('button', {}, 'Delete');
      this.framework.handleEvent(deleteButton, 'click', () => {
        this.deleteTodoItem(todoItem.id);
      });

      listItem.appendChild(checkbox);
      listItem.appendChild(text);
      listItem.appendChild(deleteButton);

      this.todoListContainer.appendChild(listItem);

      if (todoItem.completed) {
        completedCount++;
      }
    });

    const totalCount = this.todoList.length;
    const incompleteCount = totalCount - completedCount;

    this.totalCountElement.textContent = `Total Todos: ${totalCount}`;
    this.completedCountElement.textContent = `Completed: ${completedCount} / Incomplete: ${incompleteCount}`;

    this.viewAllButton.classList.toggle('active', this.currentView === 'all');
    this.viewCompletedButton.classList.toggle('active', this.currentView === 'completed');
    this.viewIncompleteButton.classList.toggle('active', this.currentView === 'incomplete');

    this.deleteCompletedButton.style.display = completedCount > 0 ? 'block' : 'none';

    this.footer.style.display = totalCount > 0 ? 'block' : 'none';
  }
}

const app = new TodoApp();
