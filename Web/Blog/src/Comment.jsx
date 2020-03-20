import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import api from './api';
import utils from './utils';
import Replies from './Replies';
import EditComment from './EditComment';
import AuthorDisplay from './AuthorDisplay';
import { AuthorContext } from './AuthorContext';

class Comment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            content: null,
            editing: false,
            replies: []
        }   
        this.replyBox = React.createRef()

    }

    toggleEdit = () => {
        this.setState({ editing: !this.state.editing });
        
    }

    handleUpdate = (newContent) => {
        if (newContent) {
            this.setState({ content: newContent });
            const newComment = this.props.comment;
            newComment.content = newContent;
            this.props.updateComment(newComment);
            this.toggleEdit();
        }
    }

    componentDidMount () {
        this.setState({ replies: this.props.comment.replies});
    }

    handleMakeReply = (event) => {
        api.post('/replies/', { content: this.state.content, comment: this.props.comment.id })
            .then(response => {
                const newReplies = [...this.state.replies, response.data];
                this.replyBox.current.value = '';
                this.setState({ replies: newReplies, content: null });
            });
    }
    
    updateReply = (newReply) => {
        const oldReplyIndx = this.state.replies.findIndex((reply) => reply.id === newReply.id);
        const updatedReplies = this.state.replies;
        updatedReplies[oldReplyIndx] = newReply;
        this.setState({ replies: updatedReplies });
    }

    removeReply = (replyID) => {
        const newReplies = this.state.replies.filter(reply => reply.id !== replyID);
        this.setState({ replies: newReplies });
    }

    handleTyping = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render () {
        const { comment } = this.props;
        const { id, date, author, content } = comment;
        return (
                this.state.editing
                ? <EditComment 
                id={id} 
                callbackOnCancel={this.toggleEdit} 
                callbackOnSubmit={this.handleUpdate} 
                callbackOnDelete={this.props.deleteComment} 
                content={content}/>
                : <div className='box' key={`comment-${id}`}>

                    <div className='content is-medium'>
                        {content}
                    </div>
                    <div className='content is-small'>
                        <AuthorDisplay
                            username={author.username}
                            avatar={author.avatar}/>
                        <div className='posted'>{`${utils.formatDate(date)} ${utils.formatTime(date)}`}</div>
                    </div>
                        {author.id === this.context.userID && 
                            <div>
                                <button onClick={this.toggleEdit} className='button is-dark is-small'>Edit</button>
                                <br/>
                                <br/>
                            </div>}
                    {this.context.logged && 
                    <div>
                        <input type='text' className='input' ref={this.replyBox} name='content' onChange={ this.handleTyping }/>
                        <button className='button is-normal is-primary' onClick={this.handleMakeReply}>Reply</button>
                    </div>
                    }
                    <div className='box is-shadowless'>
                        <Replies updateRep={this.updateReply} removeRep={this.removeReply} replies={this.state.replies}/>
                    </div>
                  </div>
        );
    }
}

Comment.contextType = AuthorContext;

Comment.propTypes = {
    comment: PropTypes.object,
    logged: PropTypes.bool,
    userID: PropTypes.number,
    deleteComment: PropTypes.func,
    history: PropTypes.object
};
export default Comment;
