import React from 'react';
import PropTypes from 'prop-types';

class TemperatureInfo extends React.Component {
    constructor (props) {
        super(props);
        this.state = { unit: 'C' };
    }

    kelvinToCelsius = (tempKelvin) => {
        return Math.floor(tempKelvin - 273.15);
    }

    kelvinToFahrenheit = (tempKelvin) => {
        return Math.floor((tempKelvin - 273.15) * 1.8 + 32);
    }

    handleChangeUnit = (event) => {
        const newUnit = this.state.unit === 'C' ? 'F' : 'C';
        this.setState({ unit: newUnit });
        console.log(this.state.unit);
        event.value = this.state.unit;
    }

    unitConversion = (measurement) => {
        if (this.state.unit === 'C') {
            return this.kelvinToCelsius(measurement);
        }
        if (this.state.unit === 'F') {
            return this.kelvinToFahrenheit(measurement);
        }
        return measurement;
    }

    render () {
        return (
            <div>
                <h5 id='unit' onClick={this.handleChangeUnit} clickable>{this.state.unit}</h5>
                <p>Current temperature is: {this.unitConversion(this.props.data.currentTemp)} {this.state.unit}</p>
                <p>Feels like: {this.unitConversion(this.props.data.feelsLikeTemperature)} {this.state.unit} </p>
                <p>Max: {this.unitConversion(this.props.data.maxTemp)} {this.state.unit} </p>
                <p>min: {this.unitConversion(this.props.data.minTemp)} {this.state.unit} </p>
            </div>
        );
    }
}
TemperatureInfo.propTypes = {
    data: PropTypes.object
};
export default TemperatureInfo;
