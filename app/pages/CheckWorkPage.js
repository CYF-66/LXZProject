'use strict'
import React, {Component} from 'react'
import {
    View,
    ScrollView,
    RefreshControl,
    Image,
    InteractionManager,
    TouchableOpacity,
    Text,
    TextInput,
    StyleSheet,
} from 'react-native'
//引入标题支持包
// import SetPage from 'SetPage'
import Common from '../util/constants';
import NavigationBar from 'react-native-navigationbar'
import Toast from 'react-native-root-toast';
import Load from '../components/Load';
import ModalDropdown from '../components/ModalDropdown'
import {CheckWork} from '../actions/myActions'
import CheckPhoneContainer from '../containers/CheckPhoneContainer'
import CheckContactContainer from '../containers/CheckContactContainer'
import TakeOrderContainer from '../containers/TakeOrderContainer'
import Storage from '../util/Storage'
import NetWorkTool from '../util/NetWorkTool'
const  WORK_YEAR_OPTIONS = ['0~6个月', '6~12个月', '1~3年', '3~5年', '5~8年', '8年以上'];
const WORK_STATE_OPTIONS = ['在职', '自由职业', '其他'];
const COMPANY_SORT_OPTIONS = ['机关/事业单位', '国有企业', '上市公司', '民营/私营企业', '合资/外资'];
const JOB_OPTIONS = ['IT/互联网', '金融', '制造业', '教育/医疗等事业', '交通物流通讯','贸易类行业','服务类行业','其他'];
const INCOME_OPTIONS = ['2000以下', '2000-3000', '3000-5000', '5000-8000', '8000以上'];
export default class CheckWorkPage extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            isError: false,
            isLoading: true,
            defaultValue:'请选择',
            workYear_id: '',
            workState_id: '',
            companySort_id: '',
            job_id: '',
            income_id: '',
            companyName:'',
            companyPhone:'',
            companyAddress:'',
            currentLiveAddress:''
        })
    }
    componentWillUpdate() {
        InteractionManager.runAfterInteractions(() => {
            const {checkReducer} = this.props;
            console.log('checkReducer.isCheckWork===------------>'+checkReducer.isCheckWork);
            if (checkReducer.isCheckWork) {
                if(this.props.isNeedSkip){
                    this._check();
                }else{
                    this.props.navigator.pop();
                }
                // this.props.navigator.popToTop();
                checkReducer.isCheckWork=false;
            }
        });

    }
    componentWillMount() {
        NetWorkTool.addEventListener(NetWorkTool.TAG_NETWORK_CHANGE,this.handleMethod);
    }
    componentWillUnmount() {
        NetWorkTool.removeEventListener(NetWorkTool.TAG_NETWORK_CHANGE,this.handleMethod);
    }

    handleMethod(isConnected){
        console.log('test', (isConnected ? 'online' : 'offline'));
        if(!isConnected){
            Toast.show(NetWorkTool.NOT_NETWORK
                , {position:Toast.positions.CENTER});
        }
    }
    render() {
        const {checkReducer} = this.props;
        // let Data=homeReducer.Data;
        let isLoading = checkReducer.isLoading;
        return (
            <View style={styles.container} needsOffscreenAlphaCompositing renderToHardwareTextureAndroid>
                <NavigationBar
                    backIconHidden={false}
                    barTintColor={Common.colors.yellow3}
                    barStyle={styles.navbar}
                    title='工作信息'
                    titleColor={Common.colors.white}
                    backColor={Common.colors.white}
                    backFunc={() => {
                        this.props.navigator.pop()
                    }}
                    // actionName='下一步'
                    // actionTextColor={Common.colors.white}
                    // actionFunc={() => {
                    //
                    //     this._check();
                    // }}
                />
                <ScrollView
                    style={styles.container}>
                <View style={{flex:1}}>
                    <View style={{flexDirection:'row',paddingLeft:15,paddingTop:20,paddingBottom:20,paddingRight:20,
                        justifyContent:'center',
                        alignItems:'center',borderBottomWidth: 1,
                        borderBottomColor: Common.colors.bottomlinecolor,}}>
                        <Text
                            style={{fontSize:16,color:Common.colors.red,
                                alignItems:'center',justifyContent:'center'}}>
                            *
                        </Text>
                        <Text
                            style={{flex:1,fontSize:16,color:Common.colors.gray1,
                                alignItems:'center',justifyContent:'center'}}>
                            参加工作年限
                        </Text>
                        <View style={{}}>
                            <ModalDropdown style={{
                                alignSelf: 'flex-end', backgroundColor: Common.colors.white}}
                                           textStyle={{
                                               fontSize: 12,
                                               color: Common.colors.black,
                                               textAlign: 'center',
                                               textAlignVertical: 'center',}}
                                           dropdownStyle={{ marginTop:0,borderColor: Common.colors.gray1,
                                               borderWidth: 1,
                                               borderRadius: 3,width: 100,}}
                                           dropdownTextStyle={{fontSize: 12,color:Common.colors.black,textAlign:'center'}}
                                           dropdownTextHighlightStyle={{fontSize: 12,color:Common.colors.red}}
                                           onSelect={(idx, value) => this._dropdown_1_onSelect(idx, value)}
                                           options={WORK_YEAR_OPTIONS}
                                           defaultValue={this.state.defaultValue}
                            />
                        </View>
                    </View>
                    <View style={{flexDirection:'row',paddingLeft:15,paddingTop:20,paddingBottom:20,paddingRight:20,
                        justifyContent:'center',
                        alignItems:'center',borderBottomWidth: 1,
                        borderBottomColor: Common.colors.bottomlinecolor,}}>
                        <Text
                            style={{fontSize:16,color:Common.colors.red,
                                alignItems:'center',justifyContent:'center'}}>
                            *
                        </Text>
                        <Text
                            style={{flex:1,fontSize:16,color:Common.colors.gray1,
                                alignItems:'center',justifyContent:'center'}}>
                            工作状态
                        </Text>
                        <View style={{}}>
                            <ModalDropdown style={{
                                alignSelf: 'flex-end', backgroundColor: Common.colors.white}}
                                           textStyle={{
                                               fontSize: 12,
                                               color: Common.colors.black,
                                               textAlign: 'center',
                                               textAlignVertical: 'center',}}
                                           dropdownStyle={{ marginTop:0,borderColor: Common.colors.gray1,
                                               borderWidth: 1,
                                               borderRadius: 3,width: 100,
                                               height: 120}}
                                           dropdownTextStyle={{fontSize: 12,color:Common.colors.black,textAlign:'center'}}
                                           dropdownTextHighlightStyle={{fontSize: 12,color:Common.colors.red}}
                                           onSelect={(idx, value) => this._dropdown_2_onSelect(idx, value)}
                                           options={WORK_STATE_OPTIONS}
                                           defaultValue={this.state.defaultValue}
                            />
                        </View>
                    </View>
                    <View style={[styles.formInput, styles.formInputSplit]}>
                        <Text
                            style={{fontSize:16,color:Common.colors.gray1,
                                alignItems:'center',justifyContent:'center'}}>
                            单位名称(全称)
                        </Text>
                        <TextInput
                            ref="login_psw"
                            style={styles.loginInput}
                            // field.restrict = "0-9"
                            restrict="0-9"
                            multiline={false}
                            // defaultValue={this.state.accountPWD.substring(1,this.state.accountPWD.length-1)}
                            keyboardType={'default'}
                            secureTextEntry={false}
                            placeholder=''
                            underlineColorAndroid={'transparent'}
                            onChangeText={this.onChangeCompanyName.bind(this)}/>
                    </View>
                    <View style={[styles.formInput, styles.formInputSplit]}>
                        <Text
                            style={{fontSize:16,color:Common.colors.gray1,
                                alignItems:'center',justifyContent:'center'}}>
                            单位固定电话
                        </Text>
                        <TextInput
                            ref="login_psw"
                            style={styles.loginInput}
                            // field.restrict = "0-9"
                            restrict="0-9"
                            multiline={false}
                            // defaultValue={this.state.accountPWD.substring(1,this.state.accountPWD.length-1)}
                            keyboardType={'default'}
                            secureTextEntry={false}
                            placeholder=''
                            underlineColorAndroid={'transparent'}
                            onChangeText={this.onChangeCompanyPhone.bind(this)}/>
                    </View>
                    <View style={[styles.formInput, styles.formInputSplit]}>
                        <Text
                            style={{fontSize:16,color:Common.colors.gray1,
                                alignItems:'center',justifyContent:'center'}}>
                            公司详细地址
                        </Text>
                        <TextInput
                            ref="login_psw"
                            style={styles.loginInput}
                            // field.restrict = "0-9"
                            restrict="0-9"
                            multiline={false}
                            // defaultValue={this.state.accountPWD.substring(1,this.state.accountPWD.length-1)}
                            secureTextEntry={false}
                            keyboardType={'default'}
                            placeholder=''
                            underlineColorAndroid={'transparent'}
                            onChangeText={this.onChangeCompanyAddress.bind(this)}/>
                    </View>
                    <View style={{flexDirection:'row',paddingLeft:20,paddingTop:20,paddingBottom:20,paddingRight:20,
                        justifyContent:'center',
                        alignItems:'center',borderBottomWidth: 1,
                        borderBottomColor: Common.colors.bottomlinecolor,}}>
                        <Text
                            style={{flex:1,fontSize:16,color:Common.colors.gray1,
                                alignItems:'center',justifyContent:'center'}}>
                            单位性质
                        </Text>
                        <View style={{}}>
                            <ModalDropdown style={{
                                alignSelf: 'flex-end', backgroundColor: Common.colors.white}}
                                           textStyle={{
                                               fontSize: 12,
                                               color: Common.colors.black,
                                               textAlign: 'center',
                                               textAlignVertical: 'center',}}
                                           dropdownStyle={{ marginTop:0,borderColor: Common.colors.gray1,
                                               borderWidth: 1,
                                               borderRadius: 3,width: 100,}}
                                           dropdownTextStyle={{fontSize: 12,color:Common.colors.black,textAlign:'center'}}
                                           dropdownTextHighlightStyle={{fontSize: 12,color:Common.colors.red}}
                                           onSelect={(idx, value) => this._dropdown_3_onSelect(idx, value)}
                                           options={COMPANY_SORT_OPTIONS}
                                           defaultValue={this.state.defaultValue}
                            />
                        </View>
                    </View>
                    <View style={{flexDirection:'row',paddingLeft:20,paddingTop:20,paddingBottom:20,paddingRight:20,
                        justifyContent:'center',
                        alignItems:'center',borderBottomWidth: 1,
                        borderBottomColor: Common.colors.bottomlinecolor,}}>
                        <Text
                            style={{flex:1,fontSize:16,color:Common.colors.gray1,
                                alignItems:'center',justifyContent:'center'}}>
                            当前职业
                        </Text>
                        <View style={{}}>
                            <ModalDropdown style={{
                                alignSelf: 'flex-end', backgroundColor: Common.colors.white}}
                                           textStyle={{
                                               fontSize: 12,
                                               color: Common.colors.black,
                                               textAlign: 'center',
                                               textAlignVertical: 'center',}}
                                           dropdownStyle={{ marginTop:0,borderColor: Common.colors.gray1,
                                               borderWidth: 1,
                                               borderRadius: 3,width: 100,}}
                                           dropdownTextStyle={{fontSize: 12,color:Common.colors.black,textAlign:'center'}}
                                           dropdownTextHighlightStyle={{fontSize: 12,color:Common.colors.red}}
                                           onSelect={(idx, value) => this._dropdown_4_onSelect(idx, value)}
                                           options={JOB_OPTIONS}
                                           defaultValue={this.state.defaultValue}
                            />
                        </View>
                    </View>
                    <View style={{flexDirection:'row',paddingLeft:20,paddingTop:20,paddingBottom:20,paddingRight:20,
                        justifyContent:'center',
                        alignItems:'center',borderBottomWidth: 1,
                        borderBottomColor: Common.colors.bottomlinecolor,}}>
                        <Text
                            style={{flex:1,fontSize:16,color:Common.colors.gray1,
                                alignItems:'center',justifyContent:'center'}}>
                            当前月收入
                        </Text>
                        <View style={{}}>
                            <ModalDropdown style={{
                                alignSelf: 'flex-end', backgroundColor: Common.colors.white}}
                                           textStyle={{
                                               fontSize: 12,
                                               color: Common.colors.black,
                                               textAlign: 'center',
                                               textAlignVertical: 'center',}}
                                           dropdownStyle={{ marginTop:0,borderColor: Common.colors.gray1,
                                               borderWidth: 1,
                                               borderRadius: 3,width: 100,}}
                                           dropdownTextStyle={{fontSize: 12,color:Common.colors.black,textAlign:'center'}}
                                           dropdownTextHighlightStyle={{fontSize: 12,color:Common.colors.red}}
                                           onSelect={(idx, value) => this._dropdown_5_onSelect(idx, value)}
                                           options={INCOME_OPTIONS}
                                           defaultValue={this.state.defaultValue}
                            />
                        </View>
                    </View>
                    <View style={{flexDirection:'row',paddingLeft:15,paddingTop:20,paddingBottom:20,paddingRight:20,
                        justifyContent:'center',
                        alignItems:'center',borderBottomWidth: 1,
                        borderBottomColor: Common.colors.bottomlinecolor,}}>
                        <Text
                            style={{fontSize:16,color:Common.colors.red,
                                alignItems:'center',justifyContent:'center'}}>
                            *
                        </Text>
                        <Text
                            style={{fontSize:16,color:Common.colors.gray1,
                                alignItems:'center',justifyContent:'center'}}>
                            现居住详细地址
                        </Text>
                        <TextInput
                            ref="login_psw"
                            style={styles.loginInput}
                            // field.restrict = "0-9"
                            multiline={false}
                            // defaultValue={this.state.accountPWD.substring(1,this.state.accountPWD.length-1)}
                            keyboardType={'default'}
                            secureTextEntry={false}
                            placeholder=''
                            underlineColorAndroid={'transparent'}
                            onChangeText={this.onChangeCurrentLiveAddress.bind(this)}/>
                    </View>
                    <TouchableOpacity activeOpacity={0.5} style={styles.loginBtn} onPress={this._next.bind(this)}>
                        <Text style={styles.loginText}>提交</Text>
                    </TouchableOpacity>
                </View>
                </ScrollView>
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

    _next() {
        let {companyAddress,companyPhone,companyName,workYear_id,workState_id,
            companySort_id,job_id,income_id,currentLiveAddress} = this.state;

        if(workYear_id==''){
            Toast.show('工作年限不能为空', {position: Toast.positions.CENTER});
            return;
        }
        if(workState_id==''){
            Toast.show('工作状态不能为空', {position: Toast.positions.CENTER});
            return;
        }
        if(currentLiveAddress==''){
            Toast.show('当前住址不能为空', {position: Toast.positions.CENTER});
            return;
        }
        var work_year=parseInt(workYear_id)+1;
        var work_state=parseInt(workState_id)+1;
        var company_sort=parseInt(companySort_id)+1;
        var job=parseInt(job_id)+1;
        var income=parseInt(income_id)+1;

        InteractionManager.runAfterInteractions(() => {

            NetWorkTool.checkNetworkState((isConnected)=>{
                if(!isConnected){
                    Toast.show(NetWorkTool.NOT_NETWORK);
                    return;
                }else{
                    const {dispatch} = this.props;
                    this.state.isLoading = true;
                    let data = {'work_year': work_year,'work_state':work_state,'currcompany':companyName,
                        'currwork_address':companyAddress,
                        'currwork_cell':companyPhone,'company_sort':company_sort,'job':job,'income':income,'placeaddress':currentLiveAddress};
                    console.log('data===------------>'+JSON.stringify(data));
                    // let data={'name':'13788957291','identity':'000000'};
                    dispatch(CheckWork(data, this.state.isLoading));
                }
            });
        });

    }
    onChangeCompanyName(text) {
        this.state.companyName = text;
    }

    onChangeCompanyPhone(text) {
        this.state.companyPhone = text;
    }
    onChangeCompanyAddress(text) {
        this.state.companyAddress = text;
    }
    onChangeCurrentLiveAddress(text) {
        this.state.currentLiveAddress = text;
    }
    _dropdown_1_onSelect(idx, value) {
        // BUG: alert in a modal will auto dismiss and causes crash after reload and touch. @sohobloo 2016-12-1
        console.log('idx+1===------------>'+idx+1);
        console.log('value===------------>'+value);
        this.setState({
            workYear_id:idx
        })
    }
    _dropdown_2_onSelect(idx, value) {
        // BUG: alert in a modal will auto dismiss and causes crash after reload and touch. @sohobloo 2016-12-1
        console.log('idx===------------>'+idx);
        console.log('value===------------>'+value);
        this.setState({
            workState_id:idx
        })
    }
    _dropdown_3_onSelect(idx, value) {
        // BUG: alert in a modal will auto dismiss and causes crash after reload and touch. @sohobloo 2016-12-1
        console.log('idx===------------>'+idx);
        console.log('value===------------>'+value);
        this.setState({
            companySort_id:idx
        })
    }
    _dropdown_4_onSelect(idx, value) {
        // BUG: alert in a modal will auto dismiss and causes crash after reload and touch. @sohobloo 2016-12-1
        console.log('idx===------------>'+idx);
        console.log('value===------------>'+value);
        this.setState({
            job_id:idx
        })
    }
    _dropdown_5_onSelect(idx, value) {
        // BUG: alert in a modal will auto dismiss and causes crash after reload and touch. @sohobloo 2016-12-1
        console.log('idx===------------>'+idx);
        console.log('value===------------>'+value);
        this.setState({
            income_id:idx
        })
    }

    _check(){
                Storage.get('phone').then((value) => {
                    if(value){
                        Storage.get('contact').then((value) => {
                            if(value){
                                this.props.navigator.pop()
                            }else{
                                this.props.navigator.push({// 活动跳转，以Navigator为容器管理活动页面
                                    name:'CheckContactContainer',
                                    component: CheckContactContainer,
                                    passProps: {isNeedSkip:true}
                                })
                                return;
                            }
                        });
                    }else{
                        this.props.navigator.push({// 活动跳转，以Navigator为容器管理活动页面
                            name:'CheckPhoneContainer',
                            component: CheckPhoneContainer,
                            passProps: {isNeedSkip:true}
                        })
                        return;
                    }
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
        textAlign: 'right',
        // borderBottomWidth: 1,
        // borderBottomColor: Common.colors.bottomlinecolor,
    },

    loginBtn: {
        backgroundColor: Common.colors.yellow3,
        padding: 10,
        alignItems: 'center',
        marginTop: 20,
        marginBottom:20,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 5,
    },
    loginText: {
        color: Common.colors.white,
        fontSize: 17,
    },

});