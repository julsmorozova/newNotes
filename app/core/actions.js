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
export const CHANGE_NOTE_COLOR = 'CHANGE_NOTE_COLOR'
export const OPEN_CONFIRMING_DIALOG = 'OPEN_CONFIRMING_DIALOG'
export const CLOSE_CONFIRMING_DIALOG = 'CLOSE_CONFIRMING_DIALOG'
export const COPY_NOTE = 'COPY_NOTE'
export const ADD_DEFAULT_TODOS = 'ADD_DEFAULT_TODOS'
export const DELETE_TODO_LIST = 'DELETE_TODO_LIST'
export const EDIT_NOTE_TITLE = 'EDIT_NOTE_TITLE'
export const DELETE_FOREVER = 'DELETE_FOREVER'

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
    todos,
    color: '#eee' //initially set to white
  }
}

export const editNoteText = (id, text) => {
  return {
    type: EDIT_NOTE_TEXT,
    id,
    text
  }
}

export const editNoteTitle = (id, title) => {
  return {
    type: EDIT_NOTE_TITLE,
    id,
    title
  }
}

export const toggleNoteTodo = (noteId, id, ...payload) => {
  return {
    type: TOGGLE_NOTE_TODO,
    noteId,
    id,
    ...payload
  }
}

export const deleteNoteTodo = (noteId, id) => {
  return {
    type: DELETE_NOTE_TODO,
    noteId,
    id
  }
}

export const deleteTodoList = (noteId) => {
  return {
    type: DELETE_TODO_LIST,
    noteId
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

export const deleteForever = (id) => {
  return {
    type: DELETE_FOREVER,
    id
  }
}

export const changeNoteColor = (id, color) => {
  return {
    type: CHANGE_NOTE_COLOR,
    id,
    color
  }
}

export const openConfirmingDialog = (payload) => ({ type: OPEN_CONFIRMING_DIALOG, ...payload })
export const closeConfirmingDialog = (payload) => ({ type: CLOSE_CONFIRMING_DIALOG, ...payload })

export const copyNote = (copiedNoteId) => {
  return {
    type: COPY_NOTE,
    id: newId++,
    copiedNoteId
  }
}

export const addDefaultTodos = (noteId, todos) => {
  return {
    type: ADD_DEFAULT_TODOS,
    noteId,
    todos,
    firstTodoId: nextTodoId++
  }
}
