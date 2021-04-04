import React from 'react'

type OptionProps =
  | {
      optionText: string
      questionAnswered: false
      isTheAnswer?: boolean
      answer: () => void
    }
  | {
      optionText: string
      questionAnswered: true
      isTheAnswer: boolean
      answer?: () => void
    }

const Option: React.FC<OptionProps> = ({
  optionText,
  isTheAnswer,
  questionAnswered,
  answer,
  children
}) => {
  if (questionAnswered === true) {
    return (
      <div
        className={`flex relative overflow-hidden justify-between w-full px-3 py-2 my-1 text-left rounded-md ${
          isTheAnswer
            ? 'from-blue-600 bg-gradient-to-r to-blue-500 text-white'
            : 'bg-gray-50 text-gray-600'
        }`}>
        <span className='z-30'>{optionText}.</span>
        {isTheAnswer && (
          <svg
            className='z-30 w-5 h-5'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        )}
        {children}
      </div>
    )
  } else {
    return (
      <button
        onClick={answer}
        className='flex justify-between w-full px-3 py-2 my-1 text-left text-blue-600 rounded-md ring-1 ring-blue-200 hover:text-white hover:blue-shadow group from-blue-100 to-blue-50 hover:from-blue-600 bg-gradient-to-r hover:to-blue-500'>
        {optionText}.
      </button>
    )
  }
}

export default Option
