import React from 'react';
import PropTypes from 'prop-types';

import utils from './utils';

class Replies extends React.Component {
    render () {
        return (
            <div>
                {
                    this.props.replies.map(reply =>
                        <div key={reply.id}>
                            <p>{reply.content}</p>
                            <div id='author'>{reply.author.username}</div>
                            <div id='posted'>{`${utils.formatDate(reply.date)} ${utils.formatTime(reply.date)}`}</div>
                        </div>
                    )
                }
            </div>
        );
    }
}
Replies.propTypes = {
    replies: PropTypes.array
};

export default Replies;
