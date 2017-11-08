'use strict'
import React, {Component} from 'react'
import {View, Platform, Text, StyleSheet, Image, TouchableOpacity, ScrollView, InteractionManager,ListView,RefreshControl,
    BackHandler,StatusBar} from 'react-native'
import Swiper from 'react-native-swiper';
import Common from '../util/constants';
import Toast from 'react-native-root-toast';

const Images = [{src: require('../images/banner/banner8.jpg')}, {src: require('../images/banner/banner9.jpg')}];

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
import {GetHomeInfo} from '../actions/homeActions'
import TakeOrderContainer from '../containers/TakeOrderContainer'
import MessageContainer from '../containers/MessageContainer'
import WebViewPage from '../pages/WebViewPage'
import LoginContainer from '../containers/LoginContainer'
import CheckNameContainer from '../containers/CheckNameContainer'
import CheckSchoolContainer from '../containers/CheckSchoolContainer'
import CheckWorkContainer from '../containers/CheckWorkContainer'
import CheckPhoneContainer from '../containers/CheckPhoneContainer'
import CheckContactContainer from '../containers/CheckContactContainer'
import Load from '../components/Load';
import Storage from '../util/Storage'
import NetWorkTool from '../util/NetWorkTool'
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var state='iphone8';
var isRefreshing=true;
var isLoadMore=false;
export default class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            isError: false,
            isClickItem:false,
            isLoading: true,
            isSecltor8: true,
            isSecltor8p: false,
            deadprice:'',
            yuqi:'',
            id:'',
            name:'',
            price:'',
            deadline:'',
            deadunit:'',
            serverfee:'',
            dataSource:ds.cloneWithRows([])
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
        console.log('onBackAndroid===----home-------->'+this.props.navigator.getCurrentRoutes());
        if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
            //最近2秒内按过back键，可以退出应用。
            return false;
        }
        this.lastBackPressed = Date.now();
        Toast.show('再按一次退出应用'
            , {position:Toast.positions.CENTER});

        return true;
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
            const {homeReducer} = this.props;
            console.log('homeReducer.isSuccess===------------>'+homeReducer.isSuccess);
            if (homeReducer.isSuccess) {
                // this.props.navigator.popToTop();
                homeReducer.isSuccess=false;
                // let Data=homeReducer.Data;
                let data = homeReducer.Data;
                for (var i in data) {
                    if (data.hasOwnProperty(i)) { //filter,只输出man的私有属性
                        this.setState({
                            deadprice:data[0].deadprice,
                            yuqi:data[0].expiryrate*100+"%",
                            id:data[0].id,
                            name:data[0].name,
                            deadline:data[0].deadline,
                            deadunit:data[0].deadunit,
                            serverfee:data[0].serverfee,
                            price:data[0].price,
                        })
                    }
                }
            }
        });
    }
    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            NetWorkTool.checkNetworkState((isConnected)=>{
                if(!isConnected){
                    Toast.show(NetWorkTool.NOT_NETWORK);
                    return;
                }else{
                    const {dispatch} = this.props;
                    let data={'reload ':true};
                    console.log('data===------------>'+JSON.stringify(data));
                    dispatch(GetHomeInfo(data,this.state.isLoading,isRefreshing,isLoadMore));
                }
            });
        });
    }

    _renderSwiper() {
        return (
            <Swiper
                height={200}
                loop={true}
                autoplay={true}
                dot={<View style={styles.customDot}/>}
                activeDot={<View style={styles.customActiveDot}/>}
                paginationStyle={{
                    bottom: 10
                }}
                autoplayTimeout={2}
            >

                <View style={styles.swiperItem}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => this._skipIntoAccountManage("图片1")}>
                        <Image style={styles.img} source={Images[0].src}></Image>
                    </TouchableOpacity>
                </View>
                <View style={styles.swiperItem}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => this._skipIntoAccountManage("图片2")}>
                        <Image style={styles.img} source={Images[1].src}></Image>
                    </TouchableOpacity>
                </View>
                {/*<View style={styles.swiperItem}>*/}
                    {/*<TouchableOpacity*/}
                        {/*activeOpacity={1}*/}
                        {/*onPress={() => this._skipIntoAccountManage("图片3")}>*/}
                        {/*<Image style={styles.img} source={Images[2].src}></Image>*/}
                    {/*</TouchableOpacity>*/}
                {/*</View>*/}
                {/*<View style={styles.swiperItem}>*/}
                    {/*<TouchableOpacity*/}
                        {/*activeOpacity={1}*/}
                        {/*onPress={() => this._skipIntoAccountManage("图片4")}>*/}
                        {/*<Image style={styles.img} source={Images[3].src}></Image>*/}
                    {/*</TouchableOpacity>*/}
                {/*</View>*/}
            </Swiper>
        )
    }

    render() {

        const {homeReducer} = this.props;
        // let Data=homeReducer.Data;
        let data = homeReducer.Data;
        let isLoading = homeReducer.isLoading;


        let content;

        content=(
            <View style={styles.container}>
                {isLoading ?
                   null :
                    <View style={{flex: 1, flexDirection: 'column'}}>

                        <ListView
                            dataSource={this.state.dataSource.cloneWithRows(data)}
                            renderRow={this._renderItem.bind(this)}
                            // initialListSize={1}
                            enableEmptySections={true}
                            // onEndReached={this._onEndReach.bind(this)}
                            // onEndReachedThreshold={30}
                            // renderFooter={this._renderFooter.bind(this)}
                            // style={{height: Common.window.height - 64}}
                            refreshControl={
                                <RefreshControl
                                    refreshing={homeReducer.isRefreshing}
                                    onRefresh={this._onRefresh.bind(this)}
                                    title="正在加载中……"
                                    color={Common.colors.red}
                                />
                            }
                        />
                    </View>
                }
            </View>
        )
        // let deadprice=data.deadprice;
        // console.log('data===------------>'+data.deadprice);

        return (
            <View style={styles.container2}>
                <StatusBar
                    hidden={false}
                    animated={false}
                    barStyle={'light-content'}
                    backgroundColor={'blue'}
                    translucent={true}
                />
            <ScrollView
                // iosalwaysBounceVertical={false}
                automaticallyAdjustContentInsets={true}
                // bounces={false}
                // iosbounces={false}
                style={styles.container1}>
                {this._renderSwiper()}
                <View style={{flex:1,position:'absolute',top:25,right:15}}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => this._clickMessage("消息中心")}>
                        <Image source={require('../images/set/iconfont_tixing.png')} style={{
                            width: 30,
                            height: 30,
                        }}/>
                    </TouchableOpacity>
                </View>

                <View style={styles.secondLine}>
                    <View style={{flex: 1}}>
                            <View style={styles.check}>
                                {/*<Image source={require('../images/order/icon_shenhecenter.png')} style={{*/}
                                {/*width: 45,*/}
                                {/*height: 45,*/}
                                {/*justifyContent: 'center',*/}
                                {/*alignItems: 'center',*/}
                                {/*}}/>*/}
                                <Text style={styles.drawertext}>每期应还</Text>
                                <Text style={styles.lendMoney}>{this.state.deadprice}元</Text>
                            </View>
                    </View>
                    <View style={{width:1,backgroundColor:Common.colors.gray6,alignItems:'center',justifyContent:'center'}}/>
                    <View style={{flex: 1}}>
                            <View style={styles.pay}>

                                {/*<Image source={require('../images/order/icon_huankuanzhing.png')} style={{*/}
                                {/*width: 45,*/}
                                {/*height: 45,*/}
                                {/*justifyContent: 'center',*/}
                                {/*alignItems: 'center',*/}
                                {/*}}/>*/}
                                <Text style={styles.drawertext}>逾期率</Text>
                                <Text style={styles.lendMoney}>{this.state.yuqi}</Text>
                            </View>
                    </View>
                </View>
                <View style={styles.thirdLine}>
                    <Text style={styles.thirdText}>乐享租产品</Text>
                </View>
                {content}
                <View style={{paddingTop: 5, paddingBottom: 15}}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => this._skipIntoWeb("了解逾期后果")}>
                        <Text style={{
                            textAlign: 'right',
                            fontSize: 15,
                            color: Common.colors.blue,
                            marginRight: 20,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>了解逾期后果</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => this._takeOrder()}>
                    <View style={{
                        marginTop:5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom:10
                    }}>
                        <Text style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor:Common.colors.yellow2,
                            color: Common.colors.white,
                            paddingTop:10,
                            paddingBottom:10,
                            paddingLeft:50,
                            paddingRight:50,
                            fontSize: 18,
                            borderRadius: 20
                        }}>马上申请</Text>
                    </View>
                </TouchableOpacity>
                <Load
                    transparent={true}
                    visible={isLoading}
                    color={Common.colors.loadblue}
                    overlayColor={Common.colors.transparent}
                    size={'large'}
                />
            </ScrollView>
            </View>
        );
    }

    _renderItem(contentData){
        // avatarSource: {uri:image.path}
        let state='';
        let pic='';
        if(this.state.isSecltor8){
            if(contentData.name=='iphone8'){
                pic=require('../images/other/icon_iphone8.png');
                state=require('../images/other/icon_seclect.png');
            }else{
                pic=require('../images/other/icon_iph8plus.png');
                state=require('../images/other/icon_unseclect.png');
            }
        }else{
            if(contentData.name=='iphone8'){
                pic=require('../images/other/icon_iphone8.png');
                state=require('../images/other/icon_unseclect.png');
            }else{
                pic=require('../images/other/icon_iph8plus.png');
                state=require('../images/other/icon_seclect.png');
            }
        }
        return(
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => this._clickItem(contentData.name,contentData.id,contentData.deadunit,contentData.deadline,contentData.deadprice,contentData.expiryrate,contentData.serverfee,contentData.price)}>
            <View style={{flexDirection: 'row',justifyContent:'center',alignItems:'center',
                backgroundColor:Common.colors.white,
                paddingLeft:25,paddingTop:5,paddingBottom:5,paddingRight:10,borderBottomColor: Common.colors.bottomlinecolor,
                borderBottomWidth: 1}}>
                <Image source={pic} style={{
                    width: 30,
                    height: 60,
                    alignItems:'center',
                    justifyContent:'center'
                }}/>
                <View style={{flex:1,justifyContent:'center'}}>

                    <Text style={{color:Common.colors.black,fontSize:20,marginLeft:10}}>{contentData.name}</Text>
                    <Text style={{color:Common.colors.gray7,fontSize:12,marginLeft:10,marginTop:5}}>借款分期:{contentData.deadline}期</Text>
                </View>
                <Image source={state}
                       style={{padding:10,marginRight:20,width: 20,
                           height: 20,}}/>

            </View>
            </TouchableOpacity>
        )
    }

    // 下拉刷新
    _onRefresh() {
        InteractionManager.runAfterInteractions(() => {
            const {dispatch} = this.props;
            let data={'reload ':true};
            console.log('data===------------>'+JSON.stringify(data));
            isRefreshing=true;
            dispatch(GetHomeInfo(data,this.state.isLoading,isRefreshing,isLoadMore));
        });

    }

    _skipIntoWeb(){
        this.props.navigator.push({// 活动跳转，以Navigator为容器管理活动页面
            component: WebViewPage,
            passProps:{title: '逾期后果',url: Common.url.outTimeUrl}//http://114.67.154.29/agreement.html
        })
    }
    _clickItem(name,id,deadunit,deadline,deadprice,expiryrate,serverfee,price) {
        if(name=="iphone8" ||name==""){
            this.setState({
                isSecltor8: true,
                deadprice:deadprice,
                yuqi:expiryrate*100+"%",
                id:id,
                name:name,
                deadline:deadline,
                deadunit:deadunit,
                serverfee:serverfee,
                price:price,
                isClickItem:true,
            })
        }else{
            this.setState({
                isSecltor8: false,
                deadprice:deadprice,
                yuqi:expiryrate*100+"%",
                id:id,
                name:name,
                deadline:deadline,
                deadunit:deadunit,
                serverfee:serverfee,
                price:price,
                isClickItem:true,
            })
        }
        // Toast.show(name, {position: Toast.positions.CENTER});
    }

    _skipIntoAccountManage(content){
        // Toast.show(content, {position: Toast.positions.CENTER});
    }
    _clickMessage(content){
        this.props.navigator.push({// 活动跳转，以Navigator为容器管理活动页面
            name:'MessageContainer',
            component: MessageContainer,
            // passProps: {product_id:product_id}// 传递的参数（可选）,{}里都是键值对  ps: test是关键字
        })
    }
    _takeOrder(){
        Storage.get("isLogin").then((value) => {
            if(value){
                Storage.get("name").then((value) => {
                    if(value){
                        Storage.get('school').then((value) => {
                            if(value){
                                Storage.get('work').then((value) => {
                                    if(value){
                                        Storage.get('phone').then((value) => {
                                            if(value){
                                                Storage.get('contact').then((value) => {
                                                    if(value){
                                                        let product_id=this.state.id;
                                                        let name=this.state.name;
                                                        let price=this.state.price;
                                                        let deadline=this.state.deadline;
                                                        let deadunit=this.state.deadunit;
                                                        let deadprice=this.state.deadprice;
                                                        let serverfee=this.state.serverfee;

                                                        this.props.navigator.push({// 活动跳转，以Navigator为容器管理活动页面
                                                            name:'TakeOrderContainer',
                                                            component: TakeOrderContainer,
                                                            passProps: {product_id:product_id,name:name,deadline:deadline,deadunit:deadunit,deadprice:deadprice,serverfee:serverfee,price:price}// 传递的参数（可选）,{}里都是键值对  ps: test是关键字
                                                        })// push一个route对象到navigator中
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
                    }else{
                        this.props.navigator.push({// 活动跳转，以Navigator为容器管理活动页面
                            name:'CheckNameContainer',
                            component: CheckNameContainer,
                            passProps: {isNeedSkip:true}// 传递的参数（可选）,{}里都是键值对  ps: test是关键字
                        });
                        return;
                    }
                });
            }else{
                this.props.navigator.push({// 活动跳转，以Navigator为容器管理活动页面
                    name:'LoginContainer',
                    component: LoginContainer,
                    // passProps: {contentData}// 传递的参数（可选）,{}里都是键值对  ps: test是关键字
                });
            }
        });
    }
}
const styles = StyleSheet.create({
    container2: {
        backgroundColor: Common.colors.yellow3,
    },
    container1: {
        backgroundColor: Common.colors.gray6,
    },
    swiperItem: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    swiper: {},
    img: {
        width: Common.window.width,
        height: 200,
        resizeMode:'stretch'
    },
    customDot: {
        backgroundColor: Common.colors.white,
        height: 8,
        width: 8,
        borderRadius: 4,
        marginLeft: 2,
        marginRight: 2,
        marginTop: 2,
    },
    customActiveDot: {
        backgroundColor: Common.colors.bluelogin,
        height: 8,
        width: 8,
        borderRadius: 4,
        marginLeft: 2,
        marginRight: 2,
        marginTop: 2,
    },
    secondLine: {
        backgroundColor: Common.colors.white,
        flexDirection: 'row',
        paddingTop: 15,
        paddingBottom: 15,
        borderBottomColor: Common.colors.bottomlinecolor,
        borderBottomWidth: 1
    },
    thirdLine: {
        backgroundColor: Common.colors.white,
        flexDirection: 'row',
        marginTop: 10,
        paddingTop: 15,
        alignItems: 'center',
        paddingBottom: 5,
        paddingLeft: 20,
        borderBottomColor: Common.colors.bottomlinecolor,
        borderBottomWidth: 1
    },
    thirdLine2: {
        backgroundColor: Common.colors.white,
        flexDirection: 'row',
        paddingTop: 15,
        alignItems: 'center',
        paddingBottom: 5,
        paddingLeft: 20,
        // borderBottomColor: Common.colors.bottomlinecolor,
        // borderBottomWidth: 1
    },
    fourdLine: {
        backgroundColor: Common.colors.white,
        flexDirection: 'row',
        borderBottomColor: Common.colors.bottomlinecolor,
        borderBottomWidth: 1
    },
    check: {
        backgroundColor: Common.colors.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pay: {
        backgroundColor: Common.colors.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    drawertext: {
        marginLeft: 8,
        color: Common.colors.black,
        fontSize: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    thirdText: {
        color: Common.colors.black,
        fontSize: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    date: {
        fontSize: 18,
        color: Common.colors.black,
        alignItems: 'center',

    },
    lendMoney: {
        fontSize: 18,
        marginTop: 5,
        color: Common.colors.yellow2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fiveText: {
        color: Common.colors.black,
        fontSize: 15,
        alignItems: 'center',
    },

});