import { _getUsers } from '../utils/_DATA'
import { Dispatch } from 'react'
import { IUsers } from '../models/user'
import { showLoading, hideLoading } from 'react-redux-loading'

export enum Types {
  GET_USERS = 'GET_USERS'
}

export interface Action {
  type: Types.GET_USERS
  users: IUsers
}

const getUsers = (users: IUsers): Action => ({
  type: Types.GET_USERS,
  users
})

export const handleGetUsers = () => (dispatch: Dispatch<Action | any>) => {
  dispatch(showLoading())
  return _getUsers().then((users) => {
    dispatch(getUsers(users))
    dispatch(hideLoading())
  })
}
