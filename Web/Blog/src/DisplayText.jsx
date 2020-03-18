import React from 'react'
import Edit from './Edit';

class DisplayText extends React.Component {

    state = {
        editing: false,
        firstLoad: false
    }

    componentDidMount () {
        this.setState({ text: this.props.text, editing: false, firstLoad: false })
    }

    handleTyping = (event) => {
        this.setState({text: event.target.value});
    }

    toggleEdit = () => {
        this.setState({ editing: !this.state.editing, firstLoad: true });
    }

    setValue = (newText) => {
        if (newText) {
            this.toggleEdit();
            this.props.callbackOnSuccess({[this.props.type]: newText});
        }
    }

    editView = () => {
        return (
            <Edit
                content={this.props.text}
                callbackOnCancel={this.toggleEdit}
                callbackOnSuccess={this.setValue} />
        );
    }

    displayButtons = () => {
        return (
            <div className='buttons has-addons is-centered are-small'>
                <button className='button is-primary'>Submit</button>
                <button className='button is-info' onClick={this.toggleEdit}>Cancel</button>
            </div>
            );
    }

    displayView = () => {
        return (
            <div >
                <label className='label'>{this.props.name}</label>
                <div className='box' id={this.props.name} onClick={this.toggleEdit}>{this.props.text}</div>
            </div>
        );
    }

    render () {
        return (
            <React.Fragment>
                {this.state.editing? this.editView(): this.displayView()}
            </React.Fragment>
        );
    }

}

export default DisplayText;