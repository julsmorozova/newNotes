import {
  ADD_NOTE,
  ADD_TODO,
  TOGGLE_TODO,
  DELETE_TODO,
  REMOVE_TODOS
} from 'core/actions'

const initialViewState = {
  notes: [],
  note: {
    id: 0,
    title: 'No title',
    text: '',
    todos: []
  }
}

const toggleThisTodo = (todos, id) => {
  return todos.map((todo) => {
    if (todo.id === action.id) {
      todo.completed = !todo.completed
    }
    return todo
  })
}

const note = (state=initialViewState.note, action) => {
  switch(action.type) {
    case ADD_NOTE:
      return {
        id: action.id,
        title: action.title,
        text: action.text,
        todos: (action.todos.length !== 0) ? action.todos.slice() : []
      }
    case TOGGLE_TODO:
      return {
        ...state,
        todos: toggleThisTodo(state.todos, action.id)
      }
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.id)
      }
    default:
      return state
  }
}


const notes = (state=initialViewState.notes, action) => {
  switch(action.type) {
    case ADD_NOTE:
      return [
        ...state,
        note(state, action)
      ]
    default:
      return state
  }
}

export default notes
