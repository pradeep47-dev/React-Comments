import * as types from '../actions'
import { getPost, reply, response  } from './reply'


const posts = (state = [], action) => {
  switch (action.type) {
    case types.CREATE_POST:
      return [
        ...state, getPost(action)
      ]

    case types.DELETE_POST:      
      switch (action.level) {
        case 1:          
          return state.filter(post =>
            post.postId !== action.postId
          )
        case 2:
          return reply(state, action)
        case 3:
          return response(state, action)
        default:
          return state
      }    

    case types.REPLY_POST:  
      switch (action.level) {
        case 1:
          return state.map(post =>
            post.postId === action.postId ? {
              ...post, ...post.reply.push(getPost(action))
            } : post)
        case 2:
          return reply(state, action)
        default:
          return state
      }
    
      case types.UPVOTE_POST:       
        switch (action.level) {
          case 1:
            return state.map(post =>
              post.postId === action.postId ? { ...post, votes: post.votes + 1 } : post)
          case 2:
            return reply(state, action)
          case 3:
            return response(state, action)
          default:
            return state
        }
  
      case types.DOWNVOTE_POST:
        switch (action.level) {
          case 1:
            return state.map(post =>
              post.postId === action.postId ? { ...post, votes: post.votes - 1 } : post)
          case 2:
            return reply(state, action)
          case 3:
            return response(state, action)
          default:
            return state
        }
        
    default:
      return state
  }
}

export default posts






