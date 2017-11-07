/**
 * TradingTerminalRN
 * @author CYF
 * @date 2017-08-25
 */


import React, {Component} from 'react';
import {connect} from 'react-redux';
import CheckPhonePage from '../pages/CheckPhonePage';

class CheckPhoneContainer extends Component {
    render() {
        return (
            <CheckPhonePage {...this.props} />
        )
    }
}

export default connect((state) => {
    return { checkReducer} = state;
})(CheckPhoneContainer);