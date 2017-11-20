/**
 * TradingTerminalRN
 * @author CYF
 * @date 2017-08-25
 */
import {Dimensions} from 'react-native';

let window = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
};

let colors = {
    allcontainerbgc: '#D6D6D6',//全局容器背景色
    bottomlinecolor: '#ddd',//下划线颜色
    white: '#ffffff',
    black: '#000000',
    qianblack: '#1d1d1d',
    allbackgroundColor: '#F0F0F0',
    bluelogin: '#0d94e0',
    blue: '#0b6ff9',
    loadblue: '#3e9ce9',
    gray1: '#7E8188',
    gray2: '#808080',
    gray3: '#d5d6d1',
    gray4: '#F6FAF8',
    gray5: '#CCCCCC',
    gray6: '#E6E6E6',
    gray8: '#F4F4F4',
    gray7: '#999999',
    yellow1: '#FFCC66',
    yellow2: '#ff9616',
    yellow3: '#ff9616',
    green1: '#CCFF66',
    green2: '#80FF00',
    brown1: '#996c3a',
    brown2: '#ffe9d5',
    red: '#FF0000',
    pink: '#ff709d',
    pink1: '#ffe9d5',
    transparent: 'rgba(0, 0, 0, 0)',
    backgroundColor0: 'rgba(128,128,128,0.3)',
    backgroundColor1: 'rgba(128,128,128,0.5)',
    backgroundColor2: 'rgba(128,128,128,0.7)'
};

let storeKeys = {
    SEARCH_HISTORY_KEY: 'SEARCH_HISTORY_KEY',
};

let url={

    outTimeUrl:'http://114.67.154.29/clause.html',
    questionUrl:'http://114.67.154.29/question.html',
    registerAgreeUrl:'http://114.67.154.29/agreement.html',
    newestMessage:'http://117.48.200.2/home.html',
};
let mapper = {
    'calory': {name: '热量', unit: ''},
    'protein': {name: '蛋白质', unit: '克'},
    'fat': {name: '脂肪', unit: '克'},
    'carbohydrate': {name: '碳水化合物', unit: '克'},
    'fiber_dietary': {name: '膳食纤维', unit: '克'},
    'vitamin_a': {name: '维生素A', unit: 'IU'},
    'vitamin_c': {name: '维生素C', unit: '毫克'},
    'vitamin_e': {name: '维生素E', unit: '毫克'},
    'carotene': {name: '胡萝卜素', unit: '微克'},
    'thiamine': {name: '维生素B1', unit: '毫克'},
    'lactoflavin': {name: '维生素B2', unit: '毫克'},
    'niacin': {name: '烟酸', unit: '毫克'},
    'cholesterol': {name: '胆固醇', unit: '毫克'},
    'magnesium': {name: '镁', unit: '毫克'},
    'calcium': {name: '钙', unit: '毫克'},
    'iron': {name: '铁', unit: '毫克'},
    'zinc': {name: '锌', unit: '毫克'},
    'copper': {name: '铜', unit: '毫克'},
    'manganese': {name: '锰', unit: '毫克'},
    'kalium': {name: '钾', unit: '毫克'},
    'phosphor': {name: '磷', unit: '毫克'},
    'natrium': {name: '钠', unit: '毫克'},
    'selenium': {name: '硒', unit: '毫克'}
};
export default {
    window: window,
    colors: colors,
    storeKeys: storeKeys,
    ingredientMapper: mapper,
    url:url,
};