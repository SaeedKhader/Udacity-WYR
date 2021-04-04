import { Reducer } from 'redux'
import { Type, Action } from '../actions/authedUser'

export const authedUser: Reducer<string, Action> = (
  state: string = '',
  action: Action
) => {
  switch (action.type) {
    case Type.LOGIN:
      return action.userId
    case Type.LOGOUT:
      return ''
    default:
      return state
  }
}
