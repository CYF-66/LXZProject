/**
 * TradingTerminalRN
 * @author CYF
 * @date 2017-08-25
 */


import React, {Component} from 'react';
import {connect} from 'react-redux';
import CheckSchoolPage from '../pages/CheckSchoolPage';

class CheckSchoolContainer extends Component {
    render() {
        return (
            <CheckSchoolPage {...this.props} />
        )
    }
}

export default connect((state) => {
    return { myReducer} = state;
})(CheckSchoolContainer);