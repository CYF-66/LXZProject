'use strict'
import React, {Component} from 'react'
import {
    View,
    ScrollView,
    RefreshControl,
    Image,
    InteractionManager,
    TouchableOpacity,
    Text,
    StyleSheet,
    BackHandler,
    Platform
} from 'react-native'
//引入标题支持包
// import SetPage from 'SetPage'
import Common from '../util/constants';
import NavigationBar from 'react-native-navigationbar'
import Toast from 'react-native-root-toast';
import IdentificationContainer from '../containers/IdentificationContainer'
import Storage from '../util/Storage'
import {LoginOut} from '../actions/myActions'
import Load from '../components/Load';
import LoginContainer from '../containers/LoginContainer'
import RegisterContainer from '../containers/RegisterContainer'
export default class SetPage extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            isError: false,
            isLoading: true,
            token:'',
            refresh_token:'',
            // typeList: {}
        })
    }

    componentWillUpdate() {
        InteractionManager.runAfterInteractions(() => {
            const {myReducer} = this.props;
            console.log('loginReducer.isLoggedIn===------------>'+myReducer.isLoggedIn);
            if (myReducer.isLoginOut) {
                // this.props.navigator.popToTop();
                myReducer.isLoginOut=false;
                this.props.navigator.push({// 活动跳转，以Navigator为容器管理活动页面
                    name:'LoginContainer',
                    component: LoginContainer,
                    // passProps: {contentData}// 传递的参数（可选）,{}里都是键值对  ps: test是关键字
                });
            }
        });

    }
    componentDidMount() {
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
        Storage.get("refresh_token").then((value) => {
            if(value){
                this.setState({
                    refresh_token: value
                })

            }else{
                this.setState({
                    refresh_token: ''
                })
            }
        });

    }
    componentWillMount() {
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
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

    render() {

        const {myReducer} = this.props;
        // let Data=homeReducer.Data;
        let isLoading = myReducer.isLoading;
        return (
            <View style={styles.container} needsOffscreenAlphaCompositing renderToHardwareTextureAndroid>
                <NavigationBar
                    backIconHidden={false}
                    barTintColor={Common.colors.yellow3}
                    barStyle={styles.navbar}
                    title='设置'
                    titleColor={Common.colors.white}
                    backColor={Common.colors.white}
                    backFunc={() => {
                        this.props.navigator.pop()
                    }}
                    // actionName='使用规则'
                    // actionTextColor={Common.colors.white}
                    // actionFunc={() => {
                    //     Toast.show('资金记录', {position: Toast.positions.CENTER});
                    //     // this.props.navigator.push({
                    //     //     component: AboutPage
                    //     // })
                    // }}
                />

                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => this._goToLoginPage()}>
                    <View style={{
                        flexDirection: 'row',
                        padding: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: Common.colors.white,
                        borderBottomColor: Common.colors.bottomlinecolor,
                        borderBottomWidth: 1
                    }}>
                        <Image source={require('../images/set/login_icon.png')} style={{
                            width: 30,
                            height: 30,
                        }}/>
                        <Text style={{
                            flex: 1,
                            color: Common.colors.gray1,
                            marginLeft: 10,
                            fontSize: 15,
                            justifyContent: 'center'
                        }}>
                            登录
                        </Text>
                        <Text style={{color: Common.colors.gray1, fontSize: 15,}}>
                            >
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => this._goToRegisterPage()}>
                    <View style={{
                        flexDirection: 'row',
                        padding: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: Common.colors.white,
                        borderBottomColor: Common.colors.bottomlinecolor,
                        borderBottomWidth: 1
                    }}>
                        <Image source={require('../images/set/login_icon.png')} style={{
                            width: 30,
                            height: 30,
                        }}/>
                        <Text style={{
                            flex: 1,
                            color: Common.colors.gray1,
                            marginLeft: 10,
                            fontSize: 15,
                            justifyContent: 'center'
                        }}>
                            注册
                        </Text>
                        <Text style={{color: Common.colors.gray1, fontSize: 15,}}>
                            >
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5} style={styles.loginBtn} onPress={this._loginOut.bind(this)}>
                    <Text style={styles.loginText}>退出登录</Text>
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

    _goToLoginPage(){
        // Toast.show("登录", {position: Toast.positions.CENTER});
        this.props.navigator.push({// 活动跳转，以Navigator为容器管理活动页面
            name:'LoginContainer',
            component: LoginContainer,
            // passProps: {contentData}// 传递的参数（可选）,{}里都是键值对  ps: test是关键字
        })
    }
    _goToRegisterPage(){
        // Toast.show("注册", {position: Toast.positions.CENTER});
        this.props.navigator.push({// 活动跳转，以Navigator为容器管理活动页面
            name:'RegisterContainer',
            component: RegisterContainer,
            // passProps: {contentData}// 传递的参数（可选）,{}里都是键值对  ps: test是关键字
        })
    }
    _loginOut() {
        // Toast.show('退出登录', {position: Toast.positions.CENTER});
        InteractionManager.runAfterInteractions(() => {
            const {dispatch} = this.props;
            // dispatch(GetOneKeyRegister(isLoading));
            //11010497   cks69t
            this.state.isLoading = true;
            // let data = {'accountNo': account, 'loginPwd': accountPWD};
            let data={'token ':this.state.token,'refresh_token':this.state.refresh_token};
            console.log('data===------------>'+JSON.stringify(data));
            dispatch(LoginOut(data, this.state.isLoading));
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Common.colors.gray6,
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
});