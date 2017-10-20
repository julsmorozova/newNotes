export const ADD_TODO = 'ADD_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const DELETE_TODO = 'DELETE_TODO'
export const TOGGLE_SETTINGS = 'TOGGLE_SETTINGS'
export const ADD_NOTE = 'ADD_NOTE'
export const SHOW_GRID_VIEW = 'SHOW_GRID_VIEW'
export const SHOW_LIST_VIEW = 'SHOW_LIST_VIEW'
export const TOGGLE_NOTE_TODO = 'TOGGLE_NOTE_TODO'
export const DELETE_NOTE_TODO = 'DELETE_NOTE_TODO'
export const DELETE_NOTE = 'DELETE_NOTE'
export const EDIT_NOTE_TEXT = 'EDIT_NOTE_TEXT'
export const ADD_NOTE_TODO = 'ADD_NOTE_TODO'

let nextTodoId = 0
let newId = 0

export const addTodo = (text) => {
  return {
    type: ADD_TODO,
    noteId: undefined,
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
export const addNoteTodo = (noteId, text) => {
  return {
    type: ADD_NOTE_TODO,
    id: nextTodoId++,
    noteId,
    text
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

export const editNoteText = (id, text) => {
  return {
    type: EDIT_NOTE_TEXT,
    id,
    text
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

export const showListView = (payload) => ({ type: SHOW_LIST_VIEW, ...payload })
export const showGridView = (payload) => ({ type: SHOW_GRID_VIEW, ...payload })

export const deleteNote = (id) => {
  return {
    type: DELETE_NOTE,
    id
  }
}
