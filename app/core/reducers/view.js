import {
  SHOW_LIST_VIEW,
  SHOW_GRID_VIEW,
  OPEN_CONFIRMING_DIALOG,
  CLOSE_CONFIRMING_DIALOG 
} from 'core/actions'

const initialViewState = {
  listView: false,
  confirmingDialogOpen: false
}

const view = (state = initialViewState, action) => {
  switch(action.type) {
    case SHOW_LIST_VIEW:
      return {...state,
        listView: true
      }
    case SHOW_GRID_VIEW:
      return {...state,
        listView: false
      }
    case OPEN_CONFIRMING_DIALOG:
      return {...state,
        confirmingDialogOpen: true
      }
    case CLOSE_CONFIRMING_DIALOG:
      return {...state,
        confirmingDialogOpen: false
      }
    default:
      return state
  }
}

export default view
