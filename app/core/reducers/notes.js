import {
  ADD_NOTE
} from 'core/actions'

const initialViewState = {
  notes: [],
  note: {
    id: 0,
    title: 'No title',
    text: ''
  }
}

const note = (state=initialViewState.note, action) => {
  switch(action.type) {
    case ADD_NOTE:
      return {
        id: action.id,
        title: action.title,
        text: action.text
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
