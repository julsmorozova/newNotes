import {
  ADD_TODO,
  TOGGLE_TODO,
  DELETE_TODO,
  ADD_NOTE
} from 'core/actions'

const initialViewState = {
  todos: [],
  todo: {
    id: 0,
    text: '',
    completed: false
  }
}

const todo = (state=initialViewState.todo, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
    case TOGGLE_TODO:
      if (state.id !== action.id) {
        return state
      }
      return {
        ...state,
        completed: !state.completed
      }
    default:
      return state
  }
}

const todos = (state=initialViewState.todos, action) => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        todo(state, action)
      ]
    case ADD_NOTE:
      return []
    case TOGGLE_TODO:
      return state.map(t => todo(t, action))
    case DELETE_TODO:
      return state.filter(todo => todo.id !== action.id)
    default:
      return state
  }
}

export default todos
