import { createStore } from 'redux'
import reducers from '../reducers'
import middlewares from '../middlewares'
import { IUsers } from '../models/user'
import { IQuestions } from '../models/question'

export interface AppState {
  authedUser: string
  users: IUsers
  questions: IQuestions
}

const initialState: AppState = {
  authedUser: '',
  users: {},
  questions: {}
}

const store = createStore(reducers, initialState, middlewares)

export default store
