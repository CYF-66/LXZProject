/**
 * TradingTerminalRN
 * @author CYF
 * @date 2017-08-25
 */


import React, {Component} from 'react';
import {connect} from 'react-redux';
import CouponPage from '../pages/CouponPage';

class CouponContainer extends Component {
    render() {
        return (
            <CouponPage {...this.props} />
        )
    }
}

export default connect((state) => {
    return { myReducer} = state;
})(CouponContainer);