// DOM Elements
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// EVENTS LISTENRS
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteTodo);
filterOption.addEventListener('click', filterTodo);
document.addEventListener('DOMContentLoaded', getTodo);

// FUNCTIONS
function addTodo(e) {
   // top default behavior
   e.preventDefault();

   // Create DIV Todo
   const todoDiv = document.createElement('div');
   todoDiv.classList.add('todo');
   // Create LI
   const newTodo = document.createElement('li');
   newTodo.innerText = todoInput.value;
   newTodo.classList.add('todo-item');

   // Save todo in localStorage
   saveLocalTodo(todoInput.value);
   
   // Create Mark Button
   const completedButton = document.createElement('button');
   completedButton.innerHTML = '<i class="fas fa-thumbs-up"></i>';
   completedButton.classList.add('complete-btn');
   // Create Delete Button
   const deleteButton = document.createElement('button');
   deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
   deleteButton.classList.add('delete-btn');

   // Append child elements
   todoDiv.appendChild(newTodo);
   todoDiv.appendChild(completedButton);
   todoDiv.appendChild(deleteButton);
   todoList.appendChild(todoDiv);

   // Show Alert
   // showAlert('Todo added', 'success');

   // Clear Input
   todoInput.value = '';
}

function deleteTodo(e) {
   const item = e.target;

   if(item.classList[0] === 'delete-btn') {
      const todo = item.parentElement;
      // Delete Animation
      todo.classList.add('fall');
      // Remove todo in the Storage
      removeTodo(todo);
      todo.addEventListener('transitionend', function () {
         todo.remove();
      });
   }

   if(item.classList[0] === 'complete-btn') {
      const todo = item.parentElement;
      todo.classList.toggle('completed');
   }

   // Show alert
   // showAlert('Todo deleted', 'warning');
}

// FILTER TODO
function filterTodo(e) {
   const todoChild = todoList.childNodes;
   todoChild.forEach(function (todo) {
      switch (e.target.value) {
         case "all":
            todo.style.display = "flex";
            break;
         case "completed":
            if (todo.classList.contains('completed')) {
               todo.style.display = "flex";
            } else {
               todo.style.display = "none";
            }
            break;
         case "uncompleted":
            if (!todo.classList.contains('completed')) {
               todo.style.display = "flex";
            } else {
               todo.style.display = "none";
            }
            default:
            break;
      }
   });
}

// Local Storage
function saveLocalTodo(todo) {
   // Check if element already exist
   // let todos;

   if(localStorage.getItem('todos') === null) {
      todos = [];
   } else {
      todos = JSON.parse(localStorage.getItem('todos'));
   }
   todos.push(todo);

   // Save all items to Storage
   localStorage.setItem('todos', JSON.stringify(todos));
}

// Save item on the page
function getTodo() {
   if(localStorage.getItem('todos') === null) {
      todos = [];
   } else {
      todos = JSON.parse(localStorage.getItem('todos'));
   }

   todos.forEach(todo => {
      // Create DIV Todo
      const todoDiv = document.createElement('div');
      todoDiv.classList.add('todo');
      // Create LI
      const newTodo = document.createElement('li');
      newTodo.innerText = todo;
      newTodo.classList.add('todo-item');
      // Check Mark Button
      const completedButton = document.createElement('button');
      completedButton.innerHTML = '<i class="fas fa-check"></i>';
      completedButton.classList.add('complete-btn');
      // Trash Mark Button
      const deleteButton = document.createElement('button');
      deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
      deleteButton.classList.add('delete-btn');

      // Append Child
      todoDiv.appendChild(newTodo);
      todoDiv.appendChild(completedButton);
      todoDiv.appendChild(deleteButton);
      todoList.appendChild(todoDiv);
   });
}

// Remove todo on the page and localStorage
function removeTodo(todo) {
   if(localStorage.getItem('todos') === null) {
      todos = [];
   } else {
      todos = JSON.parse(localStorage.getItem('todos'));
   }

   // The indexOf() method returns the first index for which a given element is found in an array.
   const todoIndex = todo.children[0].innerText;
   todos.splice(todos.indexOf(todoIndex), 1);

   localStorage.setItem('todos', JSON.stringify(todos));
}

// Show alert
function showAlert(message, className) {
   const div = document.createElement('div');
   div.className = `alert alert-${className}`;
   div.appendChild(document.createTextNode(message));
   const container = document.querySelector('.container');
   const box = document.querySelector('.box');
   container.insertBefore(div, box);

   setTimeout(() => document.querySelector('.alert').remove(), 1500);
}