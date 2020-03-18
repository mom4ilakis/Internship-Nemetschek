import React from 'react';
import api from './api';
import utils from './utils';
import { Link } from 'react-router-dom';
import AuthorDisplay from './AuthorDisplay';

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
                    <Link className='box' key={`post${p.id}`} to={`/posts/${p.id}`}>
                        <div className='content'>
                            <h2 className='title'>{p.title}</h2>
                            <br/>
                            <img src={p.cover}/>
                            <br/>
                            <AuthorDisplay
                                username={p.author.username}
                                avatar={p.author.avatar}/>
                            {utils.formatDate(p.date)}
                        </div>
                    </Link>
                )}
            </React.Fragment>
        );
    }
}

export default PostsPreview;
