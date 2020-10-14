import { combineReducers } from 'redux'
import bookFilterReducer from './bookFilterReducer'

const rootReducer = combineReducers({
  bookFilters: bookFilterReducer,
})

export default rootReducer
