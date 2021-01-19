import moment from 'moment'

export const UPVOTE_POST = 'UPVOTE_POST'
export const DOWNVOTE_POST = 'DOWNVOTE_POST'
export const REPLY_POST = 'REPLY_POST'
export const CREATE_POST = 'CREATE_POST'
export const DELETE_POST = 'DELETE_POST'


let lvl1 = 0, lvl2 = 0, lvl3 = 0
export const createPost = (username, comment) => ({
  type: CREATE_POST,
  postId: lvl1++, 
  replyId: 0,
  responseId: 0,
  postDate: moment(),
  username,
  comment,
  level: 0,
  votes: 0,
  reply: []
})

export const deletePost = (postId, replyId, responseId, level) => ({
  type: DELETE_POST,  
  postId,
  replyId,
  responseId,
  level  
})

export const upvotePost = (postId, replyId, responseId, level) => ({
  type: UPVOTE_POST,
  postId,
  replyId,
  responseId,
  level  
})

export const downPost = (postId, replyId, responseId, level) => ({
  type: DOWNVOTE_POST ,
  postId,
  replyId,
  responseId,
  level  
})

export const replyPost = (postId, replyId, responseId, username, comment, level) => ({
  type: REPLY_POST,  
  postId,
  replyId: level === 1 ? lvl2++ : replyId,
  responseId: level === 2 ? lvl3++ : responseId,
  postDate: moment(),
  username,
  comment,
  level,
  votes: 0,
  reply: []  
})


