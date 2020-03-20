import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import api from './api';
import DisplayText from './DisplayText';

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

    handleSubmit = (data) => {
        api.patch(`/authors/${this.props.authorID}/`,
                data
                ).then(() => {
            this.setState(data);
        }).catch(err => console.log(err));
    }

    handleCancel = () => {
        this.toggleEdinting();
    }

    display = () => {
        return (
            <React.Fragment>
                <div className='box'>
                    <img className='image is-128x128' src={this.state.avatar}/>
                    <DisplayText type='username' name='username' text={this.state.username} callbackOnSuccess={this.handleSubmit}/>
                    <DisplayText type='eamil' name='email' text={this.state.email} callbackOnSuccess={this.handleSubmit}/>
                    <DisplayText type='first_name' name='first name' text={this.state.first_name} callbackOnSuccess={this.handleSubmit}/>
                    <DisplayText type='last_name' name='last name' text={this.state.last_name} callbackOnSuccess={this.handleSubmit}/>
                </div>
            </React.Fragment>
        );
    }

    render () {
        return (
            this.display()
        );
    }
}
Author.propTypes = {
    authorID: PropTypes.number,
    history: PropTypes.object
};
export default withRouter(Author);
