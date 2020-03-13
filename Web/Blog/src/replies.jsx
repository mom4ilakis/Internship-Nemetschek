import React from 'react';
import PropTypes from 'prop-types';

import Reply from './Reply';
import utils from './utils';
import api from './api';

class Replies extends React.Component {
    state = {
        replies: []
    }

    componentDidMount () {
        this.setState({ replies: this.props.replies });
    }

    render () {
        return (
            <div>
                {
                    this.props.replies.map(reply =>
                        <Reply
                            key={reply.id}
                            userID={this.props.userID}
                            removeRep={this.props.removeRep}
                            updateRep={this.props.updateRep}
                            content={reply.content}
                            author={reply.author}
                            date={reply.date}
                            id={reply.id}
                        />
                    )
                }
            </div>
        );
    }
}
Replies.propTypes = {
    replies: PropTypes.array,
    deleteReply: PropTypes.func,
    userID: PropTypes.number
};

export default Replies;
