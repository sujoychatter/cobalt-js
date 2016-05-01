import { Router, Route, hashHistory } from 'react-router'

import React from 'react'
import { render } from 'react-dom'
import App from './modules/App'
import About from './modules/About'
import Repos from './modules/Repos'

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
    <Route path="/about" component={About}/>
    <Route path="/repos" component={Repos}/>
  </Router>
), document.getElementById('app'))