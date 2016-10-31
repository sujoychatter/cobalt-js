import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

var Users = React.createClass( {
  render() {
    return <div><div>Users: <ul>{createUsersList(this.props.users.items)}</ul> </div><div> {this.props.children} </div></div>
  }
});

function createUsersList(users){
  return users.map(function(user, index){
    return <li key={index.toString()}><Link to={"/users/user/" + user.id} > Id: {user.id} </Link></li>;
  })
}

function mapStateToProps(state) {
  return { users: state.users };
}

Users = connect(mapStateToProps)(Users);

module.exports = Users
