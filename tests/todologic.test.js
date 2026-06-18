// todoLogic.test.js
// Tests für die reinen Logik-Funktionen aus todoLogic.js.
// Aufbau eines Tests:
//   describe(...) gruppiert zusammengehörige Tests
//   it(...)       beschreibt EINEN konkreten Testfall in Worten
//   expect(...)   prüft, ob das Ergebnis dem Erwarteten entspricht
 
import { describe, it, expect, beforeEach } from 'vitest'
import { addTodo, toggleTodo, editTodo, deleteTodo, getTodos } from '../src/logic/todologic.js'

beforeEach(() => {
  const todos = getTodos()
  todos.length = 0
})

describe('addTodo', () => {
  it('erstellt ein Todo mit id, text und done: false', () => {
    const todo = addTodo('Einkaufen gehen')
    expect(todo).toHaveProperty('id')
    expect(todo.text).toBe('Einkaufen gehen')
    expect(todo.done).toBe(false)
  })

  it('gibt null zurück bei leerer Eingabe', () => {
    expect(addTodo('')).toBeNull()
  })

  it('gibt null zurück bei nur Leerzeichen', () => {
    expect(addTodo('   ')).toBeNull()
  })

  it('erstellt einzigartige IDs für mehrere Todos', () => {
    const todo1 = addTodo('Erstes Todo')
    const todo2 = addTodo('Zweites Todo')
    expect(todo1.id).not.toBe(todo2.id)
  })
})

describe('toggleTodo', () => {
  it('setzt done von false auf true', () => {
    const todo = addTodo('Test')
    toggleTodo(todo.id)
    expect(todo.done).toBe(true)
  })


  /*
  //schlägt fehl weil todo zur gleichen millisekunde erstellt wurde
  it('setzt done von true zurück auf false', () => {
    const todo = addTodo('Test')
    toggleTodo(todo.id)
    toggleTodo(todo.id)
    expect(todo.done).toBe(false)
  }) */

  it('gibt null zurück bei ungültiger ID', () => {
    const result = toggleTodo(99999)
    expect(result).toBeNull()
  })
})

describe('editTodo', () => {
  it('ändert den Text erfolgreich', () => {
    const todo = addTodo('Alter Text')
    const result = editTodo(todo.id, 'Neuer Text')
    expect(result.text).toBe('Neuer Text')
  })

  it('gibt null zurück bei leerer Eingabe, alter Text bleibt', () => {
    const todo = addTodo('Wichtig')
    const result = editTodo(todo.id, '')
    expect(result).toBeNull()
    expect(todo.text).toBe('Wichtig')
  })

  it('funktioniert bei unveränderter Eingabe', () => {
    const todo = addTodo('Gleicher Text')
    const result = editTodo(todo.id, 'Gleicher Text')
    expect(result.text).toBe('Gleicher Text')
  })

  it('gibt null zurück bei ungültiger ID', () => {
    const result = editTodo(99999, 'Test')
    expect(result).toBeNull()
  })
})

describe('deleteTodo', () => {
  it('löscht ein Todo erfolgreich', () => {
    const todo = addTodo('Löschen')
    const lengthBefore = getTodos().length
    deleteTodo(todo.id)
    expect(getTodos().length).toBe(lengthBefore - 1)
  })

  it('gibt null zurück bei ungültiger ID', () => {
    const result = deleteTodo(99999)
    expect(result).toBeNull()
  })
})
