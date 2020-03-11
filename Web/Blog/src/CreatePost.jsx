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
        const response = api.post('/posts/', { title: this.state.title, content: this.state.content, cover: this.state.cover });
        response.then(({ data }) => {
            this.props.history.push(`/posts/${data.id}`);
        });
    }

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    }

    render () {
        return (
            <React.Fragment>
                { this.props.isAuthor &&
                    <div className='box'>

                        <label className='label'>Title</label>
                        <input type='text' className='input' id='title' onChange={this.handleChange}/>

                        <label className='label'>Content</label>
                        <textarea id='content' className='input' onChange={this.handleChange}/>

                        <label className='label'>Cover</label>
                        <input type='text' className='input' id='cover' onChange={this.handleChange}/>

                        <div className='buttons has-addons'>
                            <button className='button is-primary' onClick={this.handlePost}>Post</button>
                            <button className='button is-danger' onClick={this.handleCancel}>Cancel</button>
                        </div>

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
