import React from 'react';
import PropTypes from 'prop-types';

import Comment from './Comment';
import api from './api';

class Comments extends React.Component {
    state = {
        data: []
    }

    componentDidMount () {
        const postID = this.props.postID;
        api.get(`/comments_on_post/${postID}/`)
            .then(({ data }) => {
                this.setState({ data: data });
            })
            .catch(err => console.log(err));
    }

    render () {
        return (
            <React.Fragment>
                {this.state.data.map(comment =>
                    <React.Fragment key={comment.pk}>
                        <Comment pk={comment.pk} content={comment.content} author={comment.author} date={comment.date} replies={comment.replies} />
                        <br/>
                    </React.Fragment>
                )}
            </React.Fragment>
        );
    }
}
Comments.propTypes = {
    postID: PropTypes.string
};

export default Comments;
