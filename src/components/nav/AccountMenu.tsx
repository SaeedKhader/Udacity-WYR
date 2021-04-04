import React from 'react'
import { Menu, Transition } from '@headlessui/react'
import { IUser } from '../../models/user'

interface AccountMenuProps {
  authedUser: IUser
  logout: (e: React.MouseEvent) => void
}

const AccountMenu: React.FC<AccountMenuProps> = ({ authedUser, logout }) => {
  return (
    <div className='relative inline-block mr-8 text-left sm:mr-0'>
      <Menu>
        {({ open }) => (
          <>
            <span>
              <Menu.Button className='inline-flex items-center justify-center w-full text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800'>
                <img
                  src={authedUser.avatarURL}
                  className='rounded-full h-9 w-9'
                  alt={`${authedUser.name}s avatar`}
                />
                <span className='hidden md:block'>{authedUser.name}</span>
                <svg
                  className='w-5 h-5 md:ml-2'
                  viewBox='0 0 20 20'
                  fill='currentColor'>
                  <path
                    fillRule='evenodd'
                    d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  />
                </svg>
              </Menu.Button>
            </span>

            <Transition
              show={open}
              enter='transition ease-out duration-100'
              enterFrom='transform opacity-0 scale-95'
              enterTo='transform opacity-100 scale-100'
              leave='transition ease-in duration-75'
              leaveFrom='transform opacity-100 scale-100'
              leaveTo='transform opacity-0 scale-95'>
              <Menu.Items className='absolute right-0 min-w-full py-1 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none w-28 '>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={logout}
                      className={`${
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}>
                      Sign out
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  )
}

export default AccountMenu
