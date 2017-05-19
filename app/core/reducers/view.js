import { OPEN_TODO_FORM, HIDE_TODO_FORM } from 'core/actions'

const initialViewState = {
  todoFormOpen: false
  // noteFormOpen: true
}

const view = (state=initialViewState, action) => {
  switch(action.type) {
    case OPEN_TODO_FORM:
      return {...state,
        todoFormOpen: true
        // noteFormOpen: state.todoFormOpen && state.noteFormOpen
      }
      case HIDE_TODO_FORM:
        return {...state,
          todoFormOpen: false
          // noteFormOpen: state.todoFormOpen && state.noteFormOpen
        }
    // case HIDE_NOTE_FORM:
    //   return {
    //     ...state,
    //     noteFormOpen: !state.noteFormOpen,
    //     todoFormOpen: state.noteFormOpen && state.todoFormOpen
    //   }
    default:
      return state
  }
}

export default view
