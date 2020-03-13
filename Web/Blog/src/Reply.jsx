import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import api from './api';
import utils from './utils';
class Reply extends React.Component {
    state = {
        content: null,
        editing: false
    }

    handleTyping = (event) => {
        this.setState({ content: event.target.value });
    }

    handleEdit = () => {
        this.setState({ editing: !this.state.editing });
    }

    handleDelete = () => {
        api.delete(`/replies/${this.props.id}/`)
            .then(() => {
                this.props.removeRep(this.props.id);
            })
            .catch(err => console.log(err));
    }

    handleSubmit = () => {
        api.patch(`/replies/${this.props.id}/`, { content: this.state.content })
            .then(() => {
                const newReply = {
                    content: this.state.content,
                    author: this.props.author,
                    date: this.props.date,
                    id: this.props.id
                };
                this.props.updateRep(newReply);
                this.handleEdit();
            })
            .catch(err => console.log(err));
    }

    handleCancel = () => {
        this.setState({ content: this.props.content, editing: false });
    }

    editView = () => {
        return (
            <div className='box'>
                <label className='label'>New reply</label>
                <input id='content' className='input' onChange={this.handleTyping}/>
                <div className='buttons are-centered'>
                    <button className='button is-primary' onClick={this.handleSubmit}>Submit</button>
                    <button className='button is-info' onClick={this.handleCancel}>Cancel</button>
                </div>
            </div>
        );
    }

    display = () => {
        return (
            <div>
                <p className='content is-medium'>{this.props.content}</p>
                <div className='content is-small'>
                    {this.props.author.username}
                    <br/>
                    {utils.formatTime(this.props.date)}
                    <br/>
                    {utils.formatDate(this.props.date)}
                </div>
                {(this.props.author.id === this.props.userID) &&
                <div className='buttons are-centered'>
                    <button className='button is-primary' onClick={this.handleEdit}>Edit</button>
                    <button className='button is-danger' onClick={this.handleDelete}>Delete</button>
                </div>}
            </div>
        );
    }

    render () {
        return (
            (this.state.editing && this.editView()) || (this.display())
        );
    }
}

Reply.propTypes = {
    userID: PropTypes.number,
    content: PropTypes.string,
    author: PropTypes.object,
    date: PropTypes.string,
    id: PropTypes.number,
    removeRep: PropTypes.func,
    updateRep: PropTypes.func
};

export default Reply;
