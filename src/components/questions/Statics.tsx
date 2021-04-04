import React from 'react'

interface StaticsProps {
  votes: number
  of: number
}

const Statics: React.FC<StaticsProps> = ({ votes, of }) => {
  const precentage = (votes / of) * 100
  return (
    <>
      <div className='absolute inset-0 z-10'>
        <div
          style={{ width: `${precentage}%` }}
          className='h-full bg-black bg-opacity-10'></div>
      </div>
      <div className='absolute inset-0 z-40 flex items-center justify-end pr-10 opacity-50'>
        {Math.round(precentage)}%
      </div>
    </>
  )
}

export default Statics
