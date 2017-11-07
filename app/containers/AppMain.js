/**
 * 交易主框架界面
 */
'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    TouchableHighlight,
    Platform,
    BackHandler
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Toast from 'react-native-root-toast';
import HomeContainer from './HomeContainer';
import OrderContainer from './OrderContainer';
import MyContainer from './MyContainer';

const TAB_NORMAL_MARKET = require('../images/tab/index-gray.png');
const TAB_NORMAL_CHART = require('../images/tab/order-gray.png');
const TAB_NORMAL_MY = require('../images/tab/my-gray.png');

const TAB_PRESS_MARKET = require('../images/tab/index-red.png');
const TAB_PRESS_CHART = require('../images/tab/order-red.png');
const TAB_PRESS_MY = require('../images/tab/my-red.png');
import Common from '../util/constants';

class AppMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'home'
        };
    }

    // componentWillMount() {
    //     if (Platform.OS === 'android') {
    //         BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    //     }
    // }
    //
    // componentWillUnmount() {
    //     if (Platform.OS === 'android') {
    //         BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    //     }
    // }
    //
    // onBackAndroid = () => {
    //     // const nav = this.navigator;
    //     // const routers = nav.getCurrentRoutes();
    //     // if (routers.length > 1) {
    //     //     nav.pop();
    //     //     return true;
    //     // }
    //     // return false;
    //     console.log('onBackAndroid===------------>'+this.props.navigator.getCurrentRoutes());
    //     if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
    //         //最近2秒内按过back键，可以退出应用。
    //
    //         return false;
    //     }
    //     this.lastBackPressed = Date.now();
    //     Toast.show('再按一次退出应用'
    //         , {position:Toast.positions.CENTER});
    //     return true;
    // };

    render() {
        return (
            <TabNavigator
                tabBarStyle={styles.tab}>
                <TabNavigator.Item
                    title="乐享租"
                    selected={this.state.selectedTab === 'home'}
                    selectedTitleStyle={styles.selectedTextStyle}
                    titleStyle={styles.textStyle}
                    renderIcon={() => <Image source={TAB_NORMAL_MARKET} style={styles.tabIcon}/>}
                    renderSelectedIcon={() => <Image source={TAB_PRESS_MARKET} style={styles.tabIcon}/>}
                    onPress={() => this.setState({selectedTab: 'home'})}>
                    <HomeContainer {...this.props}/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    title="订单"
                    selected={this.state.selectedTab === 'order'}
                    selectedTitleStyle={styles.selectedTextStyle}
                    titleStyle={styles.textStyle}
                    renderIcon={() => <Image source={TAB_NORMAL_CHART} style={styles.tabIcon}/>}
                    renderSelectedIcon={() => <Image source={TAB_PRESS_CHART} style={styles.tabIcon}/>}
                    onPress={() => this.setState({selectedTab: 'order'})}>
                    <OrderContainer {...this.props}/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    title="我的"
                    selected={this.state.selectedTab === 'my'}
                    selectedTitleStyle={styles.selectedTextStyle}
                    titleStyle={styles.textStyle}
                    renderIcon={() => <Image source={TAB_NORMAL_MY} style={styles.tabIcon}/>}
                    renderSelectedIcon={() => <Image source={TAB_PRESS_MY} style={styles.tabIcon}/>}
                    onPress={() => this.setState({selectedTab: 'my'})}>
                    <MyContainer {...this.props}/>
                </TabNavigator.Item>
            </TabNavigator>
        );
    }
}

const styles = StyleSheet.create({
    textStyle: {
        color: Common.colors.gray1,
    },
    selectedTextStyle: {
        color: Common.colors.red,
    },
    tab: {
        height: 52,
        alignItems: 'center',
        backgroundColor: Common.colors.white,
    },
    tabIcon: {
        width: 25,
        height: 25,
    }
});

export default AppMain;

