/**
 * TradingTerminalRN
 * @author CYF
 * @date 2016-08-13
 */

/**
 * 根redux
 */
import { combineReducers } from 'redux';
import homeReducer from './homeReducer';
import orderReducer from './orderReducer';
import myReducer from './myReducer';
import loginReducer from './loginReducer';
import registerReducer from './registerReducer';
import checkReducer from './checkReducer';

export default rootReducer = combineReducers({
    homeReducer,
    orderReducer,
    myReducer,
    loginReducer,
    registerReducer,
    checkReducer
})