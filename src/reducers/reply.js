import * as types from '../actions'

export const getPost = (action) => {
    return {
        postId: action.postId,
        replyId: action.replyId,
        responseId: action.responseId,
        postDate: action.postDate,
        username: action.username,
        comment: action.comment,
        level: action.level,
        votes: action.votes,
        reply: action.reply
    }
}

export const reply = (state, action) => {
    switch (action.type) {
        case types.DELETE_POST:
            state.forEach(post => {
                if (post.postId === action.postId)
                    post.reply = post.reply.filter(reply => reply.replyId !== action.replyId)
            });
            return state.map(post => post);
        case types.UPVOTE_POST:
            state.forEach(post => {
                if (post.postId === action.postId)
                    post.reply.forEach(reply => {
                        if (reply.replyId === action.replyId)
                            reply.votes += 1;
                    });
            });
            return state.map(post => post);
        case types.DOWNVOTE_POST:
            state.forEach(post => {
                if (post.postId === action.postId)
                    post.reply.forEach(reply => {
                        if (reply.replyId === action.replyId)
                            reply.votes -= 1;
                    });
            });
            return state.map(post => post);
        case types.REPLY_POST:
            return state.map(post => post.postId === action.postId ? {
                ...post, ...post.reply.map(reply => reply.replyId === action.replyId ? {
                    ...reply, ...reply.reply.push(getPost(action))
                } : reply)
            } : post)
        default:
            return state
    }
}

export const response = (state, action) => {
    switch (action.type) {
        case types.DELETE_POST:
            state.forEach(post => {
                if (post.postId === action.postId)
                    post.reply.forEach(reply => {
                        if (reply.replyId === action.replyId)
                            reply.reply = reply.reply.filter(re => re.responseId !== action.responseId)
                    })
            });
            return state.map(post => post);
        case types.UPVOTE_POST:
            state.forEach(post => {
                if (post.postId === action.postId)
                    post.reply.forEach(reply => {
                        if (reply.replyId === action.replyId)
                            reply.reply.forEach(re => {
                                if (re.responseId === action.responseId)
                                    re.votes += 1;
                            });
                    });
            });
            return state.map(post => post);
        case types.DOWNVOTE_POST:
            state.forEach(post => {
                if (post.postId === action.postId)
                    post.reply.forEach(reply => {
                        if (reply.replyId === action.replyId)
                            reply.reply.forEach(re => {
                                if (re.responseId === action.responseId)
                                    re.votes -= 1;
                            });
                    });
            });
            return state.map(post => post);
        default:
            return state
    }
}

