import React from 'react';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';

import Post from './Post';
import HomePage from './PostsPreview';
import Login from './Login';
import CreatePost from './CreatePost';
import Author from './Author';
import api from './api';

class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            logged: false,
            isAuthor: false,
            userID: null
        };
    }

    componentDidMount () {
        const isAuthor = window.localStorage.getItem('isAuthor');
        const userID = window.localStorage.getItem('userID');
        api.loadTokenLocalStorage();
        if (userID) {
            this.setState({ logged: true, isAuthor: Boolean(isAuthor), userID: Number(userID) });
        }
    }

    userLoggedIn = ({ isAuthor, userID }) => {
        this.setState({ logged: true, isAuthor: isAuthor, userID: userID });
    }

    handleUserLoggedOut = () => {
        this.setState({ logged: false, isAuthor: false, userID: null });
        window.localStorage.removeItem('userID');
        window.localStorage.removeItem('isAuthor');
        window.localStorage.removeItem('token');
        api.logout();
    }

    render () {
        return (
            <Router>
                <div className='buttons has-addons is-centered'>
                    {this.state.isAuthor && <Link className='button is-primary' to='/create-post/'>New Post</Link>}
                    <Link className='button is-info' to='/'>Home</Link>
                    {!this.state.logged && <Link className='button is-primary' to='/login/'>Log in</Link>}
                    {this.state.logged && <Link className='button is-info' to='/author/'>Profile</Link>}
                    {this.state.logged && <Link className='button is-danger' onClick={this.handleUserLoggedOut} to='/'>Log out</Link>}

                </div>
                <Switch>
                    <Route exact path='/'><HomePage/></Route>
                    <Route exact path='/author/' render={ (routeProps) => <Author {...routeProps} authorID={this.state.userID}/>}/>
                    <Route exact path='/create-post/'><CreatePost isAuthor={this.state.isAuthor}/></Route>
                    <Route exact path='/login/'><Login callback={this.userLoggedIn}/></Route>
                    <Route exact path='/posts/:postID/' render={ (routeProps) => <Post {...routeProps} logged={this.state.logged} userID={this.state.userID}/>}/>
                    <Route exact path='/edit_post/' component={CreatePost}/>
                </Switch>
            </Router>
        );
    }
}

export default App;
