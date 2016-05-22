import React from 'react';
import { connect } from 'react-redux';

var Users = React.createClass( {
  render() {
    return <div>Users: {this.props.users.items}</div>
  }
})

function mapStateToProps(state) {
  return { users: state.users };
}

Users = connect(mapStateToProps)(Users);

module.exports = Users
