import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import api from './api';
import utils from './utils';
import Edit from './Edit';

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

    handleSubmit = (content) => {
        api.patch(`/replies/${this.props.id}/`, { content: content})
            .then(() => {
                const newReply = {
                    content: content,
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
            <Edit 
            name='reply'
            content={this.props.content}
            callbackOnSuccess={this.handleSubmit}
            callbackOnDelete={this.handleDelete}
            callbackOnCancel={this.handleEdit}/>
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
                <div className='buttons are-centered are-small'>
                    <button className='button is-dark' onClick={this.handleEdit}>Edit</button>
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
