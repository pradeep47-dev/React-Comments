import React from 'react'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import Post from './Post'

const Posts = ({ posts, actions}) => (
  <div>
    {posts.map(post =>
     <div className="MainPost" key={post.postId}>
      <Post key={post.postId}
        {...post}       
        actions={actions}       
      /></div>
    )}
  </div>
)

Posts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    postId: PropTypes.number.isRequired,
    postDate: PropTypes.object.isRequired,
    username: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
    votes: PropTypes.number.isRequired,
    reply: PropTypes.array.isRequired       
  }).isRequired).isRequired,
  actions: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({ posts: state.posts })

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
})

const PostsList = connect(mapStateToProps, mapDispatchToProps)(Posts)
export default PostsList
