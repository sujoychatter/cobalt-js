import React from 'react';
import { connect } from 'react-redux';
import { action } from 'cobalt-js';

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
      dispatch(action('loadData', 'Post', {name: 'demoReq', url: '/api/demoPosts', params: {id: 1}, checkType: 'url'}))
    }
  }
}

function mapStateToProps(state) {
  return { posts: state.posts , reqLoading: state.requestProgress.demoReq};
}

Posts = connect(mapStateToProps, mapDispatchToProps)(Posts);

export default Posts;
