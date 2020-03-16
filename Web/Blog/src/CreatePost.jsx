import React from 'react';
import PropTypes from 'prop-types';

import api from './api';
import Error from './Error';
import { Redirect, withRouter } from 'react-router';
import utils from './utils';

class CreatePost extends React.Component {
    state = {
        title: null,
        content: null,
        cover: null,
        error: null
    }

    handleCancel = () => {
        this.props.history.push('/');
    }

    checkValidty = () => {
        return utils.validURL(this.state.cover);
    }

    handlePost = () => {
        if (this.checkValidty()) {
            api.post('/posts/', { title: this.state.title, content: this.state.content, cover: this.state.cover })
                .then(({ data }) => {
                    this.props.history.push(`/posts/${data.id}`);
                })
                .catch(err => {
                    this.setState({ error: err.response.data });
                    console.log(err);
                });
        }else {
            this.setState({error: {message: 'Invalid URL'} });
        }
    }

        handleChange = (event) => {
            this.setState({ [event.target.id]: event.target.value });
        }

    removeError = () => {
        this.setState({ error: null });
    }

    render () {
        return (
            <React.Fragment>
                { this.props.isAuthor
                    ? <div className='box'>

                        <label className='label'>Title</label>
                        <input type='text' required maxLength='160' className='input' id='title' onChange={this.handleChange}/>

                        <label className='label'>Content</label>
                        <textarea id='content' required maxLength='1000' rows='100' className='input' style={{height: '400px' }} onChange={this.handleChange}/>

                        <label className='label'>Cover</label>
                        <input type='url' required className='input' id='cover'  onChange={this.handleChange}/>

                        <div className='buttons has-addons'>
                            <button className='button is-primary' onClick={this.handlePost}>Post</button>
                            <button className='button is-danger' onClick={this.handleCancel}>Cancel</button>
                        </div>

                    </div>
                    : <div>
                        You are not an author !
                    </div>}
                {this.state.error && <Error message={this.state.error} callback={this.removeError}/>}
            </React.Fragment>
        );
    }
}

CreatePost.propTypes = {
    isAuthor: PropTypes.bool
};

export default withRouter(CreatePost);
