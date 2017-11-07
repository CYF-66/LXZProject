'use strict'
import React, {Component} from 'react'
import {
    View,
    ScrollView,
    RefreshControl,
    Image,
    TouchableOpacity,
    Text,
    Platform,
    StyleSheet,
    BackHandler
} from 'react-native'
//引入标题支持包
// import SetPage from 'SetPage'
import Common from '../util/constants';
import NavigationBar from 'react-native-navigationbar'
import Toast from 'react-native-root-toast';
import {CheckPhone} from '../actions/myActions'
const SHOW_API = 'https://www.showapi.com';
const READING_REPO = 'https://github.com/attentiveness/reading';
import DeviceInfo from 'react-native-device-info';
const aboutLogo = require('../images/ic_launcher.png');

export default class AboutPage extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            isError: false,
            // typeList: {}
        })
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
        return (
            <View style={styles.container} needsOffscreenAlphaCompositing renderToHardwareTextureAndroid>
                <NavigationBar
                    backIconHidden={false}
                    barTintColor={Common.colors.yellow3}
                    barStyle={styles.navbar}
                    title='关于'
                    titleColor={Common.colors.white}
                    backColor={Common.colors.white}
                    backFunc={() => {
                        this.props.navigator.pop()
                    }}
                />
                    <View style={styles.content}>
                        <View style={styles.center}>
                            <Image style={styles.logo} source={aboutLogo} />
                            <Text style={styles.version}>
                                {`v${DeviceInfo.getVersion()}`}
                            </Text>
                            <Text style={styles.title}>乐享租</Text>
                            <Text style={styles.subtitle}>认证旅途，乐享伴您
                            </Text>
                        </View>
                        <View style={styles.bottomContainer}>
                            <View style={styles.disclaimerContent}>
                                <Text style={[styles.disclaimer, { color: '#999999' }]}>
                                    免责声明：所有内容均来自:
                                </Text>
                                <Text
                                    style={[styles.disclaimer, { color: '#3e9ce9' }]}
                                >江苏信荣数码产品租赁服务有限公司</Text>
                            </View>
                        </View>
                    </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Common.colors.gray8,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        paddingBottom: 10
    },
    center: {
        flex: 1,
        alignItems: 'center'
    },
    logo: {
        width: 110,
        height: 110,
        marginTop: 50
    },
    version: {
        fontSize: 16,
        textAlign: 'center',
        color: '#aaaaaa',
        marginTop: 5
    },
    title: {
        fontSize: 28,
        textAlign: 'center',
        color: '#313131',
        marginTop: 10
    },
    subtitle: {
        fontSize: 18,
        textAlign: 'center',
        color: '#4e4e4e'
    },
    disclaimerContent: {
        flexDirection: 'column'
    },
    disclaimer: {
        fontSize: 14,
        textAlign: 'center'
    },
    bottomContainer: {
        alignItems: 'center'
    }

});