import React from 'react';
import PropTypes from 'prop-types';
import Comments from './Comments';
import { useParams } from 'react-router';

import api from './api';
import utils from './utils';

class Post extends React.Component {
    state = {
        data: {}
    }

    componentDidMount () {
        const postID = this.props.match.params.postID;
        api.get(`/posts/${postID}/`)
            .then(({ data }) => {
                this.setState({ data: data });
            })
            .catch(err => console.log(err));
    }

    render () {
        return (
            <React.Fragment>
                <div style={{ borderStyle: 'solid' }}>
                    <h3>{this.state.data.title}</h3>
                    <img src={this.state.data.cover}/>
                    <p>{this.state.data.content}</p>
                    {utils.formatDate(this.state.data.date)}
                    <br/>
                    Time:
                    {utils.formatTime(this.state.data.date)}
                    <Comments postID={this.props.match.params.postID}/>
                    <br/>
                </div>
            </React.Fragment>

        );
    }
}
Post.propTypes = {
    match: PropTypes.object
}
export default Post;
