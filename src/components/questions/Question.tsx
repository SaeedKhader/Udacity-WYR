import React from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { Action, handleSaveQuestionAnswer } from '../../actions/questions'
import { IQuestion, IQuestions } from '../../models/question'
import { IUser, IUsers } from '../../models/user'
import E404 from '../E404'
import Option from './Option'
import QuestionContainer from './QuestionContainer'
import Statics from './Statics'

interface QuestionProps {
  authedUser: IUser
  question: IQuestion
  author: IUser | null
  dispatch: ThunkDispatch<void, void, Action>
}

const Question: React.FC<QuestionProps> = ({
  authedUser,
  question,
  author,
  dispatch
}) => {
  if (!question) {
    return <E404 />
  }
  const isAnswerOptionOne = authedUser.answers[question.id] === 'optionOne'
  const isAnswerOptionTwo = authedUser.answers[question.id] === 'optionTwo'
  const isAnswered = isAnswerOptionOne || isAnswerOptionTwo

  const answer = (answer: 'optionOne' | 'optionTwo') => {
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
        user={author!}
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
  const question = questions[match.params.id]

  return {
    authedUser: users[authedUser],
    question,
    author: question ? users[questions[match.params.id].author] : null
  }
}

export default connect(mapStateToProps)(Question)
