/**
 * TradingTerminalRN
 * @author CYF
 * @date 2017-08-25
 */

import * as types from '../actions/actionTypes';
const initialState = {
    takeOrderData:[],
    code:'',
    orderData:[],
    orderDetailsData:[],
    isLoading: false,
    isLoadMore: false,
    isRefreshing: false,
    isTakeOrderSuccess:false,
};

let orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.MYORDER:
            return Object.assign({}, state, {
                isLoadMore: action.isLoadMore,
                isRefreshing: action.isRefreshing,
                isLoading: action.isLoading,
            });
        case types.MYORDERRECEIVED:
            return {
                ...state,
                isLoading: false,
                orderData: action.Data,
                isLoadMore: false,
                isRefreshing: false,
                // DataList: action.DataList.length> 0 ? state.DataList.concat(action.DataList) : state.DataList
            };
        case types.MYORDERDETAIL:
            return Object.assign({}, state, {
                isLoadMore: action.isLoadMore,
                isRefreshing: action.isRefreshing,
                isLoading: action.isLoading,
            });
        case types.MYORDERDETAILRECEIVED:
            return {
                ...state,
                isLoading: false,
                orderDetailsData: action.Data,
                isLoadMore: false,
                isRefreshing: false,
                // DataList: action.DataList.length> 0 ? state.DataList.concat(action.DataList) : state.DataList
            };
        case types.CREATEORDER:
            return Object.assign({}, state, {
                isLoading: true,
            });
        case types.CREATEORDERRECEIVED:
            return {
                ...state,
                isLoading: false,
                takeOrderData: action.Data,
                isTakeOrderSuccess:true,
                // DataList: action.DataList.length> 0 ? state.DataList.concat(action.DataList) : state.DataList
            };
        case types.TOKENERROR:
            return {
                ...state,
                isLoading: false,
                isTakeOrderSuccess:false,
                isLoadMore: false,
                isRefreshing: false,
                code: action.Code,
            };
        case types.ACTIONERROR:
            return {
                ...state,
                isLoading: false,
                isRefreshing: false,
                isLoadMore: false,
                isTakeOrderSuccess:false,
            };
        default:
            return state;
    }
};

export default orderReducer;