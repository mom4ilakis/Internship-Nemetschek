import React from 'react';
import PropTypes from 'prop-types';

class Precipitation extends React.Component {
    render () {
        const precipitationEvent = { amount: this.props.data.snow, type: 'Snow' } ||
                                 { amount: this.props.data.rain, type: 'Rain' } ||
                                 { amount: 0, type: 'Not raining/snowing' };

        return (
            <div>
                <p>Humidity is {this.props.data.humidity} %</p>
                <p>{precipitationEvent.type}: {precipitationEvent.amount}</p>
            </div>
        );
    }
}

Precipitation.propTypes = {
    data: PropTypes.object
};

export default Precipitation;
