import { combineReducers } from 'redux'
import todos from './todos'
import header from './header'
import { note } from './notes'
import notes from './notes'
import view from './view'

const reducers = combineReducers({
  header,
  note,
  notes,
  todos,
  view
})

export default reducers
