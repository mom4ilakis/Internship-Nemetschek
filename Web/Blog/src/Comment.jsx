import React, { lazy } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import api from './api';
import utils from './utils';
import Replies from './Replies';
import EditComment from './EditComment';

class Comment extends React.Component {
    state = {
        content: null,
        editing: false,
        replyBox: null,
        replies: []
    }

    toggleEdit = (newContent) => {
        this.setState({ editing: !this.state.editing });
        if (!newContent) {
            this.setState({ content: newContent });
            this.props.updateComment(this.props.comment.id);
        }
    }

    componentDidMount () {
        const replyBox = document.getElementById(`replyBox-${this.props.comment.id}`);
        this.setState({ replies: this.props.comment.replies, replyBox: replyBox });
    }

    handleMakeReply = (event) => {
        api.post('/replies/', { content: this.state.content, comment: this.props.comment.id })
            .then(response => {
                const newReplies = [...this.state.replies, response.data];
                this.state.replyBox.value = '';
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

    handleDeleteComment = () => {
        api.delete(`/comments/${this.props.comment.id}/`)
            .then(() => {
                this.props.deleteComment(this.props.comment.id);
                this.props.history.push(this.props.location.pathname);
            })
            .catch(err => console.log(err));
    }

    render () {
        const { comment } = this.props;
        const { id, date, author, content } = comment;

        return (
            this.state.editing
                ? <EditComment id={id} callback={this.toggleEdit} content={this.state.content}/>
                : <div className='box' key={`comment-${id}`}>

                    <p className='content'>
                        {content}
                    </p>
                    <div className='content is-small'>
                        <div className='author'>{author.username}</div>
                        <div className='posted'>{`${utils.formatDate(date)} ${utils.formatTime(date)}`}</div>
                    </div>
                    <br/>
                    <div className='buttons has-addons are-small'>
                        {
                            author.id === this.props.userID &&
                            <button
                                onClick={this.handleDeleteComment}
                                className='button is-danger'
                            >
                                Delete
                            </button>
                        }
                        {author.id === this.props.userID && <button onClick={this.toggleEdit} className='button is-dark'>Edit</button>}
                    </div>

                    {this.props.logged &&
                    <input type='text' className='input' id={`replyBox-${comment.id}`} name='content' onChange={ this.handleTyping }/>}
                    {this.props.logged && <button className='button is-normal is-primary' onClick={this.handleMakeReply}>Reply</button>}
                    <br/>
                    <Replies updateRep={this.updateReply} removeRep={this.removeReply} replies={this.state.replies} userID={this.props.userID}/>
                  </div>);
    }
}

Comment.propTypes = {
    comment: PropTypes.object,
    logged: PropTypes.bool,
    userID: PropTypes.number,
    deleteComment: PropTypes.func,
    history: PropTypes.object
};
export default withRouter(Comment);
