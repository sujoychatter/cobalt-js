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

function createRoutes(routes){
  if(!routes){
    return null;
  }
  return routes.map(function(route, index){
    return (<Route path={route.path} key={index} component={route.component} routeId={route.routeId}>
      {createRoutes(route.children)}
    </Route>)
  })
}

function getHeader(){
  if(typeof Header !== 'undefined'){
    return <Header></Header>
  }
}

function getFooter(){
  if(typeof Footer !== 'undefined'){
    return <Footer></Footer>
  }
}

render((
  <div id="app-content">
    {getHeader()}
    <div className="routed-content">
      <Provider store={store}>
        <Router history={hashHistory}>
          {createRoutes(componentRoutes)}
        </Router>
      </Provider>
    </div>
    {getFooter()}
  </div>
), document.getElementById('app'));