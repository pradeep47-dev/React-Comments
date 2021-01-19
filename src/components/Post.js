import React, { useState } from 'react'
import PropTypes from 'prop-types'
import PostForm from './PostForm';
import Avatar from 'react-avatar';
import moment from 'moment'
import '../styles/Post.css'
import Votes from './Votes';

const Post = (post) => {
  let { postId, replyId, responseId, postDate, username, comment, level, reply, actions } = post;
  const [showReplyForm, setshowReplyForm] = useState(false)
  const onClickReply = () => setshowReplyForm(true)
  const onCancelReply = () => setshowReplyForm(false)

  const [showReply, setshowReply] = useState(true)
  const onClick = () => setshowReply(!showReply)
  level++;

  return (
    <div className="post">
      <div className="post-header">
        <Avatar size={30} round={true} textSizeRatio={2} maxInitials={2} name={username} />
        <label className="post-reply-username">{username}</label>
        <label className="post-reply-date">{moment(postDate).startOf('seconds').fromNow()}</label>
      </div>
      <div className="post-body">
        {comment}
      </div>
      <div className="post-footer">
        <Votes {...post} level={level} actions={actions} />
        
        {typeof (reply) != "undefined" && reply.length > 0 && 
           <button className="post-reply-btn" onClick={onClick}>
           <svg viewBox="0 0 24 24" width="1em" height="1em">
             <path d="M8.995 22a.955.955 0 0 1-.704-.282.955.955 0 0 1-.282-.704V18.01H3.972c-.564 0-1.033-.195-1.409-.586A1.99 1.99 0 0 1 2 15.99V3.97c0-.563.188-1.032.563-1.408C2.94 2.188 3.408 2 3.972 2h16.056c.564 0 1.033.188 1.409.563.375.376.563.845.563 1.409V15.99a1.99 1.99 0 0 1-.563 1.432c-.376.39-.845.586-1.409.586h-6.103l-3.709 3.71c-.22.187-.454.281-.704.281h-.517zm.986-6.01v3.1l3.099-3.1h6.948V3.973H3.972V15.99h6.01zm-3.99-9.013h12.018v2.018H5.991V6.977zm0 4.037h9.014v1.972H5.99v-1.972z"></path>
           </svg>
               { (showReply ? " Hide " : " Show ") + reply.length + (reply.length <= 1 ?  " reply" : " replies")}
         </button>}

        {typeof (level) != "undefined" && level <= 2 && 
          <button className="post-reply-btn" onClick={onClickReply}>
            <svg viewBox="0 0 24 24" width="1em" height="1em">
              <path d="M21.947 18.144a1 1 0 0 1-1.496 1.18c-3.255-2.193-5.734-3.275-8.556-3.477v4.134a1 1 0 0 1-1.688.726L2.312 13.22a1 1 0 0 1 0-1.451l7.894-7.494A1 1 0 0 1 11.895 5v3.953c3.62.481 7.937 3.52 10.052 9.191zm-6.992-5.851c-1.624-.938-3.31-1.407-5.06-1.407V7.287l-5.422 5.207 5.422 5.203v-3.885c2.696 0 5.644.763 8.843 2.29-1.002-1.52-2.346-2.979-3.783-3.81z"></path>
            </svg>
            { " Reply"}
          </button>}  
                 
        <button className="post-reply-btn" onClick={e => { actions.deletePost(postId, replyId, responseId, level) }}>
          <svg viewBox="0 0 24 24" width="1em" height="1em">
            <path d="M5 19V7h14v12c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2zM7 9v10h10V9H7zm7.5-5H20v2H4V4h5.5l1-1h3l1 1zM9 11h2v8H9v-8zm4 0h2v8h-2v-8z"></path>
          </svg>
          { " Delete"}
        </button>
      </div>
      <div className="reply-container">
        {showReplyForm && <div className="post-reply-form">
          <PostForm showCancel={showReplyForm} onCancel={onCancelReply} postId={postId} replyId={replyId} responseId={responseId} level={level} />
        </div>}
        {showReply && reply.map(post =>
          <Post key={level === 1 ? post.replyId : post.responseId}
            {...post}
            level={level}
            actions={actions}
          />
        )}
      </div>
    </div>
  );
}


Post.propTypes = {
  postId: PropTypes.number.isRequired,
  replyId: PropTypes.number.isRequired,
  responseId: PropTypes.number.isRequired,
  postDate: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  votes: PropTypes.number.isRequired,
  reply: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

export default Post

