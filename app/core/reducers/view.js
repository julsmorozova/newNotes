import { OPEN_TODO_FORM, HIDE_TODO_FORM, ENABLE_EDIT, COMPLETE_EDIT } from 'core/actions'

const initialViewState = {
  todoFormOpen: false,
  editable: false,
  textChanged: false
}

const view = (state=initialViewState, action) => {
  switch(action.type) {
    case OPEN_TODO_FORM:
      return {...state,
        todoFormOpen: true
      }
    case HIDE_TODO_FORM:
      return {...state,
        todoFormOpen: false
      }
    case ENABLE_EDIT:
      return {
        ...state,
        editable: true
      }
    case COMPLETE_EDIT:
      return {
        ...state,
        editable: false,
        textChanged: true
      }
    default:
      return state
  }
}

export default view
