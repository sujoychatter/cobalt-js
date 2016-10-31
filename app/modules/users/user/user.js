import React from 'react';
import { connect } from 'react-redux';

var User = React.createClass( {
  render() {
    return <div>User: id: {this.props.user.id}</div>
  }
})

function mapStateToProps(state, ownProps) {
  var userId = ownProps.params.userId;
  return { user: state.users.items.filter(function(user){
      return user.id == userId;
    })[0]
  };
}

User = connect(mapStateToProps)(User);

module.exports = User
