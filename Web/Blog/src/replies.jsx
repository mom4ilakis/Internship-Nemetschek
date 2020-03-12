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

    handleEditReply = (newReply) => {

            
        
    }

    handleDeleteReply = (event) => {
        api.delete(`/replies/${event.tagret.id}/`)
            .then(() => {
                this.props.deleteReply(event.tagret.id);
            })
            .catch(err => console.log(err));
    }

    render () {
        return (
            <div>
                {
                    this.props.replies.map(reply =>
                        <Reply
                            key={reply.id}
                            userID={this.props.userID}
                            content={reply.content}
                            author={reply.author}
                            time={utils.formatTime(reply.date)}
                            date={utils.formatDate(reply.date)}
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
