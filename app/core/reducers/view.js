import { SHOW_LIST_VIEW, SHOW_GRID_VIEW } from 'core/actions'

const initialViewState = {
  listView: false
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
    default:
      return state
  }
}

export default view
