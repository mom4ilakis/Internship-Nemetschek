import React from 'react';
import PropTypes from 'prop-types';

import api from './api';
import { Redirect, withRouter } from 'react-router';

class CreatePost extends React.Component {
    state = {
        title: null,
        content: null,
        cover: null
    }

    handleCancel = () => {
        this.props.history.push('/');
    }

    handlePost = () => {
        console.log(this.state);
        api.post('/posts/', { title: this.state.title, content: this.state.content, cover: this.state.cover });
        this.props.history.push('/');
    }

    handleChange = (event) => {
        console.log(event.target);
        console.log(event.target.value);

        this.setState({ [event.target.id]: event.target.value });
    }

    render () {
        return (
            <React.Fragment>
                { this.props.isAuthor &&
                    <div>
                        Title:
                        <input type='text' id='title' onChange={this.handleChange}/>
                        Content:
                        <textarea id='content' onChange={this.handleChange}/>
                        Cover:
                        <input type='text' id='cover' onChange={this.handleChange}/>
                        <button onClick={this.handlePost}>Post</button>
                        <button onClick={this.handleCancel}>Cancel</button>
                    </div>}
                {!this.props.isAuthor &&
                    <div>
                        You are not an author !
                    </div>}
            </React.Fragment>
        );
    }
}

CreatePost.propTypes = {
    isAuthor: PropTypes.bool
}

export default withRouter(CreatePost);
