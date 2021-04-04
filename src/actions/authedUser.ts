export enum Type {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT'
}

export type Action =
  | {
      type: Type.LOGIN
      userId: string
    }
  | {
      type: Type.LOGOUT
    }

export const login = (userId: string): Action => ({
  type: Type.LOGIN,
  userId
})

export const logout = (): Action => ({
  type: Type.LOGOUT
})
