import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import api from './api';
import SDC from './SDC';

class EditPost extends React.Component {
    state = {
        title: this.props.title,
        content: this.props.content,
        cover: this.props.cover
    }

    componentDidMount () {
        const ids = ['title', 'content', 'cover'];
        ids.forEach(id => {
            document.getElementById(id).value = this.props[id];
        });
    }

    handleSubmit = () => {
        const postID = this.props.match.params.postID;
        api.patch(`/posts/${postID}/`, this.state);
        this.props.callback(this.state);
        this.props.history.push(`/posts/${postID}/`);
    }

    handleCancel = () => {
        const postID = this.props.match.params.postID;
        this.props.callback();
        this.props.history.push(`/posts/${postID}/`);
    }

    handleDelete = () => {
        const postID = this.props.match.params.postID;
        api.delete(`/posts/${postID}/`).then(() => {
            this.props.history.push('/');
        });
    }

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    }

    render () {
        return (
            <div className='box'>

                <label className='label'>New Title</label>
                <input id='title' type='text' className='input' onChange={this.handleChange}/>

                <label className='label'>New Content</label>
                <textarea id='content' className='input' onChange={this.handleChange}/>

                <label className='label'>New Cover</label>
                <input id='cover' type='text' className='input' onChange={this.handleChange}/>

               <SDC
                handleCancel={this.callback}
                handleSubmit={this.handleSubmit}
                handleDelete={this.handleDelete}/>

            </div>
        );
    }
}

EditPost.propTypes = {
    title: PropTypes.string,
    content: PropTypes.string,
    match: PropTypes.object,
    callback: PropTypes.func,
    history: PropTypes.object
};

export default withRouter(EditPost);
