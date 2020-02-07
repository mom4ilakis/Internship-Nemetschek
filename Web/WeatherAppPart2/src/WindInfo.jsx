import React from 'react';
import PropTypes from 'prop-types';

class WindInfo extends React.Component {
    calculateCardinalDirection (degrees) {
        const cardinalDirections = ['NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
        let leftEnd = 11.25;
        let rightEnd = 33.75;
        const intrevalLen = rightEnd - leftEnd;
        for (let i = 0; i < cardinalDirections.length; ++i) {
            if (leftEnd <= degrees && degrees <= rightEnd) {
                return cardinalDirections[i];
            }
            leftEnd += intrevalLen;
            rightEnd += intrevalLen;
        }
        return 'N';
    }

    render () {
        return (
            <div>
                {this.props.data.wind.speed &&
                <div> Wind speed is: {this.props.data.wind.speed} m/s <br/></div>}
                {this.props.data.wind.direction &&
                <div>Wind direction is {this.calculateCardinalDirection(this.props.data.wind.direction)}</div>}
                <hr/>
            </div>
        );
    }
}
WindInfo.propTypes = {
    data: PropTypes.object
};
export default WindInfo;
