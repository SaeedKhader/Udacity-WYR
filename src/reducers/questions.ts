import { Reducer } from 'redux'
import { Action, Types } from '../actions/questions'
import { IQuestions } from '../models/question'

export const questions: Reducer<IQuestions, Action> = (
  state: IQuestions = {},
  action: Action
): IQuestions => {
  switch (action.type) {
    case Types.GET_QUESTIONS:
      return action.questions
    case Types.SAVE_QUESTION:
      return { ...state, [action.question.id]: action.question }
    case Types.SAVE_QUESTION_ANSWER:
      const qid = action.answer.qid
      const answer = action.answer.answer
      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: state[qid][answer].votes.concat([action.answer.authedUser])
          }
        }
      }
    default:
      return state
  }
}
