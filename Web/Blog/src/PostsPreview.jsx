import React from 'react';
import api from './api';
import utils from './utils';
import { Link, Router, Route, Switch } from 'react-router-dom';
import Post from './Post';

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
                    <div key={`post${p.id}`} align='left'>
                        <Link to={`/posts/${p.id}`}>
                            <h2>{p.title}</h2>
                        </Link>
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
