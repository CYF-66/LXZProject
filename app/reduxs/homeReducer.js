/**
 * TradingTerminalRN
 * @author CYF
 * @date 2017-08-13
 */

import * as types from '../actions/actionTypes';
const initialState = {
    Data:[],
    msgData:[],
    isLoading: false,
    isLoadMore: false,
    isRefreshing: false,
    isSuccess:false,
};

let homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GETHOMEINFO://获取首页数据
            return {
                ...state,
                isLoading: true,
                isLoadMore: action.isLoadMore,
                isRefreshing: action.isRefreshing,
            };
        case types.GETHOMEINFORECEIVED:
            // alert('homereducer===');
            return {
                ...state,
                isLoading: false,
                Data: action.Data,
                isLoadMore: false,
                isRefreshing: false,
                isSuccess:true,
                // DataList: action.DataList.length> 0 ? state.DataList.concat(action.DataList) : state.DataList
            };
        case types.GETMESSAGE://消息
            return {
                ...state,
                isLoading: true,
                isLoadMore: action.isLoadMore,
                isRefreshing: action.isRefreshing,
            };
        case types.GETMESSAGERECEIVED:
            // alert('homereducer===');
            return {
                ...state,
                isLoading: false,
                msgData: action.Data,
                isLoadMore: false,
                isRefreshing: false,
                // DataList: action.DataList.length> 0 ? state.DataList.concat(action.DataList) : state.DataList
            };
        case types.TOKENERROR://token失效
            return {
                ...state,
                isLoading: false,
                isSuccess:false,
            };
        case types.ACTIONERROR://请求错误
            return {
                ...state,
                isLoading: false,
                isSuccess:false,
            };
        default:
            return state;
    }
};

export default homeReducer;