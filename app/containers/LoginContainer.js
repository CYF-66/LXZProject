/**
 * TradingTerminalRN
 * @author CYF
 * @date 2017-08-28
 */


import React, {Component} from 'react';
import {connect} from 'react-redux';
import LoginPage from '../pages/LoginPage';

class LoginContainer extends Component {
    render() {
        return (
            <LoginPage {...this.props} />
        )
    }
}

export default connect((state) => {
    return {loginReducer} = state;
})(LoginContainer);