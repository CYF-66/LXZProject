/**
 * RenRenDemo
 * @author CYF
 * @date 2017-10-23
 */


import * as types from './actionTypes';
import Util from '../util/utils';
import * as urls from '../util/constants_url';
import Toast from 'react-native-root-toast';
import Storage from '../util/Storage'
export let GetHomeInfo = (data,isLoading) => {

    let url = urls.HOMEINFO;

    return dispatch => {
        dispatch({type: types.GETHOMEINFO,isLoading: isLoading});
        return Util.post(url, data,
            (Code, Message, Data) => {

            if(Code==1){
                Toast.show('成功'
                    , {position:Toast.positions.CENTER});
                dispatch({type: types.GETHOMEINFORECEIVED, Code: Code, Message: Message, Data: Data});
            }else if(Code==2){
                Storage.get("refresh_token").then((value) => {
                    let data;
                    data={'refresh_token':value};
                    console.log('data===------------>'+JSON.stringify(data));
                    // dispatch(_RefreshToken(data));
                });
                Toast.show("登录验证失败，请重新登录"
                    , {position:Toast.positions.CENTER});
                dispatch({'type': types.TOKENERROR});
            }else{
                Toast.show(Message
                    , {position:Toast.positions.CENTER});
                dispatch({'type': types.ACTIONERROR});
            }


            },
            (error) => {
                // console.log('Fetch banner list error: ' + error);
                dispatch({'type': types.ACTIONERROR});
                // alert('Android要用外网地址');
            }
        );
    }

};

export let GetMessage = (data,isLoading,isRefreshing,isLoadMore) => {

    let url = urls.MESSAGE;

    return dispatch => {
        dispatch({type: types.GETMESSAGE,isLoading: isLoading,isRefreshing:isRefreshing,isLoadMore:isLoadMore});
        return Util.post(url, data,
            (Code, Message, Data) => {
            if(Code==1){
                Toast.show(Message
                    , {position:Toast.positions.CENTER});
                dispatch({type: types.GETMESSAGERECEIVED, Code: Code, Message: Message, Data: Data});
            }else if(Code==2){
                Storage.get("refresh_token").then((value) => {
                    let data;
                    data={'refresh_token':value};
                    console.log('data===------------>'+JSON.stringify(data));
                    // dispatch(_RefreshToken(data));
                });

                Toast.show("登录验证失败，请重新登录"
                    , {position:Toast.positions.CENTER});
                dispatch({'type': types.TOKENERROR});
            }else{
                Toast.show(Message
                    , {position:Toast.positions.CENTER});
                dispatch({'type': types.ACTIONERROR});
            }


            },
            (error) => {
                // console.log('Fetch banner list error: ' + error);
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
                Toast.show(Message
                    , {position:Toast.positions.CENTER});
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
                console.log('Fetch banner list error: ' + err);
                dispatch({'type': types.ACTIONERROR});
                // alert('Android要用外网地址');
            }
        );
    }

};


