'use strict'
import React, {Component} from 'react'
import {View, WebView,StyleSheet,BackHandler,Platform} from 'react-native'
import NavigationBar from 'react-native-navigationbar'
import Common from '../util/constants';
export default class WebViewPage extends Component {
    constructor(props) {
        super(props)
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
            <View style={styles.container}>
                <NavigationBar
                    backIconHidden={false}
                    barTintColor={Common.colors.yellow3}
                    barStyle={styles.navbar}
                    title={this.props.title}
                    titleColor={Common.colors.white}
                    backColor={Common.colors.white}
                    backFunc={() => {
                        this.props.navigator.pop()
                    }}
                />
                <WebView
                    source={{uri: this.props.url}}
                    startInLoadingState
                    javaScriptEnabled
                    domStorageEnabled
                    scalesPageToFit/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Common.colors.gray6,
    },
});
