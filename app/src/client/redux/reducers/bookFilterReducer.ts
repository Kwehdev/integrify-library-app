import {
  BookFilterAction,
  SET_FILTER_QUERY,
} from '../actions/BookFilterActions'

export type BookFilters = {
  limit: number
  title: string
  author: string
  status: string
  genre: string
  ISBN: string
}

const initialState = {
  limit: 0,
  title: '',
  author: '',
  status: '',
  genre: '',
  ISBN: '',
}

export default function bookFilterReducer(
  state: BookFilters = initialState,
  action: BookFilterAction
) {
  switch (action.type) {
    case SET_FILTER_QUERY:
      return action.payload
    default:
      return state
  }
}
