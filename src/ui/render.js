import { addTodo, getTodos, toggleTodo, editTodo, deleteTodo } from '../logic/todologic.js'

const todoList = document.querySelector('.todo-list')
const doneList = document.querySelector('.done-list')
const doneHeader = document.querySelector('.done-header')
const fabAdd = document.querySelector('.fab-add')

function createTodoElement(todo) {
  const li = document.createElement('li')
  li.className = todo.done ? 'todo-item done' : 'todo-item'

  const circle = document.createElement('span')
  circle.className = 'todo-circle'
  circle.addEventListener('click', () => {
    toggleTodo(todo.id)
    renderTodos()
  })

  const text = document.createElement('span')
  text.className = 'todo-text'
  text.textContent = todo.text

  if (!todo.done) text.addEventListener('click', () => {
    const input = document.createElement('input')
    input.type = 'text'
    input.className = 'todo-input'
    input.value = todo.text

    let handled = false

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        handled = true
        const result = editTodo(todo.id, input.value)
        if (result) {
          renderTodos()
        } else {
          text.textContent = todo.text
          li.replaceChild(text, input)
        }
      }
      if (e.key === 'Escape') {
        handled = true
        li.replaceChild(text, input)
      }
    })

    input.addEventListener('blur', () => {
      if (handled) return
      const result = editTodo(todo.id, input.value)
      if (result) {
        renderTodos()
      } else {
        li.replaceChild(text, input)
      }
    })

    li.replaceChild(input, text)
    input.focus()
  })

  const deleteBtn = document.createElement('span')
  deleteBtn.className = 'todo-delete'
  deleteBtn.textContent = '×'
  deleteBtn.addEventListener('click', () => {
    deleteTodo(todo.id)
    renderTodos()
  })

  li.appendChild(circle)
  li.appendChild(text)
  li.appendChild(deleteBtn)
  return li
}

function renderTodos() {
  todoList.innerHTML = ''
  doneList.innerHTML = ''

  const todos = getTodos()
  const open = todos.filter(t => !t.done)
  const done = todos.filter(t => t.done)

  open.forEach(todo => todoList.appendChild(createTodoElement(todo)))
  done.forEach(todo => doneList.appendChild(createTodoElement(todo)))

  doneHeader.style.display = done.length ? 'block' : 'none'
}

fabAdd.addEventListener('click', () => {
  const li = document.createElement('li')
  li.className = 'todo-item'

  const input = document.createElement('input')
  input.type = 'text'
  input.className = 'todo-input'
  input.placeholder = 'Neues To-Do...'

  let handled = false

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      handled = true
      const result = addTodo(input.value)
      if (result) {
        renderTodos()
      } else {
        li.remove()
      }
    }
    if (e.key === 'Escape') {
      handled = true
      li.remove()
    }
  })

  input.addEventListener('blur', () => {
    if (handled) return
    const result = addTodo(input.value)
    if (result) {
      renderTodos()
    } else {
      li.remove()
    }
  })

  li.appendChild(input)
  todoList.appendChild(li)
  input.focus()
})

renderTodos()
