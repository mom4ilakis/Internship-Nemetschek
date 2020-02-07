import React from 'react';
import PropTypes from 'prop-types';

class QuickInfo extends React.PureComponent {
    render () {
        return (
            <div>
                {this.props.data.description && <div>Condition: {this.props.data.description} <br/></div>}
                {this.props.data.clouds && <div>Cloud cover is { this.props.data.clouds} % <br/></div>}
                {this.props.data.humidity && <div>Humidity is {this.props.data.humidity} %<br/></div>}
                <hr/>
            </div>
        );
    }
}
QuickInfo.propTypes = {
    data: PropTypes.object
};
export default QuickInfo;
