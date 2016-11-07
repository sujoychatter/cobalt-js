import React from 'react';
import { connect } from 'react-redux';
import { action } from 'cobalt-js';
import { loadDemoReq } from '../../models/posts';

var Posts = React.createClass( {
  componentWillMount(){
    this.props.loadData();
  },
  render() {
    return <div><div>Loading: {this.props.reqLoading ? "true" : "false"}</div><div>Posts: {this.props.posts.items}</div></div>
  }
})

function mapDispatchToProps(dispatch){
  return {
    loadData: () => {
      dispatch(action('loadData', 'Post', loadDemoReq))
    }
  }
}

function mapStateToProps(state) {
  return { posts: state.posts , reqLoading: state.requestInProgress.demoReq};
}

Posts = connect(mapStateToProps, mapDispatchToProps)(Posts);

module.exports = Posts;
