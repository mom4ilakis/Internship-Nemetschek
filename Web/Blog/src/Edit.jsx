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
        console.log(this.state.content);
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
                    handleSubmit={ this.props.callbackOnSuccess && this.handleSubmit}
                    handleCancel={this.props.callbackOnCancel && this.handleCancel}
                    handleDelete={this.props.handleDelete && this.handleDelete}/>
            </React.Fragment>
        );
    }

}

export default Edit;