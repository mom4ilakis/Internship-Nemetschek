import React from 'react';
import PropTypes from 'prop-types';

class Error extends React.Component {
    getInfo = () => {
        return JSON.stringify(this.props.message);
    };

    render () {
        return (
            <div className='notification is-danger' onClick={this.props.callback}>{this.getInfo()}</div>
        );
    }
}

Error.propTypes = {
    message: PropTypes.object,
    callback: PropTypes.func
}

export default Error;
