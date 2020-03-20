import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import api from './api';
import utils from './utils';
import Edit from './Edit';
import AuthorDisplay from './AuthorDisplay';
import { AuthorContext } from './AuthorContext';

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
                <div className='content is-small'> 
                    <AuthorDisplay username={this.props.author.username} avatar={this.props.author.avatar}/>
                </div>
                <div className='content is-medium'>{this.props.content}</div>
                {(this.props.author.id === this.context.userID) &&
                    <button className='button is-dark is-small' onClick={this.handleEdit}>Edit</button>      
                }
                <div className='content is-small'>
                    <div className='posted'>{`${utils.formatDate(this.props.date)} ${utils.formatTime(this.props.date)}`}</div>
                </div>
                <br/>
            </div>
        );
    }

    render () {
        return (
            (this.state.editing && this.editView()) || (this.display())
        );
    }
}

Reply.contextType = AuthorContext;

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
