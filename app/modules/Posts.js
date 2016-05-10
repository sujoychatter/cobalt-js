import React from 'react';
import {getPosts} from '../actions/posts';
import { connect } from 'react-redux';
import { action } from 'cobalt-js';

var Posts = React.createClass( {
	componentWillMount(){
		this.props.loadData();
	},
	render() {
		return <div>Posts: {this.props.posts.items}</div>
	}
})

function mapDispatchToProps(dispatch){
  return {
    loadData: () => {
      dispatch(action('loadData', 'Post', {data: null, url: '/', params: {id: 1}, checkType: 'url', reqSettings: {body: {id: 1}}}))
    }
  }
}

function mapStateToProps(state) {
  return { posts: state.posts };
}

Posts = connect(mapStateToProps, mapDispatchToProps)(Posts);

export default Posts;
