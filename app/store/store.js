/**
 * TradingTerminalRN
 * @author CYF
 * @date 2017-08-13
 */

'use strict';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reduxs/rootRudcer';

let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
let store = createStoreWithMiddleware(rootReducer);
// let state = store.getState();
// alert(state.Search.searchText);
export default store;