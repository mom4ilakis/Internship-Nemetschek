import React from 'react';
import PropTypes from 'prop-types';
import Replies from './Replies';

class Comments extends React.Component {

    componentDidMount () {
    }

    render () {
        return (
            <React.Fragment>
                <div>
                </div>
                <Replies replies={this.props.comment.replies}/>
            </React.Fragment>
        );
    }
}
Comment.propTypes = {
    comments: PropTypes.array
};

export default Comment;
