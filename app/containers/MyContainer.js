/**
 * TradingTerminalRN
 * @author CYF
 * @date 2017-08-25
 */


import React, {Component} from 'react';
import {connect} from 'react-redux';
import MyPage from '../pages/MyPage';

class MyContainer extends Component {
    render() {
        return (
            <MyPage {...this.props} />
        )
    }
}

export default connect((state) => {
    return { myReducer} = state;
})(MyContainer);