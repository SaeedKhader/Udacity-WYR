import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { Redirect } from 'react-router-dom'
import { Action, handleSaveQuestions } from '../../actions/questions'
import { IUser, IUsers } from '../../models/user'
import QuestionContainer from './QuestionContainer'

interface NewQuestionProps {
  authedUser: IUser
  dispatch: ThunkDispatch<void, void, Action>
}

const NewQuestion: React.FC<NewQuestionProps> = ({ authedUser, dispatch }) => {
  const [optionOne, setOptionOne] = useState('')
  const [optionTwo, setOptionTwo] = useState('')
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [toHome, setToHome] = useState(false)

  useEffect(() => {
    setBtnDisabled(!(optionOne !== '' && optionTwo !== ''))
  }, [optionOne, optionTwo])

  if (toHome === true) {
    return <Redirect to='/' />
  }

  const saveQuestion = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(
      handleSaveQuestions({
        optionOneText: optionOne,
        optionTwoText: optionTwo,
        author: authedUser.id
      })
    )
    setToHome(true)
  }
  return (
    <div className='w-full max-w-3xl px-4 pt-2 space-y-10 mt-28'>
      <h1 className='text-2xl font-bold'>New Questions</h1>
      <QuestionContainer
        user={authedUser}
        optionOne={
          <input
            value={optionOne}
            onChange={(e) => {
              setOptionOne(e.target.value)
            }}
            className='w-full px-3 py-2 my-1 rounded-md bg-gray-50'
            placeholder='option one'
          />
        }
        optionTwo={
          <input
            value={optionTwo}
            onChange={(e) => {
              setOptionTwo(e.target.value)
            }}
            className='w-full px-3 py-2 my-1 rounded-md bg-gray-50'
            placeholder='option two'
          />
        }>
        <button
          onClick={saveQuestion}
          disabled={btnDisabled}
          className={`block px-8 py-2.5 mt-5 ml-auto rounded-md ${
            btnDisabled
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'text-white bg-gradient-to-r from-blue-600 to-blue-500 blue-shadow'
          }`}>
          Save
        </button>
      </QuestionContainer>
    </div>
  )
}

export default connect(
  ({ authedUser, users }: { authedUser: string; users: IUsers }) => ({
    authedUser: users[authedUser]
  })
)(NewQuestion)
