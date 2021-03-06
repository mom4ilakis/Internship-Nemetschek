import React from 'react';
import PropTypes from 'prop-types';
import TemperatureInfo from './TemperatureInfo';
import QuickInfo from './QuckInfo';
import WindInfo from './WindInfo';
import Precpitation from './Precipitation';

class InfoPanel extends React.Component {
    render () {
        return (
            <React.Fragment>
                <br/>The weather in <b>{this.props.data.location}</b> is: <br/>
                <hr/>
                <QuickInfo data={this.props.data}/>
                <TemperatureInfo data={this.props.data}/>
                <WindInfo data={this.props.data}/>
                <Precpitation data={this.props.data}/>
            </React.Fragment>
        );
    }
}
InfoPanel.propTypes = {
    data: PropTypes.object
};
export default InfoPanel;
