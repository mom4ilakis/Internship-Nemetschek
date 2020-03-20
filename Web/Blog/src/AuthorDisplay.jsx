import React from 'react';


class AuthorDisplay extends React.Component {

    render () {
        return (
            <div className='media'>
                <div className='media-left'>
                    <img className='image is-rounded is-32x32' src={this.props.avatar}/>
                </div>
                   <b>{this.props.username}</b>
            </div>
        );
    }
}

export default AuthorDisplay;