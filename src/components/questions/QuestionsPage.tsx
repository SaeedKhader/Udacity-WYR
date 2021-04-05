import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { ThunkDispatch } from 'redux-thunk'
import { Action } from '../../actions/questions'
import { IQuestions } from '../../models/question'
import { IUsers } from '../../models/user'
import { AppState } from '../../store'
import Option from './Option'
import QuestionContainer from './QuestionContainer'

interface QPageProps {
  authedUser: string
  questions: IQuestions
  users: IUsers
  dispatch: ThunkDispatch<void, void, Action>
}

const QuestionsPage: React.FC<QPageProps> = ({
  authedUser,
  questions,
  users
}) => {
  const [showAnswered, setShowAnswered] = useState<boolean>(false)

  const filteredQuestions: IQuestions = Object.fromEntries(
    Object.entries(questions).filter(([_, question]) => {
      if (showAnswered) {
        return (
          question.optionOne.votes.includes(authedUser) ||
          question.optionTwo.votes.includes(authedUser)
        )
      } else {
        return (
          !question.optionOne.votes.includes(authedUser) &&
          !question.optionTwo.votes.includes(authedUser)
        )
      }
    })
  )

  return (
    <div className='w-full max-w-3xl space-y-6'>
      <div className='sticky flex justify-between px-4 pt-16 pb-4 bg-white top-4 mt-14'>
        <h1 className='text-2xl font-bold'>Questions</h1>
        <div className='flex h-10 px-4 pt-2 -mt-2 space-x-2 overflow-hidden'>
          <button
            onClick={() => setShowAnswered(false)}
            className={` ${
              !showAnswered
                ? 'text-white bg-gradient-to-r from-blue-600 to-blue-500 blue-shadow'
                : 'text-blue-600'
            } px-2.5 pt-1.5 pb-3 font-light h-10  rounded-md `}>
            Unanswered
          </button>
          <button
            onClick={() => setShowAnswered(true)}
            className={` ${
              showAnswered
                ? 'text-white bg-gradient-to-r from-blue-600 to-blue-500 blue-shadow'
                : 'text-blue-600'
            } px-2.5 pt-1.5 pb-3 font-light h-10 rounded-md `}>
            Answered
          </button>
        </div>
      </div>
      <div className='px-4 pb-16 space-y-6'>
        {Object.keys(filteredQuestions)
          .sort((a, b) => {
            return questions[b].timestamp - questions[a].timestamp
          })
          .map((qid) => {
            const user = users[questions[qid].author]
            return (
              <Link className='block' to={`questions/${qid}`} key={qid}>
                <QuestionContainer
                  user={user}
                  isLink={true}
                  optionOne={
                    showAnswered ? (
                      <Option
                        questionAnswered={true}
                        optionText={questions[qid].optionOne.text}
                        isTheAnswer={questions[qid].optionOne.votes.includes(
                          authedUser
                        )}
                      />
                    ) : (
                      <p className='w-full px-3 py-2 my-1 text-gray-700 rounded-md bg-gray-50'>
                        {questions[qid].optionOne.text}.
                      </p>
                    )
                  }
                  optionTwo={
                    showAnswered ? (
                      <Option
                        questionAnswered={true}
                        optionText={questions[qid].optionTwo.text}
                        isTheAnswer={questions[qid].optionTwo.votes.includes(
                          authedUser
                        )}
                      />
                    ) : (
                      <p className='w-full px-3 py-2 my-1 text-gray-700 rounded-md bg-gray-50'>
                        {questions[qid].optionTwo.text}.
                      </p>
                    )
                  }
                />
              </Link>
            )
          })}
      </div>
    </div>
  )
}

export default connect((props: AppState) => props)(QuestionsPage)
