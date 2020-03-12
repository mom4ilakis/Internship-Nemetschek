import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import api from './api';

class Author extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            avatar: null,
            first_name: null,
            last_name: null,
            username: null,
            email: null,
            editing: false
        };
    }

    componentDidMount () {
        api.get(`/authors/${this.props.authorID}/`).then(({ data }) => {
            this.setState({
                avatar: data.avatar,
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                username: data.username
            });
        })
            .catch(err => {
                this.props.history.push('/');
                console.log(err);});
    }

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    }

    toggleEdinting = () => {
        this.setState({ editing: !this.state.editing });
    }

    handleSubmit = () => {
        api.patch(`/authors/${this.props.authorID}/`,
            {
                avatar: this.state.avatar,
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email
            }).then(() => {
            this.toggleEdinting();
        }).catch(err => console.log(err));
    }

    handleCancel = () => {
        this.toggleEdinting();
    }

    editAuthor = () => {
        return (
            <React.Fragment>
                <div className='box'>
                    <label className='label'>New avatar</label>
                    <input id='avatar' type='text' className='input' onChange={this.handleChange}/>

                    <label className='label'>New mail</label>
                    <input id='email' type='text' className='input' onChange={this.handleChange}/>

                    <label className='label'>New first name</label>
                    <input id='first_name' type='text' className='input' onChange={this.handleChange}/>

                    <label className='label'>New last name</label>
                    <input id='last_name' type='text' className='input' onChange={this.handleChange}/>

                    <div className='buttons is-centered'>
                        <button className='button is-primary' onClick={this.handleSubmit}>Submit</button>
                        <button className='button is-info' onClick={this.handleSubmit}>Cancel</button>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    display = () => {
        return (
            <React.Fragment>
                <div className='box'>
                    <div className='content'>
                        <img className='image is-128x128' src={this.state.avatar}/>
                        <label className='label is-small'>Username:</label>
                        <div id='username' className='box'>{this.state.username}</div>
                        <label className='label is-small'>Email:</label>
                        <div id='email' className='box'>{this.state.email}</div>
                        <label className='label is-small'>First name:</label>
                        <div id='first_name' className='box'>{this.state.first_name}</div>
                        <label className='label is-small'>Last name:</label>
                        <div id='last_name' className='box'>{this.state.last_name}</div>
                    </div>
                    <div className='buttons has-addons is-centered'>
                        <button className="button is-primary" onClick={this.toggleEdinting}>Edit</button>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    render () {
        return (
            (this.state.editing && this.editAuthor()) || this.display()
        );
    }
}
Author.propTypes = {
    authorID: PropTypes.number,
    history: PropTypes.object
};
export default withRouter(Author);
