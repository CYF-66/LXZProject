'use strict'
import React, {Component} from 'react'
import {
    View,
    ListView,
    RefreshControl,
    TouchableOpacity,
    BackHandler,
    Text,
    Image,
    StyleSheet,
    InteractionManager,
    Platform
} from 'react-native'
//引入标题支持包
import NavigationBar from 'react-native-navigationbar'
import Toast from 'react-native-root-toast';
import Common from '../util/constants';
import {GetOrderDetail} from '../actions/orderActions'
import Load from '../components/Load';
import NetWorkTool from '../util/NetWorkTool'
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var isRefreshing = false;
var isLoadMore = false;
export default class RepaymentPage extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            isError: false,
            isLoading: true,
            dataSource: ds.cloneWithRows([])
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
    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            NetWorkTool.checkNetworkState((isConnected)=>{
                if(!isConnected){
                    Toast.show(NetWorkTool.NOT_NETWORK);
                    return;
                }else{
                    const {dispatch} = this.props;
                    let data = {'book_id': this.props.book_id};
                    console.log('data===------------>' + JSON.stringify(data));
                    dispatch(GetOrderDetail(data, this.state.isLoading, isRefreshing, isLoadMore));
                }
            });

        });
    }

    render() {

        const {orderReducer} = this.props;
        // let Data=homeReducer.Data;
        let data = orderReducer.orderDetailsData;
        let isLoading = orderReducer.isLoading;
        // console.log('orderReducer.data.bills===------------>'+JSON.stringify(data.bills));

        var orderData = [];//结清账单
        for (var i in data.bills) {
            if (data.bills.hasOwnProperty(i)) {
                orderData.push(data.bills[i]);
            }
        }
        console.log('orderData===------------>' + JSON.stringify(orderData));
        let content;
        content = (
            <View style={styles.container}>
                {isLoading ?
                    null :
                    <View style={{flex: 1, flexDirection: 'column'}}>
                        <ListView
                            dataSource={this.state.dataSource.cloneWithRows(orderData)}
                            renderRow={this._renderItem.bind(this)}
                            // initialListSize={1}
                            enableEmptySections={true}
                            // onScroll={this._onScroll}
                            // onEndReached={this._onEndReach.bind(this)}
                            // onEndReachedThreshold={30}
                            // renderFooter={this._renderFooter.bind(this)}
                            // style={{height: Common.window.height - 64}}
                            refreshControl={
                                <RefreshControl
                                    refreshing={orderReducer.isRefreshing}
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
        return (
            <View style={styles.container} needsOffscreenAlphaCompositing renderToHardwareTextureAndroid>
                <NavigationBar
                    backIconHidden={false}
                    barTintColor={Common.colors.yellow3}
                    barStyle={styles.navbar}
                    title={this.props.Title}
                    titleColor={Common.colors.white}
                    backColor={Common.colors.white}
                    backFunc={() => {
                        this.props.navigator.pop()
                    }}
                />

                <View style={{backgroundColor: Common.colors.yellow2, height: 100, width: Common.window.width}}>

                </View>
                <View style={{
                    position: 'absolute',
                    left: 10,
                    top: 80,
                    right: 10, backgroundColor: Common.colors.white, borderRadius: 5, height: 160
                }}>

                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: Common.colors.brown1, fontSize: 15, marginTop: 15}}>
                            还款总额(元)
                        </Text>
                        <Text style={{color: Common.colors.yellow3, fontSize: 25, marginTop: 3}}>
                            {data.remainfee}
                        </Text>
                        <Text style={{color: Common.colors.brown1, fontSize: 10, marginTop: 3}}>
                            结算日期:{data.repaydate}
                        </Text>
                    </View>
                    <Image source={require('../images/order/icon_use.png')} style={{
                        position: 'absolute',
                        top: 25,
                        right: 25,
                        width: 60,
                        height: 60,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}/>
                    <View style={{backgroundColor: Common.colors.gray6, height: 2, marginTop: 10}}/>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 15,
                        marginBottom: 20
                    }}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

                            <Text style={{color: Common.colors.brown1, fontSize: 12}}>
                                本期应还(元)
                            </Text>
                            <Text style={{color: Common.colors.yellow3, fontSize: 12, marginTop: 5}}>
                                {data.currrepay}
                            </Text>
                        </View>
                        <View style={{
                            height: 30,
                            width: 1,
                            backgroundColor: Common.colors.yellow2,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}/>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

                            <Text style={{color: Common.colors.brown1, fontSize: 12}}>
                                应还总额(元)
                            </Text>
                            <Text style={{color: Common.colors.yellow3, fontSize: 12, marginTop: 5}}>
                                {data.remainfee}
                            </Text>
                        </View>
                        <View style={{
                            height: 30,
                            width: 1,
                            backgroundColor: Common.colors.yellow2,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}/>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

                            <Text style={{color: Common.colors.brown1, fontSize: 12}}>
                                产品金额(元)
                            </Text>
                            <Text style={{color: Common.colors.yellow3, fontSize: 12, marginTop: 5}}>
                                {data.price}
                            </Text>
                        </View>
                    </View>

                </View>
                <View style={{backgroundColor: Common.colors.white, marginTop: 60}}>
                    <View style={{backgroundColor: Common.colors.brown2, height: 5, marginLeft: 10, marginRight: 10}}/>

                    <View style={{paddingTop: 10}}>
                        <Text style={{
                            marginLeft: 10,
                            marginRight: 10,
                            paddingBottom: 3,
                            color: Common.colors.black,
                            fontSize: 15,
                            borderBottomColor: Common.colors.bottomlinecolor,
                            borderBottomWidth: 1
                        }}>
                            全部账单
                        </Text>
                        <Text style={{
                            marginLeft: 10, marginRight: 10, color: Common.colors.yellow3, fontSize: 12
                            , paddingTop: 5, paddingBottom: 5
                        }}>
                            结清账单
                        </Text>
                    </View>
                </View>
                {content}
                <View style={{
                    position: 'absolute',
                    backgroundColor: Common.colors.white,
                    paddingTop: 10,
                    paddingBottom: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: Common.window.width,
                    bottom: 0,
                }}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => this._skipIntoAccountManage("立即还款")}>
                        <Text style={{
                            alignItems: 'center',
                            fontSize: 18, color: Common.colors.black
                        }}>
                            立即还款
                        </Text>
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

    _renderItem(contentData) {

        var isNeedPay;
        if(contentData.state=='2'){
            isNeedPay=false;
        }else{
            isNeedPay=true;
        }
        return (
            <View style={styles.container}>
                    <View style={{
                        backgroundColor: Common.colors.gray5,
                        borderRadius: 5,
                        marginTop: 10,
                        marginLeft: 10,
                        marginRight: 10
                    }}>

                        <View style={{
                            backgroundColor: Common.colors.white,
                            borderRadius: 5,
                            margin: 1,
                            paddingLeft: 10,
                            paddingRight: 10
                        }}>
                            <View style={{
                                flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                                borderBottomColor: Common.colors.bottomlinecolor,
                                borderBottomWidth: 1
                            }}>

                                <Image source={require('../images/other/icon_iphone8.png')} style={{
                                    width: 30,
                                    height: 60,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}/>
                                <View style={{flex: 1, justifyContent: 'center', marginBottom: 5}}>

                                    <Text style={{
                                        color: Common.colors.black,
                                        fontSize: 15,
                                        marginLeft: 10
                                    }}>{contentData.product}</Text>
                                    <Text style={{
                                        color: Common.colors.gray7,
                                        fontSize: 12,
                                        marginLeft: 10,
                                        marginTop: 3
                                    }}>{contentData.period}/10期</Text>

                                    <Text style={{
                                        color: Common.colors.gray7,
                                        fontSize: 12,
                                        marginLeft: 10,
                                        marginTop: 3
                                    }}>{contentData.repayfee}(含服务费{contentData.servicefee}，逾期费:{contentData.expiryfee})</Text>
                                </View>
                                {/*<View style={{justifyContent: 'center',marginTop:15}}>*/}
                                <Text style={{fontSize: 12, color: Common.colors.gray1}}>
                                    还款日 {contentData.targetdate}
                                </Text>
                                <View style={{flexDirection:'row',position: 'absolute',bottom: 5,
                                    right: 5,justifyContent:'center' }}>

                                    <Text style={{
                                        fontSize: 10, color: Common.colors.yellow3,
                                        paddingLeft: 5,
                                        paddingRight: 5,
                                        borderRadius: 5
                                    }}>
                                        {contentData.statenm}
                                    </Text>
                                    {isNeedPay ? <View>
                                        <TouchableOpacity
                                            activeOpacity={0.9}
                                            onPress={() => this._skipIntoAccountManage("还款")}>
                                            <Text style={{
                                                backgroundColor: Common.colors.yellow3,
                                                fontSize: 12, color: Common.colors.white,
                                                paddingLeft: 5,
                                                paddingRight: 5,
                                                borderRadius: 5
                                            }}>
                                                还款
                                            </Text>
                                        </TouchableOpacity>
                                    </View> : null}

                                </View>

                                {/*</View>*/}
                            </View>
                        </View>
                    </View>
            </View>
        )
    }

    // 下拉刷新
    _onRefresh() {

        InteractionManager.runAfterInteractions(() => {
            NetWorkTool.checkNetworkState((isConnected)=>{
                if(!isConnected){
                    Toast.show(NetWorkTool.NOT_NETWORK);
                    return;
                }else{
                    const {dispatch} = this.props;
                    let data = {'book_id': this.props.book_id};
                    console.log('data===------------>' + JSON.stringify(data));
                    dispatch(GetOrderDetail(data, this.state.isLoading, isRefreshing, isLoadMore));
                }
            });
        });

    }

    _skipIntoAccountManage(content) {
        if(content=='还款'){
            Toast.show("暂未开通支付宝支付，请手动转账", {position: Toast.positions.CENTER});
        }else if(content=='立即还款'){
            Toast.show("暂未开通支付宝支付，请手动转账", {position: Toast.positions.CENTER});
        }
        // this.props.navigator.push({// 活动跳转，以Navigator为容器管理活动页面
        //     name:'SetContainer',
        //     component: SetContainer,
        //     // passProps: {contentData}// 传递的参数（可选）,{}里都是键值对  ps: test是关键字
        // })// push一个route对象到navigator中
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Common.colors.gray4,
    },
    secondLine: {
        backgroundColor: Common.colors.white,
        flexDirection: 'row',
        paddingTop: 10,
        alignItems: 'center',
        paddingBottom: 10,
        borderBottomColor: Common.colors.bottomlinecolor,
        borderBottomWidth: 1
    },
    secondLineItem: {
        backgroundColor: Common.colors.white,
        alignItems: 'center',
        borderBottomColor: Common.colors.bottomlinecolor,
        borderBottomWidth: 1
    },
    PayTitle: {
        marginLeft: 8,
        fontSize: 15,
        color: Common.colors.black,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Pay: {
        marginLeft: 15,
        marginTop: 10,
        color: Common.colors.red,
        fontSize: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    orderState: {
        flexDirection: 'row',
        alignItems: 'center',

    },
});