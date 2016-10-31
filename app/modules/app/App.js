import React from 'react';
import { Link } from 'react-router';
require('../../scss/app.scss');

module.exports =  React.createClass({
  render() {
    return (
      <div>
        <div className="routes">
          Example Routes
        </div>
        <ul role="nav">
          <li><Link to="/posts">Lazy Loaded Posts</Link></li>
          <li><Link to="/users">Users with nested route</Link></li>
        </ul>
      </div>
    )
  }
});