'use strict'
import React, {Component} from 'react'
import {
    View,
    ScrollView,
    Platform,
    Image,
    TouchableOpacity,
    Text,
    StyleSheet,
    InteractionManager
} from 'react-native'
//引入标题支持包
// import SetPage from 'SetPage'
import ImagePicker from 'react-native-image-crop-picker';
import Common from '../util/constants';
import Toast from 'react-native-root-toast';
import IdentificationContainer from '../containers/IdentificationContainer'
import CouponContainer from '../containers/CouponContainer'
import LoginContainer from '../containers/LoginContainer'
import RegisterContainer from '../containers/RegisterContainer'
import CheckContainer from '../containers/CheckContainer'
import SetContainer from '../containers/SetContainer'
import Storage from '../util/Storage'
import DialogSelected from '../components/alertSelected';
import WebViewPage from '../pages/WebViewPage'
import CustomServicePage from '../pages/CustomServicePage'
import AboutPage from '../pages/AboutPage'
import {GetUserInfo} from '../actions/myActions'
// import Demo from '../pages/Demo'
const selectedArr = ["拍照", "相册"];
const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
export default class MyPage extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            isError: false,
            isLoading: true,
            isLogin:false,
            name:'',
            username:'',
            user:{},
            avatarSource: ''
        })
        this.showAlertSelected = this.showAlertSelected.bind(this);
        this.callbackSelected = this.callbackSelected.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        Storage.get("isLogin").then((value) => {
            if(value){
            }else{
                    console.log('componentWillReceiveProps===------------>');

                    // this.props.navigator.push({// 活动跳转，以Navigator为容器管理活动页面
                    //     name:'LoginContainer',
                    //     component: LoginContainer,
                    //     // passProps: {contentData}// 传递的参数（可选）,{}里都是键值对  ps: test是关键字
                    // });
            }
            this.setState({
                isLogin: value,

            })
        });
        Storage.get("userphone").then((value) => {
            this.setState({
                username: value
            })
        });
    }
    componentWillMount() {
        // console.log('componentWillMount===------------>');
        Storage.get("isLogin").then((value) => {
            if(value){
            }else{
                this.props.navigator.push({// 活动跳转，以Navigator为容器管理活动页面
                    name:'LoginContainer',
                    component: LoginContainer,
                    // passProps: {contentData}// 传递的参数（可选）,{}里都是键值对  ps: test是关键字
                });
            }
            this.setState({
                isLogin: value
            })
        });
        Storage.get("userphone").then((value) => {
            this.setState({
                username: value
            })
        });
        Storage.get("iconimage").then((value) => {
            if(value){
                this.setState({
                    avatarSource: {uri:value}
                })
                // console.log('value===------------>'+value);
            }else{
                this.setState({
                    avatarSource: require('../images/set/personicon.png')
                })
            }

        });

    }

    _renderAfterLogin(){
        return(
            <View style={{
                flex:1,
                paddingLeft:5,
                paddingTop: 5,
                paddingBottom: 5,
            }}>
                <Text style={{
                    marginLeft: 5,
                    backgroundColor:Common.colors.transparent,
                    color: Common.colors.white,
                    fontSize: 15,
                    marginTop:20,
                    alignItems: 'center',
                }}>
                    {this.state.username}
                </Text>
            </View>
        )
    }

    _renderBeforeLogin(){
        return(
            <View style={{
                flex:1,
                paddingLeft:5,
                paddingTop: 5,
                paddingBottom: 5,
            }}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => this._skipIntoAccountManage("登录")}>
                <Text style={{
                    textAlign:'center',
                    width:100,
                    marginLeft:5,
                    backgroundColor:Common.colors.bluelogin,
                    paddingLeft:10,paddingRight:10,paddingTop:5,paddingBottom:5,
                    color: Common.colors.white,
                    fontSize: 15,
                    alignItems: 'center',
                    marginTop: 20,
                    borderRadius:10
                }}>
                    登录
                </Text>
            </TouchableOpacity>

            </View>

        )
    }
    render() {
        console.log('image.path='+this.state.avatarSource);
        return (
            <View style={styles.container2}>

                <Image source={require('../images/set/icon_top.jpg')} style={{
                    backgroundColor: Common.colors.bluelogin,
                    height: 200,
                    width: Common.window.width,
                    justifyContent: 'center',
                    alignItems:'center'
                }}>

                    <View style={{
                        flexDirection: 'row',
                        paddingLeft: 20,
                    }}>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => this._clickIcon()}>
                        <Image source={this.state.avatarSource} style={{
                            width:100,
                            height:100,
                            borderRadius:50,
                            resizeMode:'stretch'
                        }}/>
                        </TouchableOpacity>
                        {this.state.isLogin ? this._renderAfterLogin() : this._renderBeforeLogin()}
                    </View>
                </Image>
                <View style={{backgroundColor: Common.colors.white,
                    flexDirection: 'row',
                    paddingTop: 15,
                    paddingBottom: 15,
                    }}>
                    <View style={{flex: 1}}>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => this._skipIntoAccountManage("审核中心")}>
                            <View style={{backgroundColor: Common.colors.white,
                                justifyContent: 'center',
                                alignItems: 'center',}}>
                                <Image source={require('../images/order/icon_shenhecenter.png')} style={{
                                width: 45,
                                height: 45,
                                justifyContent: 'center',
                                alignItems: 'center',
                                }}/>
                                <Text style={styles.drawertext1}>审核中心</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{width:1,backgroundColor:Common.colors.gray6,alignItems:'center',justifyContent:'center'}}/>
                    <View style={{flex: 1}}>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => this._skipIntoAccountManage("我的认证")}>
                            <View style={{backgroundColor: Common.colors.white,
                                alignItems: 'center',
                                justifyContent: 'center',}}>

                                <Image source={require('../images/set/icon_myrenzheng.png')} style={{
                                width: 45,
                                height: 45,
                                justifyContent: 'center',
                                alignItems: 'center',
                                }}/>
                                <Text style={styles.drawertext1}>我的认证</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView
                    automaticallyAdjustContentInsets={true}
                    // bounces={false}
                    // iosalwaysBounceVertical={false}
                    // iosbounces={false}
                    style={styles.container1}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => this._skipIntoAccountManage("我的优惠券")}>
                    <View style={{
                        flexDirection: 'row',
                        padding: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: Common.colors.white,
                        borderBottomColor: Common.colors.bottomlinecolor,
                        borderBottomWidth: 1
                    }}>
                        <Image source={require('../images/set/icon_coupon.png')} style={{
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
                            我的优惠券
                        </Text>
                        <Text style={{color: Common.colors.gray1, fontSize: 15,}}>
                            >
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => this._skipIntoAccountManage("设置")}>
                    <View style={{
                        flexDirection: 'row',
                        padding: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: Common.colors.white,
                        borderBottomColor: Common.colors.bottomlinecolor,
                        borderBottomWidth: 1
                    }}>
                        <Image source={require('../images/set/icon_set.png')} style={{
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
                            设置
                        </Text>
                        <Text style={{color: Common.colors.gray1, fontSize: 15,}}>
                            >
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => this._skipIntoAccountManage("客服与反馈")}>
                    <View style={{
                        flexDirection: 'row',
                        padding: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: Common.colors.white,
                        borderBottomColor: Common.colors.bottomlinecolor,
                        borderBottomWidth: 1
                    }}>
                        <Image source={require('../images/set/icon_kefu.png')} style={{
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
                            我的客服
                        </Text>
                        <Text style={{color: Common.colors.gray1, fontSize: 15,}}>
                            >
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => this._skipIntoAccountManage("常见问题")}>
                    <View style={{
                        flexDirection: 'row',
                        padding: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: Common.colors.white,
                        borderBottomColor: Common.colors.bottomlinecolor,
                        borderBottomWidth: 1
                    }}>
                        <Image source={require('../images/set/icon_question.png')} style={{
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
                            常见问题
                        </Text>
                        <Text style={{color: Common.colors.gray1, fontSize: 15,}}>
                            >
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => this._skipIntoAccountManage("关于")}>
                    <View style={{
                        flexDirection: 'row',
                        padding: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: Common.colors.white,
                        borderBottomColor: Common.colors.bottomlinecolor,
                        borderBottomWidth: 1
                    }}>
                        <Image source={require('../images/set/icon_about.png')} style={{
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
                            关于
                        </Text>
                        <Text style={{color: Common.colors.gray1, fontSize: 15,}}>
                            >
                        </Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
                <DialogSelected ref={(dialog)=>{
                    this.dialog = dialog;
                }} />
            </View>
        )
    }

    _clickIcon(){
        if(this.state.isLogin){
            this.showAlertSelected();
        }else{
            this.props.navigator.push({// 活动跳转，以Navigator为容器管理活动页面
                name:'LoginContainer',
                component: LoginContainer,
                // passProps: {contentData}// 传递的参数（可选）,{}里都是键值对  ps: test是关键字
            })
        }
    }
    showAlertSelected(){
        this.dialog.show("请选择照片", selectedArr, '#333333', this.callbackSelected);
    }
    // 回调
    callbackSelected(i){
        switch (i){
            case 0: // 拍照
                this.takePhoto();
                break;
            case 1: // 图库
                this.pickMultiple();
                break;
        }
    }

    takePhoto(){
        ImagePicker.openCamera({
            width: 80,
            height: 80,
            cropping: false,
            // compressImageMaxWidth:100,
            // compressImageMaxHeight:100,
            compressImageQuality:1,
            cropperCircleOverlay:false
        }).then(image => {
            // let source = { uri: image.uri };
            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };
            this.setState({
                avatarSource: {uri:image.path}
            });
            Storage.save('iconimage',image.path);
            console.log(image);
        });

    }
    pickMultiple(){
        ImagePicker.openPicker({
            width: 80,
            height: 80,
            // compressImageMaxWidth:100,
            // compressImageMaxHeight:100,
            compressImageQuality:1,
            cropping: false,
            cropperCircleOverlay:false
        }).then(image => {
            this.setState({
                avatarSource: {uri:image.path}
            });
            Storage.save('iconimage',image.path);
            console.log('图片信息='+JSON.stringify(image));
            console.log('takePhoto--image.path='+image.path);
        });
    }

    _skipIntoAccountManage(content) {
        // Toast.show(content, {position: Toast.positions.CENTER});
        if(content=="我的认证"){
            Storage.get("isLogin").then((value) => {
                if(value){
                    this.props.navigator.push({// 活动跳转，以Navigator为容器管理活动页面
                        name:'IdentificationContainer',
                        component: IdentificationContainer,
                        // passProps: {contentData}// 传递的参数（可选）,{}里都是键值对  ps: test是关键字
                    })// push一个route对象到navigator中
                }else{
                    InteractionManager.runAfterInteractions(() => {
                        const {dispatch} = this.props;
                        let data={};
                        console.log('data===------------>'+JSON.stringify(data));
                        dispatch(GetUserInfo(data));
                    });

                    this.props.navigator.push({// 活动跳转，以Navigator为容器管理活动页面
                        name:'LoginContainer',
                        component: LoginContainer,
                        // passProps: {contentData}// 传递的参数（可选）,{}里都是键值对  ps: test是关键字
                    });
                }
            });
        }else if(content=="我的优惠券"){
            Storage.get("isLogin").then((value) => {
                if(value){
                    this.props.navigator.push({// 活动跳转，以Navigator为容器管理活动页面
                        name:'CouponContainer',
                        component: CouponContainer,
                        // passProps: {contentData}// 传递的参数（可选）,{}里都是键值对  ps: test是关键字
                    })
                }else{
                    this.props.navigator.push({// 活动跳转，以Navigator为容器管理活动页面
                        name:'LoginContainer',
                        component: LoginContainer,
                        // passProps: {contentData}// 传递的参数（可选）,{}里都是键值对  ps: test是关键字
                    });
                }
            });
        }else if(content=="设置"){
            this.props.navigator.push({// 活动跳转，以Navigator为容器管理活动页面
                name:'SetContainer',
                component: SetContainer,
                // passProps: {contentData}// 传递的参数（可选）,{}里都是键值对  ps: test是关键字
            })
        }else if(content=="客服与反馈"){
            this.props.navigator.push({// 活动跳转，以Navigator为容器管理活动页面
                component: CustomServicePage,
                // passProps:{title: '常见问题',url: Common.url.questionUrl}
            })
        }else if(content=="常见问题"){
                this.props.navigator.push({// 活动跳转，以Navigator为容器管理活动页面
                    component: WebViewPage,
                    passProps:{title: '常见问题',url: Common.url.questionUrl}
                })
        }else if(content=="登录"){
            this.props.navigator.push({// 活动跳转，以Navigator为容器管理活动页面
                name:'LoginContainer',
                component: LoginContainer,
                // passProps: {contentData}// 传递的参数（可选）,{}里都是键值对  ps: test是关键字
            })
        }else if(content=="注册"){
            this.props.navigator.push({// 活动跳转，以Navigator为容器管理活动页面
                name:'RegisterContainer',
                component: RegisterContainer,
                // passProps: {contentData}// 传递的参数（可选）,{}里都是键值对  ps: test是关键字
            })
        }else if(content=="审核中心"){
            Storage.get("isLogin").then((value) => {
                if(value){
                    this.props.navigator.push({// 活动跳转，以Navigator为容器管理活动页面
                        name:'CheckContainer',
                        component: CheckContainer,
                        // passProps: {contentData}// 传递的参数（可选）,{}里都是键值对  ps: test是关键字
                    })
                }else{
                    this.props.navigator.push({// 活动跳转，以Navigator为容器管理活动页面
                        name:'LoginContainer',
                        component: LoginContainer,
                        // passProps: {contentData}// 传递的参数（可选）,{}里都是键值对  ps: test是关键字
                    });
                }
            });
        }else if(content=='关于'){
            this.props.navigator.push({// 活动跳转，以Navigator为容器管理活动页面
                component: AboutPage,
                // passProps:{title: '常见问题',url: Common.url.questionUrl}
            })
        }
    }
}

const styles = StyleSheet.create({
    container1: {
        backgroundColor: Common.colors.gray6,
    },
    container2: {
        flex:1,
        backgroundColor: Common.colors.gray6,
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
    drawertext1: {
        marginLeft: 8,
        color: Common.colors.black,
        fontSize: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lendMoney: {
        fontSize: 18,
        marginTop: 5,
        color: Common.colors.yellow1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});