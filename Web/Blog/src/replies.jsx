import React from 'react';
import PropTypes from 'prop-types';

class Replies extends React.Component {
    render () {
        return (
            <div>
                {
                    this.props.replies.map(reply =>
                        <div key={reply.id}>
                            {reply.author}
                            {reply.content}
                            {reply.date}
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
