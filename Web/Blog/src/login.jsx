import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

import api from './api';

class Login extends React.Component {
    state = {
        token: null,
        username: null,
        pass: null
    };

    handleLogin = () => {
        api.login(this.state.username, this.state.pass)
            .then(({ data }) => {
                this.props.callback(data);
                window.localStorage.setItem('token', data.token);
                window.localStorage.setItem('userID', data.userID);
                window.localStorage.setItem('isAuthor', data.isAuthor);
                this.props.history.push('/');
            })
            .catch(err => console.log(err));
    }

    handleInputChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render () {
        return (
            <div className='box'>
                <label className='label'>Username</label>
                <input type='text' name='username' onChange={this.handleInputChange}/>
                <label className='label'>Password:</label>
                <input type='password' name='pass' onChange={this.handleInputChange}/>
                <div className='buttons'>
                    <button className='button is-primary' onClick={this.handleLogin}>Login</button>
                    <Link className='button is-info' to='/'>Cancel</Link>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    callback: PropTypes.func
};
export default withRouter(Login);
