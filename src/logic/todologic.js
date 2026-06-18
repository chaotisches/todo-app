const todos = []

export function addTodo(text) {
  if (!text || !text.trim()) return null

  const todo = {
    id: Date.now(),
    text: text.trim(),
    done: false
  }
  todos.push(todo)
  return todo
}

export function toggleTodo(id) {
  const todo = todos.find(t => t.id === id)
  if (todo) todo.done = !todo.done
  return todo
}

export function editTodo(id, newText) {
  if (!newText || !newText.trim()) return null
  const todo = todos.find(t => t.id === id)
  if (todo) todo.text = newText.trim()
  return todo
}

export function deleteTodo(id) {
  const index = todos.findIndex(t => t.id === id)
  if (index !== -1) return todos.splice(index, 1)[0]
  return null
}

export function getTodos() {
  return todos
}
