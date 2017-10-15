import { combineReducers } from 'redux'
import todos from './todos'
import header from './header'
import notesState from './notes'
import view from './view'

const reducers = combineReducers({
  header,
  notesState,
  todos,
  view
})

export default reducers
