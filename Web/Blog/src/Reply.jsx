import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import api from './api';



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
        api.delete(`/replies/${this.props.id}/`);
    }

    render () {
        return (
            <div>
                <p>{this.props.content}</p>
                <div className='contetn is-small'>
                    {this.props.author.username}
                    {this.props.date}
                    {this.props.time}
                </div>
                {(this.props.content.author.id === this.props.userID) &&
                <div className='buttons are-centered'>
                    <button className='button is-primary' onClick={this.handleEdit}>Edit</button>
                    <button className='button is-danger' >Delete</button>
                </div>}
            </div>
        );
    }
}

Reply.propTypes = {
    userID: PropTypes.number,
    content: PropTypes.string,
    author: PropTypes.object,
    date: PropTypes.string,
    time: PropTypes.string
};

export default Reply;
