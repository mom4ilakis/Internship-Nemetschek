import React from 'react';

import Error from './Error';
import SDC from './SDC'

class Edit extends React.Component {
    state = {
        content: this.props.content
    }

    componentDidMount () {
        document.getElementById('content').value = this.state.content
    }

    handleTyping = (event) => {
        this.setState({ content: event.target.value });
    }

    handleSubmit = (event) => {
        this.props.callbackOnSuccess(this.state.content);
    }

    handleCancel = (event) => {
        this.props.callbackOnCancel();
    }

    handleDelete = (event) => {
        this.props.handleDelete();
    }

    render () {
        return (
            <React.Fragment>
                <label className='label'>{this.props.name}</label>
                <input id='content'className='input' type='text' maxLength='160' onChange={this.handleTyping}/>
               <SDC 
                    handleSubmit={this.handleSubmit}
                    handleCancel={this.handleCancel}
                    handleDelete={this.handleDelete}/>
            </React.Fragment>
        );
    }

}

export default Edit;