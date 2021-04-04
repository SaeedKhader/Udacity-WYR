import React from 'react'
import { IUser } from '../../models/user'

interface UserCardProps {
  user: IUser
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className='flex items-center w-full h-32 my-2 bg-white rounded-md justify-left md:justify-center md:space-y-4 md:p-8 md:mx-4 md:flex-col md:w-48 cool-shadow hover:border hover:border-blue-500 md:h-60'>
      <img className='w-32' src={user.avatarURL} alt={`${user.name}s avatar`} />
      <p className='mr-16 text-xl font-bold md:m-0 md:text-base '>
        {user.name}
      </p>
    </div>
  )
}

export default UserCard
