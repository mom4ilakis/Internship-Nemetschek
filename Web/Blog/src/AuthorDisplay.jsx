import React from 'react';


class AuthorDisplay extends React.Component {

    render () {
        return (
            <div>
                <img className='image is-48x48' src={this.props.avatar}/>
                {this.props.username}
            </div>
        );
    }
}

export default AuthorDisplay;