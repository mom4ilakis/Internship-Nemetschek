import React from 'react';

class QuickInfo extends React.Component {
    render () {
        return (
            <div>
                <p>Condition: {this.props.data.condition}</p>
                <p>{this.props.data.description}</p>
                <p>Cloud cover is { this.props.data.clouds} %</p>
            </div>
        );
    }
}
QuickInfo.propTypes = {
    data: PropTypes.object
};
export default QuickInfo;
