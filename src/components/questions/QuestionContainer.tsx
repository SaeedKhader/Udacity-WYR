import React from 'react'
import { IUser } from '../../models/user'

interface QuestionContainerProps {
  user: IUser
  isLink?: boolean
  optionOne: JSX.Element
  optionTwo: JSX.Element
}

const QuestionContainer: React.FC<QuestionContainerProps> = ({
  user,
  isLink,
  children,
  optionOne,
  optionTwo
}) => {
  return (
    <div
      className={`flex items-stretch py-4 bg-white rounded-md cool-shadow ${
        isLink !== true && 'pr-8'
      }`}>
      <div className='flex flex-col items-center flex-none w-32 space-y-2'>
        <img
          src={user.askingAvatarURL}
          className='w-32 h-32'
          alt={`${user.name}s avatar`}
        />
      </div>
      <div className='w-full py-5 leading-5'>
        <p className='mb-6 font-medium'>{user.name} asks:</p>
        <p className='my-2 text-sm font-semibold'>Would you rather</p>
        <div className='flex items-center w-full space-x-2'>
          <span>①</span>
          {optionOne}
        </div>
        <div className='flex items-center w-full space-x-2'>
          <span>②</span>
          {optionTwo}
        </div>
        {children}
      </div>
      {isLink === true && (
        <div className='flex items-center mx-8'>
          <svg
            className='w-5 h-5 text-blue-600'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M9 5l7 7-7 7'
            />
          </svg>
        </div>
      )}
    </div>
  )
}

export default QuestionContainer
