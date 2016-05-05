import { Router, Route, hashHistory } from 'react-router'

import React from 'react'
import { render } from 'react-dom'
import App from './modules/App'
import Posts from './modules/Posts'
import Users from './modules/Users'

import reducers from './reducers'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  })
)

const history = syncHistoryWithStore(hashHistory, store)

render((
<Provider store={store}>
  <Router history={hashHistory}>
    <Route path="/" component={App} />
	<Route path="/posts" component={Posts}/>
	<Route path="/users" component={Users}/>
  </Router>
</Provider>
), document.getElementById('app'))