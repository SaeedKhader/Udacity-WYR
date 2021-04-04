export interface IUser {
  id: string
  name: string
  avatarURL: string
  askingAvatarURL: string
  answers: {
    [key: string]: 'optionOne' | 'optionTwo' | 'optionThree'
  }
  questions: string[]
}

export interface IUsers {
  [key: string]: IUser
}
