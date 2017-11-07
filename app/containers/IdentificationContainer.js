/**
 * TradingTerminalRN
 * @author CYF
 * @date 2017-08-25
 */


import React, {Component} from 'react';
import {connect} from 'react-redux';
import IdentificationPage from '../pages/IdentificationPage';

class IdentificationContainer extends Component {
    render() {
        return (
            <IdentificationPage {...this.props} />
        )
    }
}

export default connect((state) => {
    return { myReducer} = state;
})(IdentificationContainer);