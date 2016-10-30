import React from 'react';
import { connect } from 'react-redux';

var User = React.createClass( {
  render() {
    return <div>User: {this.props.users}</div>
  }
})

function mapStateToProps(state) {
  return { users: state.users };
}

User = connect(mapStateToProps)(User);

module.exports = User
