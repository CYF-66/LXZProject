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
    isLoggedIn: false,
    user:{},
    isRreshOrder:true
};

let loginReducer = (state = initialState, action) => {
    // alert("获取验证码token="+action.Data);
    switch (action.type) {
        case types.LOGINURL:
            return {
                ...state,
                isLoading: true
            };
            // return Object.assign({}, state, {
            //     isLoadMore: action.isLoadMore,
            //     isRefreshing: action.isRefreshing,
            //     isLoading: action.isLoading,
            // });
        case types.LOGINURLRECEIVED:
            // return {
            //     ...state,
            //     //articles: action.articles,
            //     articles: action.articles.length > 0 ? state.articles.concat(action.articles) : state.articles,
            //     isLoading: false,
            //     isRefreshing: false,
            // };
            return {
                ...state,
                ...action,
                isLoading: false,
                isLoggedIn:true,
                isRreshOrder:true
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

export default loginReducer;