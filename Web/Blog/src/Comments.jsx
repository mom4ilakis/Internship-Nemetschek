import React from 'react';
import PropTypes from 'prop-types';
import Replies from './Replies';

import api from './api';
import utils from './utils';

class Comments extends React.Component {
    state = {
        data: []
    }

    componentDidMount () {
        const postID = this.props.postID;
        api.get(`/comments_on_post/${postID}/`)
            .then(({ data }) => {
                console.log(data);
                this.setState({ data: data });
            })
            .catch(err => console.log(err));
    }

    render () {
        return (
            <React.Fragment>
                {
                    this.state.data.map(comment =>
                        <div key={`comment_ ${comment.pk}`}>
                            <p>
                                {comment.content}
                            </p>
                            {comment.author}
                            <br/>;
                            {utils.formatDate(comment.date)}
                            {utils.formatTime(comment.date)}
                        </div>
                    )
                }

            </React.Fragment>
        );
    }
}
Comment.propTypes = {
    comments: PropTypes.array
};

export default Comments;
