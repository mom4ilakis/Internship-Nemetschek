import React from 'react';

class TemperatureInfo extends React.Component {
    render () {
        return (
            <div>
                <p>Current temperature is: {this.props.data.currentTemp}</p>
                <p>Feels like: {this.props.data.feelsLikeTemperature} </p>
                <p>Max: {this.props.data.maxTemp} </p>
                <p>min: {this.props.data.minTemp} </p>
            </div>
        );
    }
}
TemperatureInfo.propTypes = {
    data: PropTypes.object
};
export default TemperatureInfo;
