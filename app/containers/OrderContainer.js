/**
 * TradingTerminalRN
 * @author CYF
 * @date 2017-08-25
 */


import React, {Component} from 'react';
import {connect} from 'react-redux';
import OrderPage from '../pages/OrderPage';

class OrderContainer extends Component {
    render() {
        return (
            <OrderPage {...this.props} />
        )
    }
}

export default connect((state) => {
    return { orderReducer} = state;
})(OrderContainer);