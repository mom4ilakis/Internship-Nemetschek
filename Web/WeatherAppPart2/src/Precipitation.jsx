import React from 'react';
import PropTypes from 'prop-types';

class Precipitation extends React.Component {
    render () {
        return (
            <div>
                <p>Humidity is {this.props.data.humidity || 0} %</p>
                <p>Rain: {this.props.data.rain || 'None'} </p>
                <p>Snow: {this.props.data.snow || 'None'}</p>
            </div>
        );
    }
}

Precipitation.propTypes = {
    data: PropTypes.object
};

export default Precipitation;
