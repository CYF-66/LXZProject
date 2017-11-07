'use strict'
import React, {Component} from 'react'
import {
    View,
    ScrollView,
    RefreshControl,
    Platform,
    TouchableOpacity,
    BackHandler,
    StyleSheet,
} from 'react-native'
//引入标题支持包
// import SetPage from 'SetPage'
import Common from '../util/constants';
import NavigationBar from 'react-native-navigationbar'
import Toast from 'react-native-root-toast';
import IdentificationContainer from '../containers/IdentificationContainer'
import Storage from '../util/Storage'
import LoginContainer from '../containers/LoginContainer'
export default class CouponPage extends Component {

    constructor(props) {
        super(props);
        // this.state = ({
        //     isError: false,
        //     isLoading: true,
        //     tabChange:'Android',
        //     dataSource: new ListView.DataSource({
        //         rowHasChanged: (row1, row2) => row1 !== row2
        //     }),
        //     // typeList: {}
        // })
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
    render() {
        return (
            <View style={styles.container} needsOffscreenAlphaCompositing renderToHardwareTextureAndroid>
                <NavigationBar
                    backIconHidden={false}
                    barTintColor={Common.colors.yellow3}
                    barStyle={styles.navbar}
                    title='我的优惠券'
                    titleColor={Common.colors.white}
                    backColor={Common.colors.white}
                    backFunc={() => {
                        this.props.navigator.pop()
                    }}
                    actionName='使用规则'
                    actionTextColor={Common.colors.white}
                    actionFunc={() => {
                        Toast.show('资金记录', {position: Toast.positions.CENTER});
                        // this.props.navigator.push({
                        //     component: AboutPage
                        // })
                    }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    }
});