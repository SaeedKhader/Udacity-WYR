import React from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { Action, handleSaveQuestionAnswer } from '../../actions/questions'
import { IQuestion, IQuestions } from '../../models/question'
import { IUser, IUsers } from '../../models/user'
import Option from './Option'
import QuestionContainer from './QuestionContainer'
import Statics from './Statics'

interface QuestionProps {
  authedUser: IUser
  question: IQuestion
  author: IUser
  dispatch: ThunkDispatch<void, void, Action>
}

const Question: React.FC<QuestionProps> = ({
  authedUser,
  question,
  author,
  dispatch
}) => {
  const isAnswerOptionOne = authedUser.answers[question.id] === 'optionOne'
  const isAnswerOptionTwo = authedUser.answers[question.id] === 'optionTwo'
  const isAnswered = isAnswerOptionOne || isAnswerOptionTwo

  const answer = (answer: 'optionOne' | 'optionTwo') => {
    console.log('hi')
    dispatch(
      handleSaveQuestionAnswer({
        authedUser: authedUser.id,
        qid: question.id,
        answer
      })
    )
  }

  const totalVotes =
    question.optionOne.votes.length + question.optionTwo.votes.length

  return (
    <div className='w-full max-w-3xl px-4 pt-2 space-y-10 mt-28'>
      <h1 className='text-2xl font-bold'>
        {isAnswered ? 'Question Statics' : 'Answer Question'}
      </h1>
      <QuestionContainer
        user={author}
        optionOne={
          <Option
            optionText={question.optionOne.text}
            questionAnswered={isAnswered}
            isTheAnswer={isAnswerOptionOne}
            answer={() => answer('optionOne')}>
            {isAnswered && (
              <Statics
                votes={question.optionOne.votes.length}
                of={totalVotes}
              />
            )}
          </Option>
        }
        optionTwo={
          <Option
            optionText={question.optionTwo.text}
            questionAnswered={isAnswered}
            isTheAnswer={isAnswerOptionTwo}
            answer={() => answer('optionTwo')}>
            {isAnswered && (
              <Statics
                votes={question.optionTwo.votes.length}
                of={totalVotes}
              />
            )}
          </Option>
        }>
        <p
          className={`mt-2 text-right text-sm font-bold text-gray-600 ${
            !isAnswered && 'opacity-0'
          }`}>
          {totalVotes} vote{totalVotes > 1 && 's'}
        </p>
      </QuestionContainer>
    </div>
  )
}

const mapStateToProps = (
  {
    authedUser,
    questions,
    users
  }: { authedUser: string; questions: IQuestions; users: IUsers },
  {
    match
  }: {
    match: {
      params: { id: string }
    }
  }
) => {
  return {
    authedUser: users[authedUser],
    question: questions[match.params.id],
    author: users[questions[match.params.id].author]
  }
}

export default connect(mapStateToProps)(Question)
