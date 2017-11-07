'use strict'
import React, {Component} from 'react'
import {
    View,
    ListView,
    RefreshControl,
    Image,
    TouchableOpacity,
    Text,
    StyleSheet,
    InteractionManager,
    Platform,
    BackHandler
} from 'react-native'
//引入标题支持包
// import SetPage from 'SetPage'
import Common from '../util/constants';
import NavigationBar from 'react-native-navigationbar'
import CheckNameContainer from '../containers/CheckNameContainer'
import Toast from 'react-native-root-toast';
import LoginContainer from '../containers/LoginContainer'
import Storage from '../util/Storage'
import Loading from '../components/Loading';
import Load from '../components/Load';
import {CheckCenter} from '../actions/myActions'
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var isRefreshing=false;
var isLoadMore=false;
export default class CheckPage extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            isError: false,
            isLoading: true,
            currentPage:'1',
            step:'',
            dataSource:ds.cloneWithRows([])
        })
    }

    componentWillMount() {
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
        Storage.get("isLogin").then((value) => {
            if(value){
            }else{
                this.props.navigator.push({// 活动跳转，以Navigator为容器管理活动页面
                    name:'LoginContainer',
                    component: LoginContainer,
                    // passProps: {contentData}// 传递的参数（可选）,{}里都是键值对  ps: test是关键字
                });
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
    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            const {dispatch} = this.props;
            let data={'pageNum':1,'pageSize':10};
            console.log('data===------------>'+JSON.stringify(data));
            dispatch(CheckCenter(data,this.state.isLoading,isRefreshing,isLoadMore));
        });
    }
    render() {

        const {myReducer} = this.props;
        // let Data=homeReducer.Data;
        let data = myReducer.checkData;
        let isLoading = myReducer.isLoading;
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
                                    refreshing={myReducer.isRefreshing}
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
                    title='审核中心'
                    titleColor={Common.colors.white}
                    backColor={Common.colors.white}
                    backFunc={() => {
                        this.props.navigator.pop()
                    }}
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
        let isShow;
        if(contentData.step=='审核拒绝'){
            isShow=true;
        }else{
            isShow=false;
        }
        let pic='';
            if(contentData.name=='iphone8'){
                pic=require('../images/other/icon_iphone8.png');
            }else{
                pic=require('../images/other/icon_iph8plus.png');
            }
        return(
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
                    }}>

                        <Image source={pic} style={{
                            width: 30,
                            height: 60,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}/>
                        <View style={{flex:1}}>

                            <Text style={{color:Common.colors.black,fontSize:20,marginLeft:10}}>{contentData.name}</Text>
                            <View style={{flexDirection: 'row',alignItems:'center'}}>
                                <Text style={{color:Common.colors.gray5,fontSize:12,marginLeft:10,marginTop:5}}>申请期限:</Text>
                                <Text style={{backgroundColor:Common.colors.yellow2,paddingTop:3,paddingBottom:3,
                                    paddingLeft:5,paddingRight:5,color:Common.colors.white,fontSize:12,
                                    marginLeft:10,marginTop:5,borderRadius:5}}>{contentData.deadline}周</Text>
                            </View>

                        </View>
                        <Text style={{fontSize: 12, color: Common.colors.blue}}>
                            {contentData.step}
                        </Text>
                    </View>

                    <View style={{backgroundColor: Common.colors.gray6, height: 1,marginTop:10}}/>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 15,
                        marginBottom: 10
                    }}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

                            <Text style={{color: Common.colors.gray1, fontSize: 12}}>
                                每期服务费率
                            </Text>
                            <Text style={{color: Common.colors.yellow3, fontSize: 12, marginTop: 5}}>
                                {contentData.expiryrate*100}%
                            </Text>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

                            <Text style={{color: Common.colors.gray1, fontSize: 12}}>
                                到期总还款(元)
                            </Text>
                            <Text style={{color: Common.colors.yellow3, fontSize: 12, marginTop: 5}}>
                                {contentData.price}
                            </Text>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

                            <Text style={{color: Common.colors.gray1, fontSize: 12}}>
                                每期总费用(元)
                            </Text>
                            <Text style={{color: Common.colors.yellow3, fontSize: 12, marginTop: 5}}>
                                {contentData.deadprice}
                            </Text>
                        </View>
                    </View>
                    <View style={{backgroundColor: Common.colors.gray6, height: 1, marginTop: 10}}/>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 15,
                    }}>
                        <Image source={require('../images/other/icon_seclect.png')}
                               style={{padding:10,width: 25,
                                   height: 25,}}/>
                        <View style={{
                            width:150,
                            height: 1,
                            backgroundColor: Common.colors.yellow2,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}/>
                        <Image source={require('../images/other/icon_going.png')}
                               style={{padding:10,width: 25,
                                   height: 25}}/>
                        {/*<View style={{*/}
                            {/*width:80,*/}
                            {/*height: 1,*/}
                            {/*backgroundColor: Common.colors.yellow2,*/}
                            {/*alignItems: 'center',*/}
                            {/*justifyContent: 'center'*/}
                        {/*}}/>*/}
                        {/*<Image source={require('../images/other/icon_seclect.png')}*/}
                               {/*style={{padding:10,width: 25,*/}
                                   {/*height: 25,}}/>*/}
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 10
                    }}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

                            <Text style={{color: Common.colors.gray1, fontSize: 12}}>
                                提交申请
                            </Text>
                            <Text style={{color: Common.colors.yellow3, fontSize: 12, marginTop: 5}}>
                                {contentData.crtdate}
                            </Text>
                        </View>

                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => this._skipIntoAccountManage(contentData.audit_errmemo)}>
                            <Text style={{color: Common.colors.gray1, fontSize: 12}}>
                                {contentData.step}
                            </Text>
                            </TouchableOpacity>
                            <Text style={{color: Common.colors.yellow3, fontSize: 12, marginTop: 5}}>
                            </Text>
                        </View>

                        {/*<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>*/}

                            {/*<Text style={{color: Common.colors.gray1, fontSize: 12}}>*/}
                                {/*完成审核*/}
                            {/*</Text>*/}
                            {/*<Text style={{color: Common.colors.yellow3, fontSize: 12, marginTop: 5}}>*/}
                                {/*2017-10-23*/}
                            {/*</Text>*/}
                        {/*</View>*/}
                    </View>
                    {isShow ? <View style={{flexDirection:'row',marginTop: 5, marginBottom: 10,justifyContent:'center',alignItems:'center'}}>
                        {/*<Text style={{color: Common.colors.black, fontSize: 12 }}>*/}
                        {/*审核拒绝:*/}
                        {/*</Text>*/}
                        <Text style={{color: Common.colors.red, fontSize: 12 }}>
                            {contentData.audit_errmemo}
                        </Text>
                    </View> :null}


                </View>
            </View>
        )
    }

    // 下拉刷新
    _onRefresh() {
        InteractionManager.runAfterInteractions(() => {
            const {dispatch} = this.props;
            let data={'pageNum':1,'pageSize':10};
            console.log('data===------------>'+JSON.stringify(data));
            isRefreshing=true;
            dispatch(CheckCenter(data,this.state.isLoading,isRefreshing,isLoadMore));
        });

    }
    _skipIntoAccountManage(content) {
        // Toast.show(content, {position: Toast.positions.CENTER});

        alert(content);
        // this.props.navigator.push({// 活动跳转，以Navigator为容器管理活动页面
        //     name: 'RepaymentContainer',
        //     component: RepaymentContainer,
        //     passProps: {Title: content}// 传递的参数（可选）,{}里都是键值对  ps: test是关键字
        // })// push一个route对象到navigator中
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
    }
});