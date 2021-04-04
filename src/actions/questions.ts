import {
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer
} from '../utils/_DATA'
import { showLoading, hideLoading } from 'react-redux-loading'
import {
  IQuestion,
  IQuestions,
  IPriefQuestion,
  IAnswer
} from '../models/question'
import { Dispatch } from 'redux'

export enum Types {
  GET_QUESTIONS = 'GET_QUESTIONS',
  SAVE_QUESTION = 'SAVE_QUESTION',
  SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER'
}

export type Action =
  | {
      type: Types.GET_QUESTIONS
      questions: IQuestions
    }
  | {
      type: Types.SAVE_QUESTION
      question: IQuestion
    }
  | {
      type: Types.SAVE_QUESTION_ANSWER
      answer: IAnswer
    }

const getQuestions = (questions: IQuestions): Action => ({
  type: Types.GET_QUESTIONS,
  questions
})

const saveQuestion = (question: IQuestion): Action => ({
  type: Types.SAVE_QUESTION,
  question
})

const saveQuestionAnswer = (answer: IAnswer): Action => ({
  type: Types.SAVE_QUESTION_ANSWER,
  answer
})

export const handleGetQuestions = () => (dispatch: Dispatch<Action | any>) => {
  dispatch(showLoading())
  return _getQuestions().then((questions) => {
    dispatch(getQuestions(questions))
    dispatch(hideLoading())
  })
}

export const handleSaveQuestions = (priefQuestion: IPriefQuestion) => (
  dispatch: Dispatch<Action | any>
) => {
  dispatch(showLoading())
  return _saveQuestion(priefQuestion).then((question) => {
    dispatch(saveQuestion(question))
    dispatch(hideLoading())
  })
}

export const handleSaveQuestionAnswer = (answer: IAnswer) => (
  dispatch: Dispatch<Action | any>
) => {
  dispatch(showLoading())
  return _saveQuestionAnswer(answer).then(() => {
    dispatch(saveQuestionAnswer(answer))
    dispatch(hideLoading())
  })
}
