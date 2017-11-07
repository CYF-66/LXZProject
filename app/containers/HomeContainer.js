/**
 * TradingTerminalRN
 * @author CYF
 * @date 2017-08-13
 */


import React, {Component} from 'react';
import {connect} from 'react-redux';
import HomePage from '../pages/HomePage';

class HomeContainer extends Component {
    render() {
        return (
            <HomePage {...this.props} />
        )
    }
}
export default connect((state) => {
    return { homeReducer} = state;
})(HomeContainer);