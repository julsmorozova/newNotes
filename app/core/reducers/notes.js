import {
  ADD_NOTE,
  DELETE_NOTE,
  TOGGLE_NOTE_TODO,
  DELETE_NOTE_TODO,
  EDIT_NOTE_TEXT,
  ADD_NOTE_TODO
} from 'core/actions'

const initialViewState = {
  notes: []
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

function findNoteIndex(notes, searchID) {
	for(let notesLn = notes.length, n = 0; n < notesLn; n++ ) {
		for(let todoLn = notes[n].noteTodos.length, t = 0; t < todoLn; t++ ) {
			if (notes[n].noteTodos[t].id === searchID) {
				return n
			}
		}
	}
	return null
}

const notesState = (state = initialViewState, action) => {
  switch(action.type) {
    case ADD_NOTE:
      return {
        ...state,
        notes: [
          ...state.notes,
          {
            id: action.id,
            title: action.title ? action.title : 'Note ' + (action.id + 1),
            text: action.text,
            noteTodos: (action.todos.length !==0) ? action.todos.slice().map(function(todo) {
              todo.noteId = action.id
              return todo
            }) : []
          }
        ]
      }
    case ADD_NOTE_TODO:
      return {
        ...state,
        notes: state.notes.map(note => note.id === action.noteId ?
          {...note, noteTodos: [...note.noteTodos,
            {
              id: action.id,
              noteId: action.noteId,
              text: action.text,
              completed: false
            }
          ]} : note
        )
      }
    case EDIT_NOTE_TEXT:
      return {
        ...state,
        notes: state.notes.map(note => note.id === action.id ?
          {...note, text: action.text} : note
        )
      }
    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter(note => note.id !== action.id)
      }
    case TOGGLE_NOTE_TODO:
      return {
        ...state,
        notes: state.notes.map(function(note) {
            for(let todoLn = note.noteTodos.length, t = 0; t < todoLn; t++ ) {
        			if (note.noteTodos[t].id === action.id) {
                return {...note, noteTodos: note.noteTodos.map(todo => todo.id === action.id ?
                  {...todo, completed: !todo.completed} : todo
                )}
              }
            }
            return note
        })
      }
    case DELETE_NOTE_TODO:
      console.log(state)
      return {
        ...state,
        notes: state.notes.map(function(note) {
            for(let todoLn = note.noteTodos.length, t = 0; t < todoLn; t++ ) {
        			if (note.noteTodos[t].id === action.id) {
                return {...note, noteTodos: note.noteTodos.filter(todo => todo.id !== action.id)}
              }
            }
            return note
        })
      }
    default:
      return state
  }
}

export default notesState
