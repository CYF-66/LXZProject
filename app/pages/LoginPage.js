'use strict'
import React, {Component} from 'react'
import {
    View,
    TextInput,
    Image,
    TouchableOpacity,
    Text,
    StyleSheet,
    Switch,
    InteractionManager,
    BackHandler,
    Platform
} from 'react-native'
//引入标题支持包
import NavigationBar from 'react-native-navigationbar';
import Toast from 'react-native-root-toast';
import {HttpLogin} from '../actions/myActions'
import Load from '../components/Load';
import HomePage from "./HomePage";
import AppMain from '../containers/AppMain';
import Common from '../util/constants';
import Storage from '../util/Storage'
import RegisterContainer from '../containers/RegisterContainer'
import loginReducer from "../reduxs/loginReducer";
export default class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password: '',
            switchType: true,
            account: '',
            accountPWD: '',
            isLoading: false,
            isLogin:false,
            user:{},
            // isLogin:false,
            date: '',
            code:'',
        };
    }
    componentWillUpdate() {
        InteractionManager.runAfterInteractions(() => {
            const {loginReducer} = this.props;
            console.log('loginReducer.isLoggedIn===------------>'+loginReducer.isLoggedIn);
            if (loginReducer.isLoggedIn) {
                this.props.navigator.pop();
                loginReducer.isLoggedIn=false;
            }
        });

    }
    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
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
    componentWillMount() {
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
        Storage.getUser().then((user) => {
            if (user) {
                this.setState({
                    user: user,
                })
            } else {
                this.setState({
                    user: {},
                })
            }
        });
        Storage.get("isLogin").then((value) => {
            if(value){
                this.setState({
                    isLogin: value
                })

            }else{
                this.setState({
                    isLogin: ''
                })
            }
        });

    }

    render() {
        // console.log('=======this.state.user===------------>'+JSON.stringify(this.state.user));
        const {loginReducer} = this.props;
        let isLoading=loginReducer.isLoading;
        return (
            <View style={styles.container}>
                <NavigationBar
                    backIconHidden={false}
                    barTintColor={Common.colors.yellow3}
                    barStyle={styles.navbar}
                    title='登录'
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
                        placeholder='手机号'
                        restrict="^."
                        maxLength={11}
                        editable={true}
                        keyboardType='numeric'
                        multiline={false}
                        // defaultValue={this.state.account.substring(1,this.state.account.length-1)}
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
                        // defaultValue={this.state.accountPWD.substring(1,this.state.accountPWD.length-1)}
                        keyboardType={'default'}
                        secureTextEntry={true}
                        placeholder='密码'
                        underlineColorAndroid={'transparent'}
                        onChangeText={this.onChangePassword.bind(this)}/>
                </View>
                {/*<View style={styles.switch}>*/}
                    {/*<Text style={styles.textStyle}>记住密码</Text>*/}
                    {/*<Switch value={this.state.switchType}*/}
                            {/*onValueChange={(value) => {*/}
                                {/*this._changeSate(value)*/}
                            {/*}}/>*/}
                {/*</View>*/}
                <TouchableOpacity activeOpacity={0.5} style={styles.loginBtn} onPress={this._login.bind(this)}>
                    <Text style={styles.loginText}>登录</Text>
                </TouchableOpacity>

                {/*{content}*/}
                <View style={styles.registerWrap}>
                    <TouchableOpacity activeOpacity={0.5} onPress={this._forgetPassword.bind(this)}>
                        <Text style={{color: Common.colors.blue, fontSize: 15}}>忘记密码</Text>
                    </TouchableOpacity>
                    <Text style={{color: Common.colors.blue, marginLeft: 15, marginRight: 15, fontSize: 18}}>
                        |
                    </Text>
                    <TouchableOpacity activeOpacity={0.5} onPress={this._register.bind(this)}>
                        <Text style={{color: Common.colors.blue ,fontSize: 15}}>立即注册</Text>
                    </TouchableOpacity>
                </View>
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

    _login() {
        let {account, accountPWD} = this.state;

        if (!account.length) {
            Toast.show('手机号不能为空', {position: Toast.positions.CENTER});
            return;
        }
        if (!accountPWD.length) {
            Toast.show('密码不能为空', {position: Toast.positions.CENTER});
            return;
        }
        // 交互管理器在任意交互/动画完成之后，允许安排长期的运行工作. 在所有交互都完成之后安排一个函数来运行。
        InteractionManager.runAfterInteractions(() => {
            const {dispatch} = this.props;
            // dispatch(GetOneKeyRegister(isLoading));
            //11010497   cks69t
            this.state.isLoading = true;
            let data = {'phone': account, 'password': accountPWD};
            // let data={'phone':'13788957291','password':'000000'};
            dispatch(HttpLogin(data, this.state.isLoading));
        });
    }

    _forgetPassword() {
        Toast.show('忘记密码', {position: Toast.positions.CENTER});
    }

    _register() {
        // Toast.show('注册', {position: Toast.positions.CENTER});
        this.props.navigator.push({// 活动跳转，以Navigator为容器管理活动页面
            name:'RegisterContainer',
            component: RegisterContainer,
            // passProps: {contentData}// 传递的参数（可选）,{}里都是键值对  ps: test是关键字
        })
    }

    _changeSate(value) {
        Storage.save('loginState', value);
        this.setState({
            switchType: value
        })
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