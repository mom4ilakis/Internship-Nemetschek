import React from 'react';
import PropTypes from 'prop-types';

import Comment from './Comment';
import api from './api';
import { withRouter } from 'react-router';
import { AuthorContext } from './AuthorContext';

class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
        this.commentBox = React.createRef();
    }

    componentDidMount () {
        const postID = this.props.postID;
        api.get(`/comments_on_post/${postID}/`)
            .then(({ data }) => {
                this.setState({ data: data });
            })
            .catch(err => console.log(err));
    }

    updateComment = (comment) => {
        const copyData = this.state.data;
        const commentIndex = copyData.findIndex((c) => c.id === comment.id);
        copyData[commentIndex] = comment;
        this.setState({ data: copyData });
    }

    handleCommentSubmit = event => {
        api.post('/comments/', { content: this.commentBox.current.value, post: this.props.postID })
            .then(({ data }) => {
                const newData = [...this.state.data, data];
                this.setState({ data: newData });
                this.commentBox.current.value = '';
            });
    }

    deleteComment = (commentID) => {
        api.delete(`/comments/${commentID}/`)
        .then(()=> {
            const newData = this.state.data.filter((comment) =>
            comment.id !== commentID
            );
            this.setState({ data: newData });
            this.props.history.push(this.props.location.pathname)
        })
        .catch(err => console.log(err));
    }

    render () {
        return (
            <React.Fragment>
                {this.context.logged && <input type='text' className='input' ref={this.commentBox} />}
                {this.context.logged && <button name='commentButton' className='button is-normal is-primary' onClick={this.handleCommentSubmit}>Comment</button>}
                {this.state.data.map(comment =>
                    <React.Fragment key={comment.id}>
                        <Comment updateComment={this.updateComment} comment={comment} deleteComment={this.deleteComment}/>
                        <br/>
                    </React.Fragment>
                )}
            </React.Fragment>
        );
    }
}

Comments.contextType = AuthorContext

Comments.propTypes = {
    postID: PropTypes.string,
    logged: PropTypes.bool,
    userID: PropTypes.number
};

export default withRouter(Comments);
