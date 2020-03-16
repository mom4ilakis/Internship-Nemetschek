import React from 'react';
import PropTypes from 'prop-types'

class SDC extends React.Component {
    render () {
        return (
            <div className='buttons are-small has-addons is-centered'>
                <button className='button is-primary' onClick={this.props.handleSubmit}>Submit</button>
                <button className='button is-info' onClick={this.props.handleCancel}>Cancel</button>
                <button className='button is-danger' onClick={this.props.handleDelete}>Delete</button>
            </div>
        );
    }
}

SDC.propTypes = {
    handleCancel: PropTypes.func,
    handleDelete: PropTypes.func,
    handleSubmit: PropTypes.func

}

export default SDC;
