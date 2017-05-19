import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import header from './header'
import notes from './notes'
import view from './view'

const reducers = combineReducers({
  visibilityFilter,
  header,
  todos,
  notes,
  view
})

export default reducers
