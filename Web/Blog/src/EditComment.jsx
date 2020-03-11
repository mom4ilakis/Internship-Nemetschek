import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import api from './api';

class EditComment extends React.Component {
    state = {
        content: null
    }

    componentDidMount () {
        this.setState({ content: this.props.content });
        document.getElementById('content').value = this.props.content;
    }

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    }

    handleSubmit = () => {
        api.patch(`/comments/${this.props.id}/`, { content: this.state.content })
            .then(() => {
                this.props.callback(this.state.content);
            })
            .catch(err => console.log(err));
    }

    handleDelete = () => {
        api.delete(`/comments/${this.props.id}/`)
            .then(() => {
                this.props.callback();
            })
            .catch(err => console.log(err));
    }

    render () {
        return (
            <div className='box'>
                <label className='label'>New comment</label>
                <input id='content' type='text' className='input' onChange={this.handleChange}/>
                <div className='buttons'>
                    <button className='button is-primary' onClick={this.handleSubmit}>Save</button>
                    <button className='button is-info' onClick={this.props.callback}>Cancel</button>
                    <button className='button is-danger' onClick={this.handleDelete}>Delete</button>
                </div>
            </div>
        );
    }
}

EditComment.propTypes = {
    content: PropTypes.string,
    id: PropTypes.number,
    callback: PropTypes.func
};

export default EditComment;
