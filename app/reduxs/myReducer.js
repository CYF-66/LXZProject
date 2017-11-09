/**
 * TradingTerminalRN
 * @author CYF
 * @date 2017-08-25
 */

import * as types from '../actions/actionTypes';
const initialState = {
    Data:[],
    checkData:[],
    isLoading: false,
    isLoadMore: false,
    isRefreshing: false,
    isLoginOut:false,
    isGetUserInfo:false
};

let myReducer = (state = initialState, action) => {
    // alert("获取验证码token="+action.Data);
    switch (action.type) {
        case types.LOGINOUT:
            return {
                ...state,
                isLoading: true
            };
        case types.LOGINOUTRECEIVED:
            return {
                ...state,
                ...action,
                isLoading: false,
                isLoginOut:true,
                Data:action.Data
            };
        case types.CHECKCENTER:
            return {
                ...state,
                checkData:myReducer.checkData,
                isLoading: true
            };
        case types.CHECKCENTERRECEIVED:
            return {
                ...state,
                ...action,
                isLoading: false,
                isLoadMore: false,
                isRefreshing: false,
                checkData:action.Data
            };
        case types.GETUSERINFO:
            return {
                ...state,
                isLoading: true
            };
        case types.GETUSERINFORECEIVED:
            return {
                ...state,
                ...action,
                isLoading: false,
                isGetUserInfo: true,
            };
        case types.TOKENERROR:
            return {
                ...state,
                isLoading: false,
                isLoginOut:false,
            };
        case types.ACTIONERROR:
            return {
                ...state,
                ...action,
                isLoading: false,
                isLoginOut:false,
            };

        default:
            return state;
    }
};

export default myReducer;