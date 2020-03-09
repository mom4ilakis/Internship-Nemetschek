import React from 'react';
import PropTypes from 'prop-types';

import api from './api';
import utils from './utils';
import Replies from './Replies';

class Comment extends React.Component {
    state = {
        content: null,
        replyBox: null,
        replies: []
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

    handleTyping = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render () {
        const { comment } = this.props;
        const { id, date, author, content } = comment;

        return (
            <div className='comment' key={`comment-${id}`}>
                <p>
                    {content}
                </p>
                <div className='author'>{author.username}</div>
                <div className='posted'>{`${utils.formatDate(date)} ${utils.formatTime(date)}`}</div>
                <br/>
                {this.props.logged && <input type='text' id={`replyBox-${comment.id}`} name='content' onChange={ this.handleTyping }/>}
                {this.props.logged && <button onClick={this.handleMakeReply}>Reply</button>}
                <br/>
                <Replies replies={this.state.replies}/>
            </div>);
    }
}

Comment.propTypes = {
    comment: PropTypes.object,
    logged: PropTypes.bool
};
export default Comment;
