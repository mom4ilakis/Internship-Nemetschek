import React from 'react';

class CreatePost extends React.Component {
    render () {
        return (
            <React.Fragment>
                Title:
                <input type='text' id='title'/>
                Content:
                <input type='textarea' id='content'/>
                Cover:
                <input type='textarea' id='cover'/>
                <button>Post</button>
                <button>Cancel</button>
            </React.Fragment>
        );
    }
}

export default CreatePost;
