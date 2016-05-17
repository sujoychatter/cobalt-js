import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  render() {
    return (
      <div>
        <h1>Cobalt JS Application</h1>
        <h2>Cobalt JS Application</h2>
        <ul role="nav">
          <li><Link to="/posts">Posts</Link></li>
          <li><Link to="/users">Users</Link></li>
        </ul>
      </div>
    )
  }
})