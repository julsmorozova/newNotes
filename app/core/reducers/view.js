import { OPEN_TODO_FORM, HIDE_NOTE_FORM } from 'core/actions'

const initialViewState = {
  todoFormOpen: false,
  noteFormOpen: true
}

const view = (state=initialViewState, action) => {
  switch(action.type) {
    case OPEN_TODO_FORM:
      return {...state,
        todoFormOpen: !state.todoFormOpen,
        noteFormOpen: state.todoFormOpen && state.noteFormOpen
      }
    case HIDE_NOTE_FORM:
      return {
        ...state,
        noteFormOpen: !state.noteFormOpen,
        todoFormOpen: state.noteFormOpen && state.todoFormOpen
      }
    default:
      return state
  }
}

export default view
