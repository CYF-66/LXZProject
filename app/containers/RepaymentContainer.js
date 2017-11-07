/**
 * TradingTerminalRN
 * @author CYF
 * @date 2017-08-25
 */


import React, {Component} from 'react';
import {connect} from 'react-redux';
import RepaymentPage from '../pages/RepaymentPage';

class RepaymentContainer extends Component {
    render() {
        return (
            <RepaymentPage {...this.props} />
        )
    }
}

export default connect((state) => {
    return { orderReducer} = state;
})(RepaymentContainer);