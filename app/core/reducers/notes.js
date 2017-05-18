import {
  ADD_NOTE,
  ADD_TODO,
  TOGGLE_TODO,
  DELETE_TODO
} from 'core/actions'

const initialViewState = {
  notes: [],
  todo: {
    id: 0,
    text: '',
    completed: false
  },
  note: {
    id: 0,
    title: 'No title',
    text: '',
    todos: [
    ]
  }
}

const todo = (state=initialViewState.todo, action) => {
  switch (action.type) {
    case ADD_TODO:
      console.log(state.note.todos)
      return {
        id: state.note.id + action.id,
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

const note = (state=initialViewState.note, action) => {
  switch(action.type) {
    case ADD_NOTE:
      return {
        id: action.id,
        title: action.title,
        text: action.text,
        todos: action.todos
      }
      case ADD_TODO:
        return {
          ...state,
          todos: [
            ...state.note.todos,
            todo(state, action)
          ]
        }
      // case TOGGLE_TODO:
      //   return {
      //     ...state,
      //     // todo:
      //     //   (state.id !== action.id) ? state :
      //     //     {
      //     //       ...state,
      //     //       completed: !state.completed
      //     //     },
      //     todos: state.todos
      //       .filter(todo => todo.id === action.id)
      //       .map(todo.completed == !state.note.todocompleted)
      //   }
      // case DELETE_TODO:
      //   return {
      //     ...state,
      //     todos: state.todos.filter(todo => todo.id !== action.id)
      //   }
      case TOGGLE_TODO:
        return {
          ...state,
          todos: state.note.todos.map(t => todo(t, action))
        }
      case DELETE_TODO:
        return {
          ...state,
          todos: state.notetodos.filter(todo => todo.id !== action.id)
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
