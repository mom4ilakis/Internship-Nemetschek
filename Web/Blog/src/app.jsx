import React from 'react';
import Post from './Post';
import HomePage from './PostsPreview';
import Login from './Login';
import CreatePost from './CreatePost';

import api from './api';

import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';

class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            logged: false,
            isAuthor: false
        };
    }

    userLoggedIn = (isAuthor) => {
        this.setState({ logged: true, isAuthor: isAuthor });
    }

    userLoggedOut = () => {
        this.setState({ logged: false });
    }

    render () {
        return (
            <Router>
                {this.state.isAuthor && <Link to='/create-post/'>New Post</Link>}
                <br/>
                <Link to='/authors/'>Authors</Link>
                <br/>
                <Link to='/'>Home</Link>
                <br/>
                <Link to='/login/'>log in</Link>
                <Switch>
                    <Route exact path='/create-post/'><CreatePost isAuthor={this.state.isAuthor}/></Route>
                    <Route exact path='/'><HomePage/></Route>
                    <Route exact path='/authors/'>Authors</Route>
                    <Route exact path='/login/'><Login callback={this.userLoggedIn}/></Route>
                    <Route exact path='/posts/:postID/' render={ (routeProps) => <Post {...routeProps} logged={this.state.logged}/>}/>
                </Switch>
            </Router>
        );
    }
}

export default App;
