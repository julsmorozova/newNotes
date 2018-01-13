import {
  ADD_NOTE,
  DELETE_NOTE,
  TOGGLE_NOTE_TODO,
  DELETE_NOTE_TODO,
  EDIT_NOTE_TEXT,
  ADD_NOTE_TODO,
  CHANGE_NOTE_COLOR,
  COPY_NOTE,
  ADD_DEFAULT_TODOS,
  DELETE_TODO_LIST
} from 'core/actions'

const initialViewState = {
  notes: []
}

const findNote = (notes, copiedNoteId) => {
  for(let notesLn = notes.length, n = 0; n < notesLn; n++) {
    if (notes[n].id === copiedNoteId) {
      return notes[n]
    }
  }
  return null
}

function makeTodoCopy(todo, newId) {
  let todoCopy = {
    id: todo.id,
    text: todo.text,
    completed: todo.completed,
    noteId: newId
  }
  return todoCopy
}

const makeCopy = (note, newId) => {
  let noteCopy = {
    id: newId,
    title: note.title + ' copy' || 'Note ' + (newId + 1) + ' copy',
    text: note.text,
    noteTodos: note.noteTodos.map(function(noteTodo) {
      return makeTodoCopy(noteTodo, newId)
    }),
    color: note.color
  }
  return noteCopy
}

const makeThisNoteList = (noteId, todos, firstTodoId) => {
  return todos.map((todo, index) => {
    return {
      id: firstTodoId + index,
      text: todo,
      completed: false, //initially set to false
      noteId: noteId
    }
  })
}


// function findNoteIndex(notes, searchID) {
// 	for(let notesLn = notes.length, n = 0; n < notesLn; n++ ) {
// 		for(let todoLn = notes[n].noteTodos.length, t = 0; t < todoLn; t++ ) {
// 			if (notes[n].noteTodos[t].id === searchID) {
// 				return n
// 			}
// 		}
// 	}
// 	return null
// }

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
            noteTodos: (action.todos.length !==0) ? action.todos.slice().map(function(todo, index) {
              todo.noteId = action.id
              todo.id = index
              return todo
            }) : [],
            color: action.color
          }
        ]
      }
    case ADD_NOTE_TODO:
      return {
        ...state,
        notes: state.notes.map(note => note.id === action.noteId ?
          {...note, noteTodos: [...note.noteTodos,
            {
              id: note.noteTodos.length,
              noteId: action.noteId,
              text: action.text,
              completed: false
            }
          ]} : note
        )
      }
    case ADD_DEFAULT_TODOS:
      return {
        ...state,
        notes: state.notes.map(note => note.id === action.noteId ?
          {...note, noteTodos: (note.noteTodos.length === 0) ?
            note.noteTodos.concat(makeThisNoteList(action.noteId, action.todos, action.firstTodoId)) :
              makeThisNoteList(action.noteId, action.todos, action.firstTodoId)
          } :
            note
        )
      }
    case EDIT_NOTE_TEXT:
      return {
        ...state,
        notes: state.notes.map(note => note.id === action.id ?
          {...note, text: action.text} : note
        )
      }
    case CHANGE_NOTE_COLOR:
      return {
        ...state,
        notes: state.notes.map(note => note.id === action.id ?
          {...note, color: action.color} : note
        )
      }
    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter(note => note.id !== action.id)
      }
    case COPY_NOTE:
      return {
        ...state,
        notes: [...state.notes,
          makeCopy(findNote(state.notes, action.copiedNoteId), action.id)
        ]
      }
    case TOGGLE_NOTE_TODO:
      return {
        ...state,
        notes: state.notes.map(function(note) {
          if (note.id === action.noteId) {
            return {...note, noteTodos: note.noteTodos.map(todo => todo.id === action.id ?
              {...todo, completed: !todo.completed} : todo
            )}
          }
          return note
        })
      }
    case DELETE_NOTE_TODO:
      console.log(state)
      return {
        ...state,
        notes: state.notes.map(function(note) {
          if (note.id === action.noteId) {
              return {...note, noteTodos: note.noteTodos.filter(todo => todo.id !== action.id)}
          }
          return note
        })
      }
    case DELETE_TODO_LIST:
      return {
        ...state,
        notes: state.notes.map(function(note) {
          if (note.id === action.noteId) {
            return {...note, noteTodos: note.noteTodos.length = 0}
          }
          return note
        })
      }
    default:
      return state
  }
}

export default notesState
