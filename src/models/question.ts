export interface IOption {
  votes: string[]
  text: string
}

export interface IQuestion {
  id: string
  author: string
  timestamp: number
  optionOne: IOption
  optionTwo: IOption
}

export interface IQuestions {
  [key: string]: IQuestion
}

export interface IPriefQuestion {
  optionOneText: string
  optionTwoText: string
  author: string
}

export interface IAnswer {
  authedUser: string
  qid: string
  answer: 'optionOne' | 'optionTwo'
}
