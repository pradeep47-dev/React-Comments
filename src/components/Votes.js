import React from 'react'
import PropTypes from 'prop-types'
import '../styles/Votes.css'

const Votes = (vote) => { 
  const { postId, replyId, responseId, level, votes, actions } = vote;
  return (
    <div className="post-votes">       
        <button className="post-votes-btn" onClick={e => { actions.upvotePost(postId, replyId, responseId, level) }}>
          <svg viewBox="0 0 24 24" width="24px" height="24px">
            <path d="M7 14l5-5 5 5z">
            </path>
          </svg>
        </button>
        <div className="post-votes-count">{votes}</div>
        <button className="post-votes-btn" onClick={e => { actions.downPost(postId, replyId, responseId, level) }}>
          <svg viewBox="0 0 24 24" width="24px" height="24px" >
            <path d="M7 10l5 5 5-5z">
            </path>
          </svg>
        </button>
    </div>
  );
}


Votes.propTypes = {
  postId: PropTypes.number.isRequired,
  replyId: PropTypes.number.isRequired,
  responseId: PropTypes.number.isRequired, 
  level: PropTypes.number.isRequired,  
  votes: PropTypes.number.isRequired,
  actions: PropTypes.object.isRequired
}

export default Votes

