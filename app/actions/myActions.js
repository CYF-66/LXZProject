/**
 * RenRenDemo
 * @author CYF
 * @date 2017-10-23
 */

import * as types from './actionTypes';
import Util from '../util/utils';
import * as urls from '../util/constants_url';
import Storage from '../util/Storage'
import Toast from 'react-native-root-toast';

/**登录 */
export let HttpLogin = (data,isLoading) => {

    let url = urls.LOGINURL;

    return dispatch => {
        dispatch({type: types.LOGINURL,isLoading: isLoading});
        return Util.post(url, data,
            (Code, Message, Data) => {
                let user={};
                if(Code==1){
                    Toast.show('成功'
                        , {position:Toast.positions.CENTER});
                    user=Data.custom;
                    Storage.setUser(user);
                    Storage.save('token',Data.token);
                    Storage.save('isLogin',true);
                    Storage.save('refresh_token',Data.refresh_token);
                    Storage.save('username',user.name);
                    Storage.save('userphone',user.phone);
                    if(user.isrealauth=='1'||user.isrealauth=='4'){
                        Storage.save('name',true);
                    }else{
                        Storage.save('name',false);
                    }
                    Storage.save('isrealauthnm',user.isrealauthnm);
                    Storage.save('isphoneauthnm',user.isphoneauthnm);
                    Storage.save('iseducauthnm',user.iseducauthnm);
                    Storage.save('islinkauthnm',user.islinkauthnm);
                    Storage.save('isworkauthnm',user.isworkauthnm);
                    if(user.iseducauth=='1'||user.iseducauth=='4'){
                        Storage.save('school',true);
                    }else{
                        Storage.save('school',false);
                    }
                    if(user.isworkauth=='1'||user.isworkauth=='4'){
                        Storage.save('work',true);
                    }else{
                        Storage.save('work',false);
                    }
                    if(user.isphoneauth=='1'||user.isphoneauth=='4'){
                        Storage.save('phone',true);
                    }else{
                        Storage.save('phone',false);
                    }
                    if(user.islinkauth=='1'||user.islinkauth=='4'){
                        Storage.save('contact',true);
                    }else{
                        Storage.save('contact',false);
                    }
                    console.log('=======user.name===------------>'+user.name);
                    dispatch({type: types.LOGINURLRECEIVED, Code : Code, Message: Message, Data: Data.custom});
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

/**退出登录 */
export let LoginOut = (data,isLoading) => {

    let url = urls.LOGINURLOUT;

    return dispatch => {
        dispatch({type: types.LOGINOUT,isLoading: isLoading});
        return Util.post(url, data,
            (Code, Message, Data) => {
                let user={};
                if(Code==1){
                    Toast.show('成功'
                        , {position:Toast.positions.CENTER});
                    console.log('=======user===------------>'+JSON.stringify(user));
                    Storage.setUser(user);
                    Storage.save('token','');
                    Storage.save('isLogin',false);
                    Storage.save('refresh_token','');
                    Storage.save('username','');
                    Storage.save('userphone','');
                    Storage.save('name',false);
                    Storage.save('school',false);
                    Storage.save('work',false);
                    Storage.save('phone',false);
                    Storage.save('contact',false);
                    Storage.save('isrealauthnm','');
                    Storage.save('isphoneauthnm','');
                    Storage.save('iseducauthnm','');
                    Storage.save('islinkauthnm','');
                    Storage.save('isworkauthnm','');
                }else if(Code==2){
                    Toast.show("登录验证失败，请重新登录"
                        , {position:Toast.positions.CENTER});
                    dispatch({'type': types.TOKENERROR});
                }else{
                    Toast.show(Message
                        , {position:Toast.positions.CENTER});
                    dispatch({'type': types.ACTIONERROR});
                }
                dispatch({type: types.LOGINOUTRECEIVED, Code : Code, Message: Message, Data: Data});
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

/**获取验证码token */
export let GetCheckNum = () => {

    let url = urls.GETCHECKNUM;

    return dispatch => {
        dispatch({type: types.GETCHECKNUM});
        return Util.post(url,{},
            (Code, Message, Data) => {

                if(Code==1){
                    Storage.save("token",Data);
                    // Storage.save("tt","cyf123456");
                    console.log('======yzm===------------>'+Data);
                }
                dispatch({type: types.GETCHECKNUMRECEIVED, Code : Code, Message: Message, Data: Data});
            },
            (err) => {
                Toast.show(err
                    , {position:Toast.positions.CENTER});
                console.log('获取验证码token err: ' + err);
                dispatch({'type': types.ACTIONERROR});
                // alert('Android要用外网地址');
            }
        );
    }

};

/**发送验证码 */
export let SendYZM = (data) => {

    let url = urls.SENDYZM;

    return dispatch => {
        dispatch({type: types.SENDYZM});
        return Util.post(url,data,
            (Code, Message, Data) => {

            if(Code==1){
                Storage.save("yzmtoken",Message);
                // Storage.save("tt","cyf123456");
                dispatch({type: types.SENDYZMRECEIVED, Code : Code, Message: Message, Data: Data});
                console.log('======yzmtoken===------------>'+Message);
            }else if(Code==2){
                Toast.show("登录验证失败，请重新登录"
                    , {position:Toast.positions.CENTER});
                dispatch({'type': types.TOKENERROR});
            }else{
                Toast.show(Message
                    , {position:Toast.positions.CENTER});
                dispatch({'type': types.ACTIONERROR});
            }

            },
            (err) => {
                Toast.show(err
                    , {position:Toast.positions.CENTER});
                console.log('发送验证码 err: ' + err);
                dispatch({'type': types.ACTIONERROR});
                // alert('Android要用外网地址');
            }
        );
    }

};

/**注册 */
export let Register = (data,isLoading) => {

    let url = urls.REGISTER;

    return dispatch => {
        dispatch({type: types.REGISTER,isLoading: isLoading});
        return Util.post(url, data,
            (Code, Message, Data) => {

            if(Code==1){
                Toast.show('成功'
                    , {position:Toast.positions.CENTER});
                dispatch({type: types.REGISTERRECEIVED, Code : Code, Message: Message, Data: Data});
            }else if(Code==2){
                Toast.show("登录验证失败，请重新登录"
                    , {position:Toast.positions.CENTER});
                dispatch({'type': types.TOKENERROR});
            }else{
                Toast.show(Message
                    , {position:Toast.positions.CENTER});
                dispatch({'type': types.ACTIONERROR});
            }
            },
            (err) => {
                Toast.show(err
                    , {position:Toast.positions.CENTER});
                console.log('Register error: ' + err);
                dispatch({'type': types.ACTIONERROR});
                // alert('Android要用外网地址');
            }
        );
    }

};

/**我的审核中心 */
export let CheckCenter = (data,isLoading,isRefreshing,isLoadMore,) => {

    let url = urls.CHECKCENTER;

    return dispatch => {
        dispatch({type: types.CHECKCENTER,isLoading: isLoading,isRefreshing:isRefreshing,isLoadMore:isLoadMore});
        return Util.post(url, data,
            (Code, Message, Data) => {
            if(Code==1){
                if(Data==''){
                    Toast.show(Message
                        , {position:Toast.positions.CENTER});
                }
                dispatch({type: types.CHECKCENTERRECEIVED, Code : Code, Message: Message, Data: Data});

            }else if(Code==2){
                Toast.show("登录验证失败，请重新登录"
                    , {position:Toast.positions.CENTER});
                dispatch({'type': types.TOKENERROR});
            }else{
                Toast.show(Message
                    , {position:Toast.positions.CENTER});
                dispatch({'type': types.ACTIONERROR});
            }
            },
            (err) => {
                Toast.show(err
                    , {position:Toast.positions.CENTER});
                console.log('Register error: ' + err);
                dispatch({'type': types.ACTIONERROR});
                // alert('Android要用外网地址');
            }
        );
    }

};

/**实名认证 */
export let CheckName = (data,isLoading) => {

    let url = urls.CHECKNAME;

    return dispatch => {
        dispatch({type: types.CHECKNAME,isLoading: isLoading});
        return Util.post(url, data,
            (Code, Message, Data) => {
            if(Code==1){
                Toast.show(Message
                    , {position:Toast.positions.CENTER});
                Storage.save('name',true);
                Storage.save('isrealauthnm','审核中');
                dispatch({type: types.CHECKNAMERECEIVED, Code : Code, Message: Message, Data: Data});
            }else if(Code==2){
                Toast.show("登录验证失败，请重新登录"
                    , {position:Toast.positions.CENTER});
                dispatch({'type': types.TOKENERROR});
            }else{
                Toast.show(Message
                    , {position:Toast.positions.CENTER});
                dispatch({'type': types.ACTIONERROR});
            }
            },
            (err) => {
                Toast.show(err
                    , {position:Toast.positions.CENTER});
                console.log('Register error: ' + err);
                dispatch({'type': types.ACTIONERROR});
                // alert('Android要用外网地址');
            }
        );
    }

};
/**手机号认证 */
export let CheckPhone = (data,isLoading) => {

    let url = urls.CHECKPHONE;

    return dispatch => {
        dispatch({type: types.CHECKPHONE,isLoading: isLoading});
        return Util.post(url, data,
            (Code, Message, Data) => {
            if(Code==1){
                Toast.show(Message
                    , {position:Toast.positions.CENTER});
                Storage.save('phone',true);
                Storage.save('isphoneauthnm','审核中');
                dispatch({type: types.CHECKPHONERECEIVED, Code : Code, Message: Message, Data: Data});
            }else if(Code==2){
                Toast.show("登录验证失败，请重新登录"
                    , {position:Toast.positions.CENTER});
                dispatch({'type': types.TOKENERROR});
            }else{
                Toast.show(Message
                    , {position:Toast.positions.CENTER});
                dispatch({'type': types.ACTIONERROR});
            }
            },
            (err) => {
                Toast.show(err
                    , {position:Toast.positions.CENTER});
                console.log('Register error: ' + err);
                dispatch({'type': types.ACTIONERROR});
                // alert('Android要用外网地址');
            }
        );
    }

};

/**学历认证 */
export let CheckSchool = (data,isLoading) => {

    let url = urls.CHECKSCHOOL;

    return dispatch => {
        dispatch({type: types.CHECKSCHOOL,isLoading: isLoading});
        return Util.post(url, data,
            (Code, Message, Data) => {
            if(Code==1){
                Toast.show(Message
                    , {position:Toast.positions.CENTER});
                Storage.save('school',true);
                Storage.save('iseducauthnm','审核中');
                dispatch({type: types.CHECKSCHOOLRECEIVED, Code : Code, Message: Message, Data: Data});
            }else if(Code==2){
                Toast.show("登录验证失败，请重新登录"
                    , {position:Toast.positions.CENTER});
                dispatch({'type': types.TOKENERROR});
            }else{
                Toast.show(Message
                    , {position:Toast.positions.CENTER});
                dispatch({'type': types.ACTIONERROR});
            }
            },
            (err) => {
                Toast.show(err
                    , {position:Toast.positions.CENTER});
                console.log('Register error: ' + err);
                dispatch({'type': types.ACTIONERROR});
                // alert('Android要用外网地址');
            }
        );
    }

};

/**学历认证 */
export let CheckWork = (data,isLoading) => {

    let url = urls.CHECKWORK;

    return dispatch => {
        dispatch({type: types.CHECKWORK,isLoading: isLoading});
        return Util.post(url, data,
            (Code, Message, Data) => {
            if(Code==1){
                Toast.show(Message
                    , {position:Toast.positions.CENTER});
                Storage.save('work',true);
                Storage.save('isworkauthnm','审核中');
                dispatch({type: types.CHECKWORKRECEIVED, Code : Code, Message: Message, Data: Data});
            }else if(Code==2){
                Toast.show("登录验证失败，请重新登录"
                    , {position:Toast.positions.CENTER});
                dispatch({'type': types.TOKENERROR});
            }else{
                Toast.show(Message
                    , {position:Toast.positions.CENTER});
                dispatch({'type': types.ACTIONERROR});
            }
            },
            (err) => {
                Toast.show(err
                    , {position:Toast.positions.CENTER});
                console.log('Register error: ' + err);
                dispatch({'type': types.ACTIONERROR});
                // alert('Android要用外网地址');
            }
        );
    }

};

/**学历认证 */
export let CheckContact = (data,isLoading) => {

    let url = urls.CHECKCONTACT;

    return dispatch => {
        dispatch({type: types.CHECKCONTACT,isLoading: isLoading});
        return Util.post(url, data,
            (Code, Message, Data) => {
            if(Code==1){
                Toast.show(Message
                    , {position:Toast.positions.CENTER});
                Storage.save('contact',true);
                Storage.save('islinkauthnm','审核中');
                dispatch({type: types.CHECKCONTACTRECEIVED, Code : Code, Message: Message, Data: Data});
            }else if(Code==2){
                Toast.show("登录验证失败，请重新登录"
                    , {position:Toast.positions.CENTER});
                dispatch({'type': types.TOKENERROR});
            }else{
                Toast.show(Message
                    , {position:Toast.positions.CENTER});
                dispatch({'type': types.ACTIONERROR});
            }
            },
            (err) => {
                Toast.show(err
                    , {position:Toast.positions.CENTER});
                console.log('Register error: ' + err);
                dispatch({'type': types.ACTIONERROR});
                // alert('Android要用外网地址');
            }
        );
    }

};

/**获取用户信息 */
export let GetUserInfo = (data) => {

    let url = urls.GETUSERINFO;

    return dispatch => {
        dispatch({type: types.GETUSERINFO});
        return Util.post(url, data,
            (Code, Message, Data) => {
            if(Code==1){
                // Toast.show(Message
                //     , {position:Toast.positions.CENTER});
                Storage.save('username',Data.name);
                Storage.save('userphone',Data.phone);
                if(Data.isrealauth=='1'||Data.isrealauth=='4'){
                    Storage.save('name',true);
                }else{
                    Storage.save('name',false);
                }
                Storage.save('isrealauthnm',Data.isrealauthnm);
                Storage.save('isphoneauthnm',Data.isphoneauthnm);
                Storage.save('iseducauthnm',Data.iseducauthnm);
                Storage.save('islinkauthnm',Data.islinkauthnm);
                Storage.save('isworkauthnm',Data.isworkauthnm);
                if(Data.iseducauth=='1'||Data.iseducauth=='4'){
                    Storage.save('school',true);
                }else{
                    Storage.save('school',false);
                }
                if(Data.isworkauth=='1'||Data.isworkauth=='4'){
                    Storage.save('work',true);
                }else{
                    Storage.save('work',false);
                }
                if(Data.isphoneauth=='1'||Data.isphoneauth=='4'){
                    Storage.save('phone',true);
                }else{
                    Storage.save('phone',false);
                }
                if(Data.islinkauth=='1'||Data.islinkauth=='4'){
                    Storage.save('contact',true);
                }else{
                    Storage.save('contact',false);
                }
                dispatch({type: types.GETUSERINFORECEIVED, Code : Code, Message: Message, Data: Data});
            }else if(Code==2){
                Toast.show("登录验证失败，请重新登录"
                    , {position:Toast.positions.CENTER});
                dispatch({'type': types.TOKENERROR});
            }else{
                Toast.show(Message
                    , {position:Toast.positions.CENTER});
                dispatch({'type': types.ACTIONERROR});
            }
            },
            (err) => {
                // console.log('Register error: ' + err);
                Toast.show(err
                    , {position:Toast.positions.CENTER});
                dispatch({'type': types.ACTIONERROR});
                // alert('Android要用外网地址');
            }
        );
    }

};
