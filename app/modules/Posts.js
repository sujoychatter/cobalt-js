import React from 'react';
import {getPosts} from '../actions/posts';
import { connect } from 'react-redux';

var Posts = React.createClass( {
	render() {
		return <div>Posts: {this.props.posts.items}</div>
	}
})

function mapStateToProps(state) {
  return { posts: state.posts };
}

Posts = connect(mapStateToProps)(Posts);

export default Posts;
