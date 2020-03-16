import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Comments from './Comments';
import api from './api';
import utils from './utils';
import EditPost from './EditPost';

class Post extends React.Component {
    state = {
        author: {},
        title: null,
        content: null,
        date: null,
        editable: false
    }

    loadData = (passedData) => {
        const postID = this.props.match.params.postID;
        console.log(`passed data is ${passedData}`);
        if (!passedData) {
            api.get(`/posts/${postID}/`)
                .then(({ data }) => {
                    this.setState({
                        author: data.author,
                        title: data.title,
                        content: data.content,
                        cover: data.cover,
                        date: data.date
                    });
                })
                .catch(err => console.log(err));
        } else {
            this.setState({
                title: passedData.title,
                content: passedData.content,
                cover: passedData.cover
            });
        }
    }

    componentDidMount () {
        this.loadData();
    }

    handleDeletePost = () => {
        const postID = this.props.match.params.postID;
        api.delete(`/posts/${postID}/`).then(() => {
            this.props.history.push('/');
        });
    }

    toggleEditing = (newData) => {
        this.loadData(newData);
        this.setState({ editable: !this.state.editable });
    }

    handleClick = () => {
        this.setState({ editable: true });
    }

    render () {
        return (
            <React.Fragment>
                {(this.state.editable &&
                <EditPost
                    title={this.state.title}
                    content={this.state.content}
                    cover={this.state.cover}
                    callback={this.toggleEditing}
                />) ||
                    <div className='box'>
                        <div className='content is-large'>
                            <h3>{this.state.title}</h3>
                            <img src={this.state.cover}/>
                            <p>{this.state.content}</p>
                            <div className='content is-small'>
                                {this.state.author.username}
                                <br/>
                                {utils.formatDate(this.state.date)}
                                <br/>
                                {utils.formatTime(this.state.date)}
                            </div>
                        </div>
                        <div className='buttons has-addons are-small'>
                            {this.state.author.id === this.props.userID && <button className='button is-dark' to='/edit_post/' onClick={this.handleClick}>Edit</button>}
                        </div>
                        <Comments postID={this.props.match.params.postID} logged={this.props.logged} userID={this.props.userID}/>
                        <br/>
                    </div>
                }
            </React.Fragment>

        );
    }
};

Post.propTypes = {
    match: PropTypes.object,
    logged: PropTypes.bool,
    userID: PropTypes.number
};
export default Post;
