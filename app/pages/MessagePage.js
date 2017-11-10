'use strict'
import React, {Component} from 'react'
import {
    View,
    ScrollView,
    RefreshControl,
    Image,
    Platform,
    Text,
    BackHandler,
    ListView,
    StyleSheet,
    InteractionManager
} from 'react-native'
//引入标题支持包
// import SetPage from 'SetPage'
import Common from '../util/constants';
import NavigationBar from 'react-native-navigationbar'
import Toast from 'react-native-root-toast';
import {GetMessage} from '../actions/homeActions'
import Load from '../components/Load';
import NetWorkTool from '../util/NetWorkTool'
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var isRefreshing=false;
var isLoadMore=false;
export default class MessagePage extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            isError: false,
            isLoading: true,
            currentPage:'1',
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
                    let data={'pageNum':this.state.currentPage};
                    console.log('data===------------>'+JSON.stringify(data));
                    dispatch(GetMessage(data,this.state.isLoading,isRefreshing,isLoadMore));
                }
            });
        });
    }

    render() {

        const {homeReducer} = this.props;
        // let Data=homeReducer.Data;
        let data = homeReducer.msgData;
        let isLoading = homeReducer.isLoading;
        let content;
        content = (
            <View style={styles.container}>
                {isLoading ?
                    null :
                    <View style={{flex: 1, flexDirection: 'column'}}>
                        <ListView
                            dataSource={this.state.dataSource.cloneWithRows(data)}
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
        return (
            <View style={styles.container} needsOffscreenAlphaCompositing renderToHardwareTextureAndroid>
                <NavigationBar
                    backIconHidden={false}
                    barTintColor={Common.colors.yellow3}
                    barStyle={styles.navbar}
                    title='消息'
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
                {content}
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

    _renderItem(contentData){
        return(
            <View style={styles.container}>

                <View style={{flexDirection:'row',paddingLeft:10,paddingTop:15,paddingRight:10,marginBottom:3}}>
                    <Image source={require('../images/other/icon_redpoint.png')} style={{
                        width: 20,
                        height: 20,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}/>
                    <Text style={{fontSize:15,color:Common.colors.gray2,marginLeft:5,alignItems: 'center',
                        justifyContent: 'center'}}>
                        {contentData.crtdate}
                    </Text>
                </View>
                <View style={{
                    backgroundColor: Common.colors.gray5,
                    borderRadius: 5,
                    marginLeft: 35,
                    marginRight: 10
                }}>
                    <View style={{
                        backgroundColor: Common.colors.white,
                        borderRadius: 5,
                        margin: 1,
                        paddingLeft: 10,
                        paddingRight: 10
                    }}>
                        <View style={{backgroundColor:Common.colors.white,paddingTop:10,paddingBottom:10}}>
                            <Text style={{fontSize:16,color:Common.colors.gray1}}>
                                {contentData.content}
                            </Text>
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
                    let data={'pageNum':this.state.currentPage};
                    console.log('data===------------>'+JSON.stringify(data));
                    isRefreshing=true;
                    dispatch(GetMessage(data,this.state.isLoading,isRefreshing,isLoadMore));
                }
            });
        });

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