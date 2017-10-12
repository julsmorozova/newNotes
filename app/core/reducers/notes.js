import {
  ADD_NOTE,
  DELETE_NOTE,
  TOGGLE_NOTE_TODO,
  DELETE_NOTE_TODO
} from 'core/actions'

const initialViewState = {
  notes: [],
  note: {
    id: 0,
    title: 'No title',
    text: '',
    noteTodos: []
  }
}

// const toggleThisTodo = (noteTodos, id) => {
//   console.log(noteTodos)
//   return noteTodos.map((noteTodo) => {
//     if (noteTodo.id === id) {
//       noteTodo.completed = !noteTodo.completed
//     }
//     return noteTodo
//   })
// }

const noteTodo = (state = initialViewState.noteTodo, action) => {
  switch(action.type) {
    case TOGGLE_NOTE_TODO:
      console.log(state)
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

const note = (state = initialViewState.note, action) => {
  switch(action.type) {
    case ADD_NOTE:
      return {
        id: action.id,
        title: action.title ? action.title : 'Note ' + (action.id + 1),
        text: action.text,
        noteTodos: (action.todos.length !==0) ? action.todos.slice() : []
      }
    // case TOGGLE_NOTE_TODO:
    //   return {
    //     ...state,
    //     noteTodos: state.noteTodos.map(t => todo(t, action))
    //   }
    case DELETE_NOTE_TODO:
      console.log(state.noteTodos)
      return {
        ...state,
        noteTodos: state.noteTodos.filter(noteTodo => noteTodo.id !== action.id)
      }
    default:
      return state
  }
}


const notes = (state = initialViewState.notes, action) => {
  switch(action.type) {
    case ADD_NOTE:
      return [
        ...state,
        note(state, action)
      ]
    // case DELETE_NOTE_TODO:
    //   return [
    //     ...state
    //   ]
    // case TOGGLE_NOTE_TODO:
    //   return [
    //     ...state,
    //     note(state.noteTodos, action)
    //   ]
    case DELETE_NOTE:
      return state.filter(note => note.id !== action.id)
    default:
      return state
  }
}

export { note as note }
export default notes
