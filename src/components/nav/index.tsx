import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { IUser, IUsers } from '../../models/user'
import { Action, logout } from '../../actions/authedUser'
import { ThunkDispatch } from 'redux-thunk'
import AccountMenu from './AccountMenu'

interface NavProps {
  dispatch: ThunkDispatch<void, void, Action>
  authedUser: IUser | null
}

const Nav: React.FC<NavProps> = ({ authedUser, dispatch }) => {
  const handleLogout = (e: React.MouseEvent) => {
    dispatch(logout())
  }

  return (
    <nav className='fixed z-40 w-full text-sm font-medium leading-5 text-gray-700 bg-gray-50'>
      <div className='container flex items-center justify-between w-full mx-auto h-14 lg:px-10'>
        <div className='flex items-center h-full space-x-12'>
          <h1 className='hidden text-base font-black sm:block'>
            Would You Rather 🤔
          </h1>
          <NavLink
            to='/'
            exact
            className='hover:underline'
            activeClassName='text-blue-600'>
            Home
          </NavLink>
          <NavLink
            to='/new'
            className='hover:underline'
            activeClassName='text-blue-600'>
            New Question
          </NavLink>
          <NavLink
            to='/leaderboard'
            className='hover:underline'
            activeClassName='text-blue-600'>
            Leader Board
          </NavLink>
        </div>
        <div className='flex space-x-12'>
          {authedUser !== null ? (
            <AccountMenu logout={handleLogout} authedUser={authedUser} />
          ) : (
            <NavLink
              to='/login'
              activeClassName='text-blue-600'
              className='ml-auto'>
              Sign In
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  )
}

export default connect(
  ({ authedUser, users }: { authedUser: string; users: IUsers }) => ({
    authedUser: authedUser !== '' ? users[authedUser] : null
  })
)(Nav)
