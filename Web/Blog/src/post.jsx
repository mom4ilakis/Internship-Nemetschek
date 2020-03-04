import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

class Post extends React.Component {
    render () {
        return (
            <React.Fragment>
                <div>
                    <h3>{this.props.title}</h3>
                    <image src={this.props.cover}/>
                    <p>{this.props.content}</p>
                </div>
                <Comment comment={this.props.comment}/>
            </React.Fragment>

        );
    }
}
Post.propTypes = {
    title: PropTypes.string,
    cover: PropTypes.string,
    content: PropTypes.string,
    comment: PropTypes.object
};

export default Post;
