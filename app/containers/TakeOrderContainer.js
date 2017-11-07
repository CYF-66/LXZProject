/**
 * TradingTerminalRN
 * @author CYF
 * @date 2017-08-13
 */


import React, {Component} from 'react';
import {connect} from 'react-redux';
import TakeOrderPage from '../pages/TakeOrderPage';

class TakeOrderContainer extends Component {
    render() {
        return (
            <TakeOrderPage {...this.props} />
        )
    }
}
export default connect((state) => {
    return { homeReducer} = state;
})(TakeOrderContainer);