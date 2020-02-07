import React from 'react';
import PropTypes from 'prop-types';

class Precipitation extends React.Component {
    render () {
        return (
            <div>
                {this.props.data.snow && <div>Snow : {this.props.data.snow}<br/></div>}
                {this.props.data.rain && <div>Rain: {this.props.data.rain }<br/></div>}
                {(this.props.data.rain || this.props.data.snow) && <hr/>}
            </div>
        );
    }
}

Precipitation.propTypes = {
    data: PropTypes.object
};

export default Precipitation;
