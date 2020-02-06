import React from 'react';

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
                <p>Wind speed is: {this.props.data.wind.speed}</p>
                <p>Wind direction is {this.calculateCardinalDirection(this.props.data.wind.direction)}</p>
            </div>
        );
    }
}
WindInfo.propTypes = {
    data: PropTypes.object
};
export default WindInfo;
