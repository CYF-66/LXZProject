/**
 * TradingTerminalRN
 * @author CYF
 * @date 2017-08-25
 */


import React, {Component} from 'react';
import {connect} from 'react-redux';
import CheckNamePage from '../pages/CheckNamePage';

class CheckNameContainer extends Component {
    render() {
        return (
            <CheckNamePage {...this.props} />
        )
    }
}

export default connect((state) => {
    return { checkReducer} = state;
})(CheckNameContainer);