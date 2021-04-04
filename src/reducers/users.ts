import { Reducer } from 'redux'
import { IUsers } from '../models/user'
import { Action as UAction, Types as UTypes } from '../actions/users'
import { Action as QAction, Types as QTypes } from '../actions/questions'

type Action = UAction | QAction

export const users: Reducer<IUsers, Action> = (
  state: IUsers = {},
  action: Action
) => {
  switch (action.type) {
    case UTypes.GET_USERS:
      return action.users
    case QTypes.SAVE_QUESTION:
      const author = action.question.author
      return {
        ...state,
        [author]: {
          ...state[author],
          questions: state[author].questions.concat([action.question.id])
        }
      }
    case QTypes.SAVE_QUESTION_ANSWER:
      const authedUser = action.answer.authedUser
      const qid = action.answer.qid
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: { ...state[authedUser].answers, [qid]: action.answer.answer }
        }
      }
    default:
      return state
  }
}
