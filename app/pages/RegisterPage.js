'use strict'
import React, {Component} from 'react'
import {
    View,
    TextInput,
    Image,
    TouchableOpacity,
    Text,
    StyleSheet,
    Platform,
    InteractionManager,
    BackHandler
} from 'react-native'
//引入标题支持包
import NavigationBar from 'react-native-navigationbar';
import Toast from 'react-native-root-toast';
import Load from '../components/Load';
import HomePage from "./HomePage";
import AppMain from '../containers/AppMain';
import Common from '../util/constants';
import Storage from '../util/Storage'
import WebViewPage from '../pages/WebViewPage'
import {GetCheckNum,SendYZM,Register} from '../actions/myActions'
import NetWorkTool from '../util/NetWorkTool'
export default class RegisterPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password: '',
            switchType: true,
            account: '',
            accountPWD: '',
            yzm: '',
            isLoading: false,
            // isLogin:false,
            yzmtoken:'',
            token:'',
            date: {},
            code:'',
            verifyCodeText:'验证码',
        };
        this.timer = null;
        this.timeHit = 0;

    }

    componentWillReceiveProps(nextProps) {
        const {dispatch, registerReducer} = nextProps;

        Storage.get("token").then((value) => {
            if(value){
                this.setState({
                    token: value
                })

            }else{
                this.setState({
                    token: ''
                })
            }
        });
        Storage.get("yzmtoken").then((value) => {
            if(value){
                this.setState({
                    yzmtoken: value
                })

            }else{
                this.setState({
                    yzmtoken: ''
                })
            }
        });
    }

    componentWillMount() {
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
        NetWorkTool.addEventListener(NetWorkTool.TAG_NETWORK_CHANGE,this.handleMethod);
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
        NetWorkTool.removeEventListener(NetWorkTool.TAG_NETWORK_CHANGE,this.handleMethod);
    }

    onBackAndroid = () => {
        const nav = this.props.navigator;
        const routers = nav.getCurrentRoutes();
        if (routers.length > 1) {
            nav.pop();
            return true;
        }
        return false;
    };
    handleMethod(isConnected){
        console.log('test', (isConnected ? 'online' : 'offline'));
        if(!isConnected){
            Toast.show(NetWorkTool.NOT_NETWORK
                , {position:Toast.positions.CENTER});
        }
    }
    componentWillUpdate() {
        InteractionManager.runAfterInteractions(() => {
            const {registerReducer} = this.props;
            console.log('registerReducer.isRegisterSuccess===------------>'+registerReducer.isRegisterSuccess);
            if (registerReducer.isRegisterSuccess==true) {
                this.props.navigator.pop();
                registerReducer.isRegisterSuccess=false;
            }
        });

    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            const {dispatch} = this.props;
            NetWorkTool.checkNetworkState((isConnected)=>{
                if(!isConnected){
                    Toast.show(NetWorkTool.NOT_NETWORK);
                    return;
                }else{
                    dispatch(GetCheckNum());
                }
            });
        });
    }

    render() {
        const {registerReducer} = this.props;
        // let Data=homeReducer.Data;
        let isLoading = registerReducer.isLoading;
        // console.log('token===------------>'+this,state.token);
        return (
            <View style={styles.container}>
                <NavigationBar
                    backIconHidden={false}
                    barTintColor={Common.colors.yellow3}
                    barStyle={styles.navbar}
                    title='注册'
                    titleColor={Common.colors.white}
                    backColor={Common.colors.white}
                    backFunc={() => {
                        this.props.navigator.pop()
                    }}
                    // actionName='添加'
                    // actionTextColor='white'
                    // actionFunc={() => {
                    //     this.props.navigator.push({
                    //         component: AboutPage
                    //     })
                    // }}
                />

                <View style={[styles.formInput, styles.formInputSplit]}>
                    <Image source={require('../images/set/login_icon.png')}
                           style={{width: 25, height: 25, resizeMode: 'contain',
                               alignItems:'center'}}/>
                    <TextInput
                        ref="login_name"
                        placeholder='本人实名手机号'
                        restrict="^."
                        maxLength={11}
                        editable={true}
                        keyboardType='numeric'
                        multiline={false}
                        defaultValue={this.state.account.substring(0,this.state.account.length)}
                        underlineColorAndroid={'transparent'}
                        // field.restrict = "0-9"
                        style={styles.loginInput}
                        onChangeText={this.onChangeMobile.bind(this)}/>
                </View>
                <View style={[styles.formInput, styles.formInputSplit]}>
                    <Image source={require('../images/set/login_pwd_icon.png')}
                           style={{width: 25, height: 25, resizeMode: 'contain',
                               alignItems:'center'}}/>
                    <TextInput
                        ref="login_psw"
                        style={styles.loginInput}
                        // field.restrict = "0-9"
                        restrict="0-9"
                        multiline={false}
                        defaultValue={this.state.yzm.substring(0,this.state.yzm.length)}
                        keyboardType={'default'}
                        secureTextEntry={false}
                        placeholder='短信验证码'
                        underlineColorAndroid={'transparent'}
                        onChangeText={this._onChangeCode.bind(this)}/>
                    <TouchableOpacity activeOpacity={0.5} onPress={this._getCheckNum.bind(this)}>
                    <Text style={{borderRadius:5,backgroundColor:Common.colors.yellow3,paddingLeft:5,paddingRight:5,paddingTop:5,paddingBottom:5,color:Common.colors.white,fontSize:18}}>
                        {this.state.verifyCodeText}
                    </Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.formInput, styles.formInputSplit]}>
                    <Image source={require('../images/set/login_pwd_icon.png')}
                           style={{width: 25, height: 25, resizeMode: 'contain',
                               alignItems:'center'}}/>
                    <TextInput
                        ref="login_psw"
                        style={styles.loginInput}
                        // field.restrict = "0-9"
                        restrict="0-9"
                        multiline={false}
                        defaultValue={this.state.accountPWD.substring(0,this.state.accountPWD.length)}
                        keyboardType={'default'}
                        secureTextEntry={true}
                        placeholder='密码(6-18位字母或数字)'
                        underlineColorAndroid={'transparent'}
                        onChangeText={this.onChangePassword.bind(this)}/>
                </View>

                <View style={{flexDirection:'row',marginLeft:20,marginTop:30}}>

                    <Text style={{color:Common.colors.black,fontSize:15}}>
                        注册即同意
                    </Text>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => this._skipIntoWeb("注册使用协议")}>
                    <Text style={{color:Common.colors.blue,fontSize:15,marginLeft:5}}>
                        《注册使用协议》
                    </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity activeOpacity={0.5} style={styles.loginBtn} onPress={this._register.bind(this)}>
                    <Text style={styles.loginText}>注册</Text>
                </TouchableOpacity>
                <Load
                    transparent={true}
                    visible={isLoading}
                    color={Common.colors.loadblue}
                    overlayColor={Common.colors.transparent}
                    size={'large'}
                />
            </View>
        )
    }

    _register() {
        // alert("登录")
        let {account, accountPWD} = this.state;

        if (!account.length) {
            Toast.show('请输入正确手机号', {position: Toast.positions.CENTER});
            return;
        }
        if (!accountPWD.length) {
            Toast.show('请输入密码', {position: Toast.positions.CENTER});
            return;
        }
        // 交互管理器在任意交互/动画完成之后，允许安排长期的运行工作. 在所有交互都完成之后安排一个函数来运行。
        InteractionManager.runAfterInteractions(() => {

            NetWorkTool.checkNetworkState((isConnected)=>{
                if(!isConnected){
                    Toast.show(NetWorkTool.NOT_NETWORK);
                    return;
                }else{
                    const {dispatch} = this.props;
                    this.state.isLoading = true;
                    let yzmtoken=this.state.yzmtoken;
                    let data = {'phone': account, 'password': accountPWD,'cfmpassword':accountPWD,'yzmtoken':yzmtoken,yzm:this.state.yzm};//da955b5ca4d323ef410cc1d29f8d99ff
                    console.log('data===------------>'+JSON.stringify(data));
                    dispatch(Register(data, this.state.isLoading));
                }
            });
        });
    }

    _skipIntoWeb(content){
        this.props.navigator.push({// 活动跳转，以Navigator为容器管理活动页面
            component: WebViewPage,
            passProps:{title: content,url: Common.url.registerAgreeUrl}//
        })
    }

    _getCheckNum(){
        if(this.timeHit==0){
            // MemberAction.smsVerifyCode(this.state.mobile);
        }
        if(!this.timer){
            this.timer = setInterval(function(){
                const maxSeconds = 60;
                let txt = '';
                this.timeHit++;
                //console.warn('this.timeHit',this.timeHit);
                if(this.timeHit > maxSeconds){
                    txt = '获取验证码';
                    this.timeHit = 0;
                    clearInterval(this.timer);
                    this.timer = null;
                }else{
                    txt = (parseInt(maxSeconds) - parseInt(this.timeHit)) + '秒';
                }
                this.setState({'verifyCodeText':txt});
            }.bind(this),1000);
        }

        let {account, accountPWD} = this.state;

        if (!account.length) {
            Toast.show('请输入正确手机号', {position: Toast.positions.CENTER});
            return;
        }
        InteractionManager.runAfterInteractions(() => {
            const {dispatch} = this.props;
            // // dispatch(GetCheckNum());
            // const {myReducer} = this.props;
            // let data={'phone':account,'token':'1234564cf4a3af8e224ba7f23d9f6ebdb39e26asdfgh'};
            // let {token}=this.state;
            // const {registerReducer} = this.props;
            // let token=registerReducer.Data;
            // console.log('token===------------>'+token);

            let token=this.state.token;
            console.log('cc===------------>'+token);
            let data={'phone':account,'token':"qwerty"+token+"fghjkl"};
            console.log('data===------------>'+JSON.stringify(data));
            dispatch(SendYZM(data));
        });
    }

    _forgetPassword() {
        Toast.show('忘记密码', {position: Toast.positions.CENTER});
    }

    _changeSate(value) {
        Storage.save('loginState', value);
        this.setState({
            switchType: value
        })
    }
    _onChangeCode(text){
        this.state.yzm = text;
        // this.setState({'code': text});
    }

    onChangeMobile(text) {
        this.state.account = text;
    }

    onChangePassword(text) {
        this.state.accountPWD = text;
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Common.colors.white,
    },
    loginWrap: {
        backgroundColor: '#FCE9D4',
    },
    imgWrap: {
        flexDirection: 'row',
        flex: 1,
    },
    loginMain: {
        flex: 1,
    },
    comCulture: {
        width: 320,
        marginTop: 50,
    },
    formInput: {
        flexDirection: 'row',
        height: 60,
        padding: 20,
        justifyContent:'center',
        alignItems:'center'
    },
    formInputSplit: {
        borderBottomWidth: 1,
        borderBottomColor: Common.colors.bottomlinecolor,
    },
    loginInput: {
        height: 40,
        paddingLeft: 10,
        flex: 1,
        fontSize: 16,
        alignItems:'center'
    },

    loginBtn: {
        backgroundColor: Common.colors.yellow3,
        padding: 10,
        alignItems: 'center',
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 5,
    },
    loginText: {
        color: Common.colors.white,
        fontSize: 17,
    },

    registerWrap: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10,
    },
    switch: {
        width: Common.window.width * 0.9,
        height: 55,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 20,
        alignItems: 'center',
    },
    textStyle: {
        fontSize: 18,
        color: Common.colors.blue,
        marginLeft: 7,
        marginRight: 10,
        fontWeight: 'bold'
    },
});