import React, { useState } from "react";
import { connect } from 'react-redux'
import { createPost, replyPost } from '../actions/index'
import '../styles/PostForm.css';

let PostForm = ({ dispatch, postId, replyId, responseId, level, showCancel, onCancel }) => {    
    let username = "", comment = ""
    let [validate, setvalidate] = useState(true);

    const handleChange = () => {
        if (username.value.trim() && comment.value.trim())
            setvalidate(false);
        else
            setvalidate(true);
    }

    return (
        <form className="comments-container" onSubmit={e => {
            e.preventDefault()
            if (!username.value.trim() || !comment.value.trim())
                return

            if (showCancel) {                
                dispatch(replyPost(postId, replyId, responseId, username.value, comment.value, level));
                onCancel()
            } else {
                dispatch(createPost(username.value, comment.value))
                username.value = ''
                comment.value = ''
                setvalidate(true)
            }
        }} onReset={e => onCancel()}>
            <div className="editor">
                <div className="input-area">
                    <textarea className="text-area" placeholder={level <= 0 ? "Enter Text..." : "Enter Reply..."} ref={node => {
                        comment = node
                    }} onChange={handleChange} />
                </div>
                <div className="action-container">
                    <input className="name-area" placeholder="Enter Name..." type="text" ref={node => {
                        username = node
                    }} onChange={handleChange} />
                    <div className="action-area">
                        {showCancel ? <button className="cancel-btn" type="reset" >Cancel</button> : null}
                        <button className="post-btn" type="submit" defaultChecked={true} disabled={validate}>
                            {level <= 0 ? "Post" : "Reply"}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}

PostForm = connect()(PostForm)

export default PostForm;
