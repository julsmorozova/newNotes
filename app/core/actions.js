export const ADD_TODO = 'ADD_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const DELETE_TODO = 'DELETE_TODO'
export const TOGGLE_SETTINGS = 'TOGGLE_SETTINGS'
export const ADD_NOTE = 'ADD_NOTE'
export const OPEN_TODO_FORM = 'OPEN_TODO_FORM'
export const HIDE_TODO_FORM = 'HIDE_TODO_FORM'
export const TOGGLE_NOTE_TODO = 'TOGGLE_NOTE_TODO'
export const DELETE_NOTE_TODO = 'DELETE_NOTE_TODO'
export const DELETE_NOTE = 'DELETE_NOTE'
let nextTodoId = 0
let newId = 0

export const addTodo = (text) => {
  return {
    type: ADD_TODO,
    id: nextTodoId++,
    text,
    completed: false //initially set to false
  }
}
export const toggleTodo = (id, ...payload) => {
  return {
    type: TOGGLE_TODO,
    id,
    ...payload
  }
}
export const deleteTodo = (id) => {
  return {
    type: DELETE_TODO,
    id
  }
}

export const toggleSettings = (payload) => ({ type: TOGGLE_SETTINGS, ...payload })

export const addNote = (title, text, todos) => {
  return {
    type: ADD_NOTE,
    id: newId++,
    title,
    text,
    todos
  }
}

export const toggleNoteTodo = (id, ...payload) => {
  return {
    type: TOGGLE_NOTE_TODO,
    id,
    ...payload
  }
}

export const deleteNoteTodo = (id) => {
  return {
    type: DELETE_NOTE_TODO,
    id
  }
}

export const openTodoForm = (payload) => ({ type: OPEN_TODO_FORM, ...payload })
export const hideTodoForm = (payload) => ({ type: HIDE_TODO_FORM, ...payload })

export const deleteNote = (id) => {
  return {
    type: DELETE_NOTE,
    id
  }
}
