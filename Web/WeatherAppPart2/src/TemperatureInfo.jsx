import React from 'react';
import PropTypes from 'prop-types';

class TemperatureInfo extends React.Component {
    constructor (props) {
        super(props);
        this.state = { unit: 'C' };
    }

    kelvinToCelsius = tempKelvin => {
        return Math.floor(tempKelvin - 273.15);
    }

    kelvinToFahrenheit = tempKelvin => {
        return Math.floor((tempKelvin - 273.15) * 1.8 + 32);
    }

    handleChangeUnit = event => {
        const newUnit = this.state.unit === 'C' ? 'F' : 'C';
        this.setState({ unit: newUnit });
    }

    unitConversion = measurement => {
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
            <div id='unit' onClick={this.handleChangeUnit}>
                {this.props.data.currentTemp &&
                <div>Current temperature is: {this.unitConversion(this.props.data.currentTemp)} {this.state.unit}<br/></div>}
                {this.props.data.feelsLikeTemperature &&
                <div>Feels like: {this.unitConversion(this.props.data.feelsLikeTemperature)} {this.state.unit} <br/></div>}
                {this.props.data.maxTemp &&
                <div>Max: {this.unitConversion(this.props.data.maxTemp)} {this.state.unit} <br/></div>}
                {this.props.data.minTemp &&
                <div>Min: {this.unitConversion(this.props.data.minTemp)} {this.state.unit}<br/></div>}
                <hr/>
            </div>
        );
    }
}
TemperatureInfo.propTypes = {
    data: PropTypes.object
};
export default TemperatureInfo;
