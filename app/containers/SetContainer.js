/**
 * TradingTerminalRN
 * @author CYF
 * @date 2017-08-25
 */


import React, {Component} from 'react';
import {connect} from 'react-redux';
import SetPage from '../pages/SetPage';

class SetContainer extends Component {
    render() {
        return (
            <SetPage {...this.props} />
        )
    }
}

export default connect((state) => {
    return { myReducer} = state;
})(SetContainer);