/**
 * TradingTerminalRN
 * @author CYF
 * @date 2017-08-25
 */


import React, {Component} from 'react';
import {connect} from 'react-redux';
import MessagePage from '../pages/MessagePage';

class MessageContainer extends Component {
    render() {
        return (
            <MessagePage {...this.props} />
        )
    }
}

export default connect((state) => {
    return { homeReducer} = state;
})(MessageContainer);