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
    isRegisterSuccess:false,
    isGetYZMToken:false,
    getYZMToken:'',
    user:{}
};

let registerReducer = (state = initialState, action) => {
    // alert("获取验证码token="+action.Data);
    switch (action.type) {

        case types.REGISTER:
            return {
                ...state,
                isLoading: true
            };
        case types.REGISTERRECEIVED:
            console.log('======REGISTERRECEIVED===------------>'+action.Data);
            return {
                ...state,
                ...action,
                isLoading: false,
                isRegisterSuccess:true,
                // DataList: action.DataList.length> 0 ? state.DataList.concat(action.DataList) : state.DataList
            };
        case types.GETCHECKNUM:
            return {
                ...state,
            };
        case types.GETCHECKNUMRECEIVED:
            // alert("获取验证码token="+action.Data);
            return {
                ...state,
                ...action,

                // DataList: action.DataList.length> 0 ? state.DataList.concat(action.DataList) : state.DataList
            };
        case types.SENDYZM:
            return {
                ...state,
            };
        case types.SENDYZMRECEIVED:
            // alert("获取短信验证码="+action.Data);
            return {
                ...state,
                ...action,

                // DataList: action.DataList.length> 0 ? state.DataList.concat(action.DataList) : state.DataList
            };
        case types.TOKENERROR://token失效
            return {
                ...state,
                isLoading: false,
            };
        case types.ACTIONERROR://请求错误
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
};

export default registerReducer;