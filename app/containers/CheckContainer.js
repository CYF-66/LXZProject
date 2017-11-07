/**
 * TradingTerminalRN
 * @author CYF
 * @date 2017-08-25
 */


import React, {Component} from 'react';
import {connect} from 'react-redux';
import CheckPage from '../pages/CheckPage';

class CheckContainer extends Component {
    render() {
        return (
            <CheckPage {...this.props} />
        )
    }
}

export default connect((state) => {
    return { myReducer} = state;
})(CheckContainer);