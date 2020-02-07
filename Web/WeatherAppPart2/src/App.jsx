import React from 'react';
import api from './api';
import InfoPanel from './InfoPanel';
import { formatData } from './utils.js';

// one minute is 60000 ms
const interval = 300000;

class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            location: 'Sofia',
            data: { wind: {}, precipation: {} }
        };
    }

    componentDidMount () {
        this.loadData();
        this.timerID = setInterval(this.loadData, interval);
    }

    componentWillUnmount () {
        this.timerID && clearInterval(this.timerID);
    }

    loadData = () => {
        api.get(this.state.location)
            .then(res => this.setState({ data: formatData(res) }))
            .catch(err => console.error(err));
    }

    handleSearchForLocation = event => {
        if (event.which === 13) {
            this.setState({ location: event.target.value }, this.loadData);
        }
    }

    render () {
        return (
            <div>
                <input type='text' onKeyPress={this.handleSearchForLocation} defaultValue={this.state.location}/>
                <hr/>
                <InfoPanel data={this.state.data}/>
            </div>
        );
    }
}

export default App;
