import React from 'react';
import {getUsers} from '../actions/users';
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

export default Users
