/**
 * RenRenDemo
 * @author CYF
 * @date 2017-10-23
 */
import LoginContainer from '../containers/LoginContainer'
import * as types from './actionTypes';
import Util from '../util/utils';
import * as urls from '../util/constants_url';
import Toast from 'react-native-root-toast';
import Storage from '../util/Storage'
export let GetOrderList = (data,isLoading,isRefreshing,isLoadMore) => {

    let url = urls.MYORDER;

    return dispatch => {
        dispatch({type: types.MYORDER,isLoading: isLoading,isRefreshing:isRefreshing,isLoadMore:isLoadMore});
        return Util.post(url, data,
            (Code, Message, Data) => {

            if(Code==1){
                if(Data==''){
                    Toast.show(Message
                        , {position:Toast.positions.CENTER});
                }
                dispatch({type: types.MYORDERRECEIVED, Code: Code, Message: Message, Data: Data});
            }else if(Code==2){//token 失效
                Toast.show("登录验证失败，请重新登录"
                    , {position:Toast.positions.CENTER});
                // this.props.navigator.push({// 活动跳转，以Navigator为容器管理活动页面
                //     name:'LoginContainer',
                //     component: LoginContainer,
                //     // passProps: {contentData}// 传递的参数（可选）,{}里都是键值对  ps: test是关键字
                // });
                dispatch({'type': types.TOKENERROR,Code: Code});
            }else{

            }

            },
            (err) => {
                Toast.show(err
                    , {position:Toast.positions.CENTER});
                console.log('Fetch banner list error: ' + err);
                dispatch({'type': types.ACTIONERROR});
                // alert('Android要用外网地址');
            }
        );
    }

};

export let GetOrderDetail = (data,isLoading,isRefreshing,isLoadMore) => {

    let url = urls.QUERYORDERDETAIL;

    return dispatch => {
        dispatch({type: types.MYORDERDETAIL,isLoading: isLoading,isRefreshing:isRefreshing,isLoadMore:isLoadMore});
        return Util.post(url, data,
            (Code, Message, Data) => {

            if(Code==1){
                Toast.show(Message
                    , {position:Toast.positions.CENTER});
                dispatch({type: types.MYORDERDETAILRECEIVED, Code: Code, Message: Message, Data: Data});
            }else if(Code==2){//token 失效TOKENERROR
                Storage.get("refresh_token").then((value) => {
                    let data;
                    data={'refresh_token':value};
                    console.log('data===------------>'+JSON.stringify(data));
                    // dispatch(_RefreshToken(data));
                });
                Toast.show("登录验证失败，请重新登录"
                    , {position:Toast.positions.CENTER});
                dispatch({'type': types.TOKENERROR});
                // dispatch({type: types.MYORDERDETAILRECEIVED, Code: Code, Message: Message, Data: Data.bills});
            }else{
                Toast.show(Message
                    , {position:Toast.positions.CENTER});
                dispatch({'type': types.ACTIONERROR});
            }

            },
            (err) => {
                Toast.show(err
                    , {position:Toast.positions.CENTER});
                console.log('Fetch banner list error: ' + err);
                dispatch({'type': types.ACTIONERROR});
                // alert('Android要用外网地址');
            }
        );
    }

};

export let TakeOrder = (data,isLoading) => {

    let url = urls.CREATEORDER;

    return dispatch => {
        dispatch({type: types.CREATEORDER,isLoading: isLoading});
        return Util.post(url, data,
            (Code, Message, Data) => {

            if(Code==1){
                Toast.show('成功'
                    , {position:Toast.positions.CENTER});
                dispatch({type: types.CREATEORDERRECEIVED, Code: Code, Message: Message, Data: Data});
            }else if(Code==2){
                Toast.show("登录验证失败，请重新登录"
                    , {position:Toast.positions.CENTER});
            }else{
                Toast.show(Message
                    , {position:Toast.positions.CENTER});
            }

            },
            (err) => {
                Toast.show(err
                    , {position:Toast.positions.CENTER});
                console.log('Fetch banner list error: ' + err);
                dispatch({'type': types.ACTIONERROR});
                // alert('Android要用外网地址');
            }
        );
    }

};

  _RefreshToken = (data) => {

    let url = urls.REFRRSHTOKEN;

    return dispatch => {
        dispatch({type: types.REFRESHTOKEN});
        return Util.post(url, data,
            (Code, Message, Data) => {
                let user={};
            if(Code==1){
                user=Data.custom;
                console.log('=======user===------------>'+JSON.stringify(user));
                Storage.setUser(user);
                Storage.save('token',Data.token);
                Storage.save('isLogin',true);
                Storage.save('refresh_token',Data.refresh_token);

            }else if(Code==2){
                Toast.show("请重新登录"
                    , {position:Toast.positions.CENTER});
                Storage.save('isLogin',false);
            }else{
                Toast.show(Message
                , {position:Toast.positions.CENTER});
            }
                dispatch({type: types.REFRESHTOKENRECEIVED, Code: Code, Message: Message, Data: Data});

            },
            (err) => {
                Toast.show(err
                    , {position:Toast.positions.CENTER});
                console.log('Fetch banner list error: ' + err);
                dispatch({'type': types.ACTIONERROR});
                // alert('Android要用外网地址');
            }
        );
    }

};
