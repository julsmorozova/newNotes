import { OPEN_TODO_FORM, HIDE_TODO_FORM } from 'core/actions'

const initialViewState = {
  todoFormOpen: false
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
    default:
      return state
  }
}

export default view
