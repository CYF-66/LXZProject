'use strict'
import React, {Component} from 'react'
import {
    View,
    ScrollView,
    RefreshControl,
    Image,
    TouchableOpacity,
    Text,
    BackHandler,
    StyleSheet,
    Platform
} from 'react-native'
//引入标题支持包
// import SetPage from 'SetPage'
import Common from '../util/constants';
import NavigationBar from 'react-native-navigationbar'
import Toast from 'react-native-root-toast';
import {CheckPhone} from '../actions/myActions'
import Storage from '../util/Storage'
export default class CustomServicePage extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            isError: false,
            isLoading: true,
            phone: '',
            kf_name:'',
            kf_wechat:''
            // typeList: {}
        })
    }

    // componentWillUpdate() {
    //     InteractionManager.runAfterInteractions(() => {
    //         const {checkReducer} = this.props;
    //         console.log('checkReducer.isCheckPhone===------------>'+checkReducer.isCheckPhone);
    //         if (checkReducer.isCheckPhone) {
    //             this.props.navigator.popToTop();
    //             checkReducer.isCheckPhone=false;
    //         }
    //     });
    //
    // }
    componentWillMount() {
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
        Storage.get("kf_name").then((value) => {
            this.setState({
                kf_name: value
            })
        });
        Storage.get("kf_wechat").then((value) => {
            this.setState({
                kf_wechat: value
            })
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

    render() {
        return (
            <View style={styles.container} needsOffscreenAlphaCompositing renderToHardwareTextureAndroid>
                <NavigationBar
                    backIconHidden={false}
                    barTintColor={Common.colors.yellow3}
                    barStyle={styles.navbar}
                    title='客服与反馈'
                    titleColor={Common.colors.white}
                    backColor={Common.colors.white}
                    backFunc={() => {
                        this.props.navigator.pop()
                    }}
                    // actionName='提交'
                    // actionTextColor={Common.colors.white}
                    // actionFunc={() => {
                    //     Toast.show('提交', {position: Toast.positions.CENTER});
                    //     // this.props.navigator.push({
                    //     //     component: AboutPage
                    //     // })
                    // }}
                />

                <View style={{flexDirection:'row',justifyContent:'center',marginTop:30,backgroundColor:Common.colors.white,paddingTop:20,paddingBottom:20}}>
                    <Image source={require('../images/set/icon_kefuphone.png')} style={{
                        width: 80,
                        height: 80,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}/>
                    <View style={{marginLeft:10,alignItems: 'center',
                        justifyContent: 'center'}}>
                        <Text style={{color:Common.colors.black,fontSize:20}}>
                            400-006-0918
                        </Text>
                        <Text style={{color:Common.colors.qianblack,fontSize:18,marginTop:10}}>
                            服务时间：9:00~21:00
                        </Text>
                    </View>
                </View>

                <View style={{flexDirection:'row',padding:15,marginTop:30,borderBottomWidth: 1,backgroundColor:Common.colors.white,
                    borderBottomColor: Common.colors.bottomlinecolor,}}>
                    <Text style={{flex:1,color:Common.colors.qianblack,fontSize:18}}>
                       客服姓名
                    </Text>
                    <Text style={{color:Common.colors.gray1,fontSize:15}}>
                        {this.state.kf_name}
                    </Text>
                </View>
                {/*<View style={{flexDirection:'row',padding:15,borderBottomWidth: 1,*/}
                    {/*borderBottomColor: Common.colors.bottomlinecolor,}}>*/}
                    {/*<Text style={{flex:1,color:Common.colors.black,fontSize:20}}>*/}
                       {/*客服邮箱*/}
                    {/*</Text>*/}
                    {/*<Text style={{color:Common.colors.gray1,fontSize:15}}>*/}
                        {/*help@llll.com*/}
                    {/*</Text>*/}
                {/*</View>*/}
                <View style={{flexDirection:'row',padding:15,borderBottomWidth: 1,backgroundColor:Common.colors.white,
                    borderBottomColor: Common.colors.bottomlinecolor,}}>
                    <Text style={{flex:1,color:Common.colors.black,fontSize:18}}>
                       客服微信
                    </Text>
                    <Text style={{color:Common.colors.gray1,fontSize:15}}>
                        {this.state.kf_wechat}
                    </Text>
                </View>
                {/*<View style={{flexDirection:'row',padding:15,borderBottomWidth: 1,*/}
                    {/*borderBottomColor: Common.colors.bottomlinecolor,}}>*/}
                    {/*<Text style={{flex:1,color:Common.colors.black,fontSize:20}}>*/}
                        {/*微信公众号*/}
                    {/*</Text>*/}
                    {/*<Text style={{color:Common.colors.gray1,fontSize:15}}>*/}
                        {/*llll.com*/}
                    {/*</Text>*/}
                {/*</View>*/}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Common.colors.gray8,
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