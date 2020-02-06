import React from 'react';
import TemperatureInfo from './TemperatureInfo';
import QuickInfo from './QuckInfo';
import WindInfo from './WindInfo';
import Precpitation from './Precipitation';

class InfoPanel extends React.Component {
    render () {
        return (
            <div>
                <TemperatureInfo/>
                <QuickInfo/>;
                <WindInfo/>;
                <Precpitation/>
            </div>
        );
    }
}
export default InfoPanel;
