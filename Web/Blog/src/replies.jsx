import React from 'react';
import PropTypes from 'prop-types';

import utils from './utils';

class Replies extends React.Component {
    render () {
        return (
            <div>
                {
                    this.props.replies.map(reply =>
                        <div style={{ borderStyle: 'solid' }} key={reply.id}>
                            {reply.content}
                            <br/>
                            {reply.author.username}
                            <br/>
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

export default Replies;
