import React from 'react';
import PropTypes from 'prop-types';

import api from './api';

class Login extends React.Component {
    state = {
        token: null,
        username: null,
        pass: null
    };

    handleLogin = () => {
        console.log(this.state);
        api.login(this.state.username, this.state.pass)
            .then(({ data }) => {
                if (data) {
                    window.localStorage.setItem('token', data.token);
                    this.props.callback();
                }
            })
            .catch(err => console.log(err));
    }

    handleInputChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render () {
        return (
            <div>
                Username:
                <input type='text' name='username' onChange={this.handleInputChange}/>
                Password:
                <input type='password' name='pass' onChange={this.handleInputChange}/>
                <button onClick={this.handleLogin}>Login</button>
            </div>
        );
    }
}

Login.propTypes = {
    callback: PropTypes.func
};
export default Login;
