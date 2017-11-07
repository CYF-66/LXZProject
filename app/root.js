/**
 * TradingTerminalRN
 * @author CYF
 * @date 2017-08-13
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store/store';

import App from './app';

export default class Root extends Component {
    render() {
        return (
            <Provider store = {store} >
                <App />
            </Provider>
        )
    }
}