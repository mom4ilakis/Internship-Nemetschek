import React from 'react';
import Post from './Post';
import HomePage from './PostsPreview';
import Login from './Login';
import api from './api';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';

class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            user_token: null
        };
    }

    render () {
        return (
            <Router>
                <Link to='/authors/'>Authors</Link>
                <br/>
                <Link to='/'>Home</Link>
                <br/>
                <Link to='/login/'>log in</Link>
                <Switch>
                    <Route exact path='/'><HomePage/></Route>
                    <Route exact path='/authors/'>Authors</Route>
                    <Route exact path='/login/'><Login/></Route>
                    <Route exact path='/posts/:postID/' component={Post}/>
                </Switch>
            </Router>
        );
    }
}

export default App;
