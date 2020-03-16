import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import api from './api';
import SDC from './SDC';

class EditComment extends React.Component {
    state = {
        content: null
    }

    componentDidMount () {
        this.setState({ content: this.props.content });
        document.getElementById('newComment').value = this.props.content;
    }

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    }

    handleSubmit = () => {
        api.patch(`/comments/${this.props.id}/`, { content: this.state.content })
            .then(() => {
                this.props.callbackOnSubmit(this.state.content);
            })
            .catch(err => console.log(err));
    }

    handleDelete = () => {  
        this.props.callbackOnDelete(this.props.id);
    }

    render () {
        return (
            <div className='box'>
                <label className='label'>New comment</label>
                <input id='newComment' type='text' className='input' onChange={this.handleChange}/>
                <SDC
                handleDelete={this.handleDelete}
                handleSubmit={this.handleSubmit}
                handleCancel={this.props.callbackCancel}/>
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
