import { Router, Route, hashHistory } from 'react-router'
import React, { Component } from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';

import { fetchedUrlReducer, requestProgressReducer } from 'cobalt-js'

import reducers from '../reducers'


/*********************    generated wrapper imports    *************************/


/********************************************/

const store = createStore(
  combineReducers({
    ...reducers,
    fetchedUrl: fetchedUrlReducer,
    requestProgress: requestProgressReducer
  }),
  applyMiddleware(thunk)
)

function createRoutes(){
  return componentRoutes.map(function(route, index){
    return <Route path={route.path} key={index} component={route.component} routeId={route.routeId}/>
  })
}

render((
  <Provider store={store}>
    <Router history={hashHistory}>
      {createRoutes()}
    </Router>
  </Provider>
), document.getElementById('app'))