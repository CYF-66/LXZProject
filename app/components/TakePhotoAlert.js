
import React from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    Text,
    Modal,
    Platform,
    Animated,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native';
import Common from '../util/constants';
const {width, height} = Dimensions.get('window');
const [aWidth] = [width-20];
const [left, top] = [0, -20];
const [middleLeft] = [(width - aWidth) / 2];
const propTypes = {
    visible: React.PropTypes.bool,
    color: React.PropTypes.string,
    overlayColor: React.PropTypes.string,
    onRequestClose: React.PropTypes.func,
    offset:React.PropTypes.func,
    opacity: React.PropTypes.func,
    title: React.PropTypes.string,
    choose0: React.PropTypes.string,
    choose1: React.PropTypes.string,
    hide: React.PropTypes.bool,
    tipTextColor: React.PropTypes.string,
    aHeight: React.PropTypes.string,
};

const ShowAlert = ({ visible, color, size, overlayColor, onRequestClose }) =>
    (<Modal visible={visible} transparent onRequestClose={onRequestClose}>
        {visible
            ? <View key={'spinner'} style={styles.container}>
                <View style={[styles.background, { backgroundColor: overlayColor }]}>
                    {/*<View style={styles.loading}>*/}
                        {/*<ActivityIndicator size={size} color={color} />*/}
                        {/*<Text style={styles.loadingText}>数据加载中...</Text>*/}
                    {/*</View>*/}
                    <View style={styles.container}>
                        <Animated.View style={styles.mask}>
                        </Animated.View>

                        <Animated.View style={[{
                            width: aWidth,
                            height: this.state.aHeight,
                            left: middleLeft,
                            ...Platform.select({
                                ios:{
                                    bottom: - 20,
                                },
                                android:{
                                    bottom: 10,
                                }
                            }),
                            alignItems: "center",
                            justifyContent: "space-between",
                        }, {
                            transform: [{
                                translateY: this.state.offset.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [height, (height - this.state.aHeight - 34)]
                                }),
                            }]
                        }]}>
                            <View style={styles.content}>
                                <View style={styles.tipTitleView}>
                                    <Text style={styles.tipTitleText}>{this.state.title}</Text>
                                </View>
                                {
                                    this.entityList.map((item, i) => _renderItem(item, i))
                                }
                            </View>
                            <TouchableHighlight
                                style={styles.button}
                                underlayColor={'#f0f0f0'}
                                onPress={this.cancel.bind(this)}
                            >
                                <Text style={styles.buttonText}>取消</Text>
                            </TouchableHighlight>
                        </Animated.View>
                    </View>
                </View>
            </View>
            : <View key={'spinner'} />}
    </Modal>);

const _renderItem=({item,i}) =>(
    <View style={styles.tipContentView} key={i}>
        <View style={{height: 0.5, backgroundColor: '#a9a9a9', width: aWidth}}/>
        <TouchableOpacity
            // key={i}
            onPress={this.choose.bind(this, i)}
        >
            <View style={styles.item}>
                <Text style={{
                    color: this.state.tipTextColor,
                    fontSize: 17,
                    textAlign: "center",
                }}>{item}</Text>
            </View>
        </TouchableOpacity>
    </View>
);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    background: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loading: {
        alignItems: 'center',
        justifyContent: 'center',
        width: Common.window.width / 3,
        height: Common.window.width / 3,
        borderRadius: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.25)'
    },
    loadingText: {
        marginTop: 10,
        textAlign: 'center',
        color: Common.colors.white
    }
});

ShowAlert.propTypes = propTypes;

ShowAlert.defaultProps = {
    visible: false,
    color: 'white',
    size: 'large',
    overlayColor: 'transparent',
    offset:new Animated.Value(0),
    opacity: new Animated.Value(0),
    title: "",
    choose0: "",
    choose1: "",
    hide: true,
    tipTextColor: '#333333',
    aHeight: 236,
    onRequestClose() {}
};

export default ShowAlert;
