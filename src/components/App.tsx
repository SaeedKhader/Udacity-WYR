import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Login from './login'
import Nav from './nav'
import LoadingBar from 'react-redux-loading'
import NewQuestion from './questions/NewQuestion'
import LeaderBoard from './leaderboard'
import QuestionsPage from './questions/QuestionsPage'
import Question from './questions/Question'

interface AppProps {
  authedUser: string
}

const App: React.FC<AppProps> = ({ authedUser }) => {
  return (
    <Router>
      <LoadingBar className='absolute h-1.5 bg-gradient-to-r from-blue-600 to-blue-500 z-50' />
      <div className='flex justify-center w-full'>
        <Route path='/login' component={Login} />
        {authedUser !== '' ? (
          <>
            <Nav />
            <Route path='/' exact component={QuestionsPage} />
            <Route path='/add' component={NewQuestion} />
            <Route path='/leaderboard' component={LeaderBoard} />
            <Route path='/questions/:id' component={Question} />
          </>
        ) : (
          <Redirect to='/login' />
        )}
      </div>
    </Router>
  )
}

export default connect(({ authedUser }: { authedUser: string }) => ({
  authedUser
}))(App)
