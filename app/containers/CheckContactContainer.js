/**
 * TradingTerminalRN
 * @author CYF
 * @date 2017-08-25
 */


import React, {Component} from 'react';
import {connect} from 'react-redux';
import CheckContactPage from '../pages/CheckContactPage';

class CheckContactContainer extends Component {
    render() {
        return (
            <CheckContactPage {...this.props} />
        )
    }
}

export default connect((state) => {
    return { checkReducer} = state;
})(CheckContactContainer);