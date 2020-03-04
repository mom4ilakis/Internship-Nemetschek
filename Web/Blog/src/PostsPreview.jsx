import React from 'react';
import api from './api';
import utils from './utils';

class PostsPreview extends React.Component {
    state = {
        data: []
    }

    componentDidMount () {
        api.get('/posts_preview/')
            .then(({ data }) => {
                this.setState({ data: data });
            })
            .catch(err => console.log(err));
    }

    render () {
        return (
            <React.Fragment>
                {this.state.data.map(p =>
                    <div key='postList' align='left'>
                        <h2>{p.title}</h2>
                        <br/>
                        <img src={p.cover}/>
                        <br/>
                        {p.author.username}
                        <br/>
                        {utils.formatDate(p.date)}
                    </div>
                )}
            </React.Fragment>
        );
    }
}

export default PostsPreview;
