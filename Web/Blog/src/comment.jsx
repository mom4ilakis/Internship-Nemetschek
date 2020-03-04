import React from 'react';
import PropTypes from 'prop-types';
import Replies from './Replies';

class Comment extends React.Component {
    render () {
        return (
            <React.Fragment>
                <div>
                    {this.props.comment.author}
                    <p>
                        {this.props.comment.content}
                    </p>
                    {this.props.comment.date}
                </div>
                <Replies replies={this.props.comment.replies}/>
            </React.Fragment>
        );
    }
}
Comment.propTypes = {
    comment: PropTypes.object
};

export default Comment;
