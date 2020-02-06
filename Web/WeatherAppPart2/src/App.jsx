import React from 'react';

class App extends React.Component {
    constructor (props) {
        super(props);
        this.state.data = null;
    }

    render () {
        return (
            <div>
                <QuickInfo condition='Snow' description='foggy'/>
                <TemperatureInfo maxTemp='10' minTemp='-4' currentTemp='3' feelsLikeTemperature='4' />
                <WindInfo windSpeed='35' windDirection='west' unit='Km/h'/>
                <Precipitation type='Snow' amount='12'/>
            </div>
        );
    }
}
