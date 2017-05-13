export const ADD_TODO = 'ADD_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const DELETE_TODO = 'DELETE_TODO'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'
export const TOGGLE_SETTINGS = 'TOGGLE_SETTINGS'
export const ADD_NOTE = 'ADD_NOTE'
export const OPEN_TODO_FORM = 'OPEN_TODO_FORM'
export const HIDE_NOTE_FORM = 'HIDE_NOTE_FORM'
// export const DELETE_NOTE = 'DELETE_NOTE'
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
export const toggleTodo = (id) => {
  return {
    type: TOGGLE_TODO,
    id
  }
}
export const deleteTodo = (id) => {
  return {
    type: DELETE_TODO,
    id
  }
}
export const setVisibilityFilter = (filter) => {
  return {
    type: SET_VISIBILITY_FILTER,
    filter
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

export const openTodoForm = (payload) => ({ type: OPEN_TODO_FORM, ...payload })
export const hideNoteForm = (payload) => ({ type: HIDE_NOTE_FORM, ...payload })

// export const deleteNote = (payload = {}) => ({
//   type: DELETE_NOTE,
//   ...payload
// })
