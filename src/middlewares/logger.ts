import { MiddlewareAPI, Dispatch } from 'redux'
import { Action as UserA } from '../actions/users'

const logger = (store: MiddlewareAPI) => (next: Dispatch) => (
  action: UserA
) => {
  console.group(action.type)
  console.log('The action is:', action)
  const result = next(action)
  console.log('The new state is:', store.getState())
  console.groupEnd()
  return result
}

export default logger
