/**
 * TradingTerminalRN
 * @author CYF
 * @date 2017-08-13
 */

import React, { Component } from 'react';
import {
    View,
    StatusBar,
    Platform
} from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components'
import Splash from './pages/Splash';

class App extends Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar
                    barStyle='light-content'
                    backgroundColor='transparent'
                    translucent={true}
                />
                <Navigator
                    initialRoute={{name: 'Splash', component: Splash}}
                    configureScene={()=>{
                        return  Navigator.SceneConfigs.PushFromRight;
                    }}
                    renderScene={(route, navigator) => {
                        let Component = route.component;
                        return (
                            <Component navigator = {navigator} route = {route} {...route.passProps} />
                        )
                    }}
                />
            </View>
        )
    }
}

export default App;