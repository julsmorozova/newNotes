import { TOGGLE_SETTINGS } from 'core/actions'

const initialViewState = {
  settingsOpened: false
}

const header = (state=initialViewState, action) => {
  switch(action.type) {
    case TOGGLE_SETTINGS:
      return {...state, settingsOpened: !state.settingsOpened}
    default:
      return state
  }
}

export default header
