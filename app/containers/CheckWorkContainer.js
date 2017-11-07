/**
 * TradingTerminalRN
 * @author CYF
 * @date 2017-08-25
 */


import React, {Component} from 'react';
import {connect} from 'react-redux';
import CheckWorkPage from '../pages/CheckWorkPage';

class CheckWorkContainer extends Component {
    render() {
        return (
            <CheckWorkPage {...this.props} />
        )
    }
}

export default connect((state) => {
    return { myReducer} = state;
})(CheckWorkContainer);