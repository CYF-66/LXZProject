/**
 * TradingTerminalRN
 * @author CYF
 * @date 2017-08-25
 */

import * as types from '../actions/actionTypes';
const initialState = {
    Data:'',
    isLoading: false,
    isLoadMore: false,
    isRefreshing: false,
    isCheckName:false,
    isCheckPhone:false,
    isCheckWork:false,
    isCheckSchool:false,
    isCheckContact:false,
};

let checkReducer = (state = initialState, action) => {
    // alert("获取验证码token="+action.Data);
    switch (action.type) {
        case types.CHECKNAME:
            return {
                ...state,
                isLoading: true
            };
        case types.CHECKNAMERECEIVED:
            return {
                ...state,
                ...action,
                isLoading: false,
                isCheckName:true,
            };
        case types.CHECKPHONE:
            return {
                ...state,
                isLoading: true
            };
        case types.CHECKPHONERECEIVED:
            return {
                ...state,
                ...action,
                isLoading: false,
                isCheckPhone:true,
            };
        case types.CHECKSCHOOL:
            return {
                ...state,
                isLoading: true
            };
        case types.CHECKSCHOOLRECEIVED:
            return {
                ...state,
                ...action,
                isLoading: false,
                isCheckSchool:true,
            };
        case types.CHECKWORK:
            return {
                ...state,
                isLoading: true
            };
        case types.CHECKWORKRECEIVED:
            return {
                ...state,
                ...action,
                isLoading: false,
                isCheckWork:true,
            };
        case types.CHECKCONTACT:
            return {
                ...state,
                isLoading: true
            };
        case types.CHECKCONTACTRECEIVED:
            return {
                ...state,
                ...action,
                isLoading: false,
                isCheckContact:true,
            };
        case types.TOKENERROR:
            return {
                ...state,
                isLoading: false,
            };
        case types.ACTIONERROR:
            return {
                ...state,
                isLoading: false,
            };

        default:
            return state;
    }
};

export default checkReducer;