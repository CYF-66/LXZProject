'use strict'
import React, {Component} from 'react'
import {
    View,
    BackHandler,
    RefreshControl,
    Platform,
    TouchableOpacity,
    Text,
    TextInput,
    StyleSheet,
    InteractionManager
} from 'react-native'
//引入标题支持包
// import SetPage from 'SetPage'
import Common from '../util/constants';
import NavigationBar from 'react-native-navigationbar'
import Toast from 'react-native-root-toast';
import Storage from '../util/Storage'
import {CheckName} from '../actions/myActions'
import CheckSchoolContainer from '../containers/CheckSchoolContainer'
import CheckWorkContainer from '../containers/CheckWorkContainer'
import CheckPhoneContainer from '../containers/CheckPhoneContainer'
import CheckContactContainer from '../containers/CheckContactContainer'
import Load from '../components/Load';
import TakeOrderContainer from '../containers/TakeOrderContainer'
import NetWorkTool from '../util/NetWorkTool'
export default class CheckNamePage extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            isError: false,
            isLoading: true,
            name: '',
            idcardNumber: '',
            // typeList: {}
        })
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
            const {checkReducer} = this.props;
            console.log('checkReducer.isCheckName===------------>'+checkReducer.isCheckName);
            if (checkReducer.isCheckName) {
                if(this.props.isNeedSkip){
                    this._check();
                }else{
                    this.props.navigator.pop();
                }
                // this.props.navigator.popToTop();
                checkReducer.isCheckName=false;
                Storage.save('username',this.state.name);
            }
        });

    }
    render() {
        const {checkReducer} = this.props;
        // let Data=homeReducer.Data;
        let isLoading = checkReducer.isLoading;
        return (
            <View style={styles.container} needsOffscreenAlphaCompositing renderToHardwareTextureAndroid>
                <NavigationBar
                    backIconHidden={false}
                    barTintColor={Common.colors.yellow3}
                    barStyle={styles.navbar}
                    title='实名认证'
                    titleColor={Common.colors.white}
                    backColor={Common.colors.white}
                    backFunc={() => {
                        this.props.navigator.pop()
                    }}
                     // actionName='下一步'
                     // actionTextColor={Common.colors.white}
                     // actionFunc={() => {
                     //
                     //     this._check();
                     // }}
                />
                <View style={[styles.formInput, styles.formInputSplit]}>
                    <Text
                           style={{fontSize:16,color:Common.colors.gray1,
                               alignItems:'center',justifyContent:'center'}}>
                        真实姓名
                    </Text>
                    <TextInput
                        ref="login_name"
                        placeholder=''
                        restrict="^."
                        maxLength={11}
                        editable={true}
                        keyboardType='default'
                        multiline={false}
                        // defaultValue={this.state.account.substring(1,this.state.account.length-1)}
                        underlineColorAndroid={'transparent'}
                        // field.restrict = "0-9"
                        style={styles.loginInput}
                        onChangeText={this.onChangeName.bind(this)}/>
                </View>
                <View style={[styles.formInput, styles.formInputSplit]}>
                    <Text
                        style={{fontSize:16,color:Common.colors.gray1,
                            alignItems:'center',justifyContent:'center'}}>
                        身份证号
                    </Text>
                    <TextInput
                        ref="login_psw"
                        style={styles.loginInput}
                        // field.restrict = "0-9"
                        restrict="0-9"
                        multiline={false}
                        // defaultValue={this.state.accountPWD.substring(1,this.state.accountPWD.length-1)}
                        keyboardType={'numeric'}
                        secureTextEntry={false}
                        placeholder=''
                        underlineColorAndroid={'transparent'}
                        onChangeText={this.onChangeIdcard.bind(this)}/>
                </View>
                <TouchableOpacity activeOpacity={0.5} style={styles.loginBtn} onPress={this._submit.bind(this)}>
                    <Text style={styles.loginText}>提交</Text>
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

    _submit() {
        // Toast.show('提交', {position: Toast.positions.CENTER});
        let {name, idcardNumber} = this.state;

        if(name==''){
            Toast.show('姓名不能为空', {position: Toast.positions.CENTER});
            return;
        }
        if(idcardNumber==''){
            Toast.show('身份证号不能为空', {position: Toast.positions.CENTER});
            return;
        }
        InteractionManager.runAfterInteractions(() => {
            NetWorkTool.checkNetworkState((isConnected)=>{
                if(!isConnected){
                    Toast.show(NetWorkTool.NOT_NETWORK);
                    return;
                }else{
                    const {dispatch} = this.props;
                    this.state.isLoading = true;
                    let data = {'name': name, 'identity': idcardNumber};
                    console.log('data===------------>'+JSON.stringify(data));
                    // let data={'name':'13788957291','identity':'000000'};
                    dispatch(CheckName(data, this.state.isLoading));
                }
            });
        });
    }
    _check(){
        Storage.get('school').then((value) => {
            if(value){
                Storage.get('work').then((value) => {
                    if(value){
                        Storage.get('phone').then((value) => {
                            if(value){
                                Storage.get('contact').then((value) => {
                                    if(value){
                                        this.props.navigator.pop()
                                    }else{
                                        this.props.navigator.push({// 活动跳转，以Navigator为容器管理活动页面
                                            name:'CheckContactContainer',
                                            component: CheckContactContainer,
                                            passProps: {isNeedSkip:true}
                                        })
                                        return;
                                    }
                                });
                            }else{
                                this.props.navigator.push({// 活动跳转，以Navigator为容器管理活动页面
                                    name:'CheckPhoneContainer',
                                    component: CheckPhoneContainer,
                                    passProps: {isNeedSkip:true}
                                })
                                return;
                            }
                        });
                    }else{
                        this.props.navigator.push({// 活动跳转，以Navigator为容器管理活动页面
                            name:'CheckWorkContainer',
                            component: CheckWorkContainer,
                            passProps: {isNeedSkip:true}
                        })
                        return;
                    }
                });
            }else{
                this.props.navigator.push({// 活动跳转，以Navigator为容器管理活动页面
                    name:'CheckSchoolContainer',
                    component: CheckSchoolContainer,
                    passProps: {isNeedSkip:true}
                });
                return;
            }
        });
    }
    onChangeName(text) {
        this.state.name = text;
    }

    onChangeIdcard(text) {
        this.state.idcardNumber = text;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Common.colors.white,
    },
    account: {
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: Common.colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        top: 25,
    },
    drawerheadtext: {
        marginTop: 2,
        marginBottom: 2,
        marginLeft: 8,
        color: Common.colors.black,
        fontSize: 18,
        textAlign: 'left'
    },
    drawertext: {
        marginLeft: 8,
        color: Common.colors.black,
        fontSize: 18,
        textAlign: 'left'
    },
    func: {
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: Common.colors.white,
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
        alignItems:'center',
        justifyContent:'center',
        // borderBottomWidth: 1,
        // borderBottomColor: Common.colors.bottomlinecolor,
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