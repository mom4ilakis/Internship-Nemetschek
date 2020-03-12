import React from 'react';
import PropTypes from 'prop-types';

import Comment from './Comment';
import api from './api';
import { withRouter } from 'react-router';

class Comments extends React.Component {
    state = {
        data: [],
        commentBox: null
    }

    componentDidMount () {
        const postID = this.props.postID;
        api.get(`/comments_on_post/${postID}/`)
            .then(({ data }) => {
                const commentBox = document.getElementById(`commentBox-${postID}`);
                this.setState({ data: data, commentBox: commentBox });
            })
            .catch(err => console.log(err));
    }

    handleCommentSubmit = event => {
        api.post('/comments/', { content: this.state.commentBox.value, post: this.props.postID })
            .then(({ data }) => {
                const newData = [...this.state.data, data];
                this.setState({ data: newData });
                this.state.commentBox.value = '';
            });
    }

    deleteComment = (commentID) => {
        const newData = this.state.data.filter((comment) =>
            comment.id !== commentID
        );
        this.setState({ data: newData });
        this.props.history.push(this.props.location.pathname)
    }

    render () {
        return (
            <React.Fragment>
                {this.props.logged && <input type='text' className='input' id={`commentBox-${this.props.postID}`} />}
                {this.props.logged && <button name='commentButton' className='button is-normal is-primary' onClick={this.handleCommentSubmit}>Comment</button>}
                {this.state.data.map(comment =>
                    <React.Fragment key={comment.id}>
                        <Comment comment={comment} logged={this.props.logged} userID={this.props.userID} deleteComment={this.deleteComment}/>
                        <br/>
                    </React.Fragment>
                )}
            </React.Fragment>
        );
    }
}
Comments.propTypes = {
    postID: PropTypes.string,
    logged: PropTypes.bool,
    userID: PropTypes.number
};

export default withRouter(Comments);
