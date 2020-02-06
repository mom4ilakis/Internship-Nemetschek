import React from 'react';
import api from './api';
import InfoPanel from './InfoPanel';
import { formatData } from './utils.js';

class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            searched: false,
            data: { wind: {}, precipation: {} }
        };
    }

    componentDidMount () {

    }

    loadData = (location = 'Sofia') => {
        api.get(location)
            .then(res => this.setState({ data: formatData(res) }))
            .catch(err => console.error(err));
    }

    handleSearchForLocation = event => {
        if (event.which === 13) {
            this.loadData(event.target.value);
            this.setState({ searched: true });
        }
    }

    info () {
        if (this.state.data === null) {
            return <p/>;
        } else {
            return <InfoPanel data={this.state.data}/>;
        }
    }

    render () {
        return (
            <div>
                <input type='text' id='location' onKeyPress={this.handleSearchForLocation}/>
                {
                    this.state.searched &&
                    <InfoPanel data={this.state.data}/>
                }
            </div>
        );
    }
}

export default App;
