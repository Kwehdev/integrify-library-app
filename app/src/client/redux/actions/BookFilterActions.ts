import { BookFilters } from '../reducers/bookFilterReducer'

export const SET_FILTER_QUERY = 'SET_FILTER_QUERY'

export type BookFilterAction = {
  type: typeof SET_FILTER_QUERY
  payload: Partial<BookFilters>
}

export const setBookFilterQuery = (query: Partial<BookFilters>) => {
  return {
    type: SET_FILTER_QUERY,
    payload: query,
  }
}
