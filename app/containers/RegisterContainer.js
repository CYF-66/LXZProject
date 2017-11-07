/**
 * TradingTerminalRN
 * @author CYF
 * @date 2017-08-28
 */


import React, {Component} from 'react';
import {connect} from 'react-redux';
import RegisterPage from '../pages/RegisterPage';

class RegisterContainer extends Component {
    render() {
        return (
            <RegisterPage {...this.props} />
        )
    }
}

export default connect((state) => {
    return {registerReducer} = state;
})(RegisterContainer);