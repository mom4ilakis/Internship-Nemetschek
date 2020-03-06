import React from 'react';
import PropTypes from 'prop-types';

import utils from './utils';
import Replies from './Replies';

class Comment extends React.Component {
    render () {
        return (
            <div style={{ borderStyle: 'solid' }} key={`comment_ ${this.props.pk}`}>
                <p>
                    {this.props.content}
                </p>
                {this.props.author.username}
                <br/>
                {utils.formatDate(this.props.date)}
                <br/>
                {utils.formatTime(this.props.date)}
                <Replies replies={this.props.replies}/>
            </div>);
    }
}

Comment.propTypes = {
    pk: PropTypes.string,
    content: PropTypes.string,
    author: PropTypes.object,
    date: PropTypes.string,
    replies: PropTypes.object
};
export default Comment;
