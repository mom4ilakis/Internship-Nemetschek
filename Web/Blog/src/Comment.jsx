import React from 'react';
import PropTypes from 'prop-types';

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

    handleTyping = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render () {
        const { comment } = this.props;
        const { id, date, author, content } = comment;

        return (
            (this.state.editing && <EditComment id={id} callback={this.toggleEdit} content={this.state.content}/>) ||
            <div className='box' key={`comment-${id}`}>

                <p>
                    {content}
                </p>
                <div className='author'>{author.username}</div>
                <div className='posted'>{`${utils.formatDate(date)} ${utils.formatTime(date)}`}</div>
                <br/>
                <div className='buttons has-addons are-small'>
                    {author.id === this.props.userID && <button onClick={this.handleDeleteComment} className='button is-danger'>Delete</button>}
                    {author.id === this.props.userID && <button onClick={this.toggleEdit} className='button is-dark'>Edit</button>}
                </div>

                {this.props.logged && <input type='text' className='input' id={`replyBox-${comment.id}`} name='content' onChange={ this.handleTyping }/>}
                {this.props.logged && <button className='button is-normal is-primary' onClick={this.handleMakeReply}>Reply</button>}
                <br/>
                <Replies replies={this.state.replies} userID={this.props.userID}/>
            </div>);
    }
}

Comment.propTypes = {
    comment: PropTypes.object,
    logged: PropTypes.bool,
    userID: PropTypes.number
};
export default Comment;
