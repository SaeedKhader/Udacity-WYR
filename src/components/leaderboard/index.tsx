import React from 'react'
import { connect } from 'react-redux'
import { IUsers } from '../../models/user'

interface LeaderBoardProps {
  users: IUsers
}

const LeaderBoard: React.FC<LeaderBoardProps> = ({ users }) => {
  const sortUsersIds = Object.keys(users).sort((a, b) => {
    const bScore =
      users[b].questions.length + Object.keys(users[b].answers).length
    const aScore =
      users[a].questions.length + Object.keys(users[a].answers).length
    return bScore - aScore
  })

  return (
    <div className='w-full max-w-3xl px-4 pt-2 space-y-10 mt-28'>
      <h1 className='text-2xl font-bold'>Leader board</h1>
      {sortUsersIds.map((uId, index) => {
        const user = users[uId]
        const answeredQuestions = Object.keys(user.answers).length
        const createdQuestions = user.questions.length
        return (
          <div
            key={user.id}
            className='flex items-center py-4 pr-8 bg-white rounded-md cool-shadow'>
            <div className='flex flex-col items-center flex-none w-32 space-y-2'>
              <img
                src={user.avatarURL}
                className='w-32 h-32'
                alt={`${user.name}s avatar`}
              />
            </div>
            <div className='py-5'>
              <span className='font-black'>{index + 1}.</span>
              <h1 className='text-xl font-medium text-gray-700'>{user.name}</h1>
              <p className='mt-2 text-sm text-gray-400'>
                Answered questions:{' '}
                <span className='font-bold text-blue-600'>
                  {answeredQuestions}
                </span>
              </p>
              <p className='text-sm text-gray-400'>
                Created questions:{' '}
                <span className='font-bold text-blue-600'>
                  {createdQuestions}
                </span>
              </p>
            </div>
            <div className='ml-auto'>
              <p className='mb-2 text-sm font-extrabold text-center text-gray-600'>
                Score
              </p>
              <div className='flex items-center justify-center w-20 h-20 rounded-full blue-shadow bg-gradient-to-r from-blue-600 to-blue-500'>
                <span className='text-2xl font-extrabold text-white'>
                  {answeredQuestions + createdQuestions}
                </span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default connect(({ users }: { users: IUsers }) => ({
  users
}))(LeaderBoard)
