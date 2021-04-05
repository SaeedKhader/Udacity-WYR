import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  RouteProps,
  Switch
} from 'react-router-dom'
import { connect } from 'react-redux'
import Login from './login'
import Nav from './nav'
import LoadingBar from 'react-redux-loading'
import NewQuestion from './questions/NewQuestion'
import LeaderBoard from './leaderboard'
import QuestionsPage from './questions/QuestionsPage'
import Question from './questions/Question'
import { IQuestions } from '../models/question'
import { IUsers } from '../models/user'
import { ThunkDispatch } from 'redux-thunk'
import { handleGetQuestions } from '../actions/questions'
import { handleGetUsers } from '../actions/users'
import { Action } from 'redux'
import { AppState } from '../store'
import E404 from './E404'

interface AppProps {
  authedUser: string
  questions: IQuestions
  users: IUsers
  dispatch: ThunkDispatch<void, void, Action<any>>
}

const App: React.FC<AppProps> = ({
  authedUser,
  questions,
  users,
  dispatch
}) => {
  useEffect(() => {
    Object.entries(users).length === 0 && dispatch(handleGetUsers())
    Object.entries(questions).length === 0 &&
      authedUser !== '' &&
      dispatch(handleGetQuestions())
  })
  return (
    <Router>
      <LoadingBar className='absolute h-1.5 bg-gradient-to-r from-blue-600 to-blue-500 z-50' />
      <div className='flex justify-center w-full'>
        {authedUser !== '' && <Nav />}
        <Switch>
          <Route path='/login' component={Login} />
          <PrivateRoute
            isAuthed={authedUser !== ''}
            path='/'
            exact
            component={QuestionsPage}
          />
          <PrivateRoute
            isAuthed={authedUser !== ''}
            path='/add'
            component={NewQuestion}
          />
          <PrivateRoute
            isAuthed={authedUser !== ''}
            path='/leaderboard'
            component={LeaderBoard}
          />
          <PrivateRoute
            isAuthed={authedUser !== ''}
            path='/questions/:id'
            component={Question}
          />
          <Route path='*' component={E404} />
        </Switch>
      </div>
    </Router>
  )
}

interface PrivateRouteProps extends RouteProps {
  component: any
  isAuthed: boolean
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  isAuthed,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={({ location, ...rest }) =>
        isAuthed ? (
          <Component {...rest} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}

export default connect(({ authedUser, users, questions }: AppState) => ({
  authedUser,
  users,
  questions
}))(App)
