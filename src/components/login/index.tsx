import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { ThunkDispatch } from 'redux-thunk'
import { Action as AuthAction, login } from '../../actions/authedUser'
import { Action as UAction, handleGetUsers } from '../../actions/users'
import { IUsers } from '../../models/user'
import UserCard from './UserCard'

interface LoginProps {
  dispatch: ThunkDispatch<void, void, AuthAction | UAction>
  users: IUsers
  authedUser: string
}

const Login: React.FC<LoginProps> = ({ dispatch, users, authedUser }) => {
  useEffect(() => {
    Object.keys(users).length === 0 && dispatch(handleGetUsers())
  })

  if (authedUser !== '') {
    return <Redirect to='/' />
  }

  const handleOnClick = (e: React.MouseEvent, id: string) => {
    dispatch(login(id))
  }

  return (
    <div className='flex flex-col items-center w-full mt-16 space-y-6 md:space-y-8 md:mt-32'>
      <h1 className='mb-10 text-3xl font-black '>Would You Rather 🤔</h1>
      <h2 className='text-2xl font-bold text-blue-600'>Sign In</h2>
      <p className='text-gray-400'>Choose an account to sign in</p>
      <div className='flex flex-col md:flex-row'>
        {Object.keys(users).map((id) => (
          <div
            key={users[id].id}
            onClick={(e) => handleOnClick(e, users[id].id)}
            className='cursor-pointer'>
            <UserCard user={users[id]} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default connect(
  ({ users, authedUser }: { users: IUsers; authedUser: string }) => ({
    users,
    authedUser
  })
)(Login)
