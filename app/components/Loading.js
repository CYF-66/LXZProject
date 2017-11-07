/**
 * TradingTerminalRN
 * @author CYF
 * @date 2017-08-25
 */


import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
} from 'react-native';

import Common from '../util/constants';
export default class Loading extends React.Component {
    render() {
        return (
            <View style={styles.loading}>
                <ActivityIndicator color="gray" size="small"/>
                <Text style={styles.loadingTitle}>加载中……</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loading: {
        // flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        // top: (Common.window.height-120)/2,
        // left: (Common.window.width-100)/2,
        top: 10,
        left: Common.window.width/2.5,
        // bottom: -20,
    },

    loadingTitle: {
        marginTop: 10,
        fontSize: 14,
        color: 'gray'
    }
})