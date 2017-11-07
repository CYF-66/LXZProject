/**
 * TradingTerminalRN
 * @author CYF
 * @date 2017-08-29
 */

'use strict';

import {AsyncStorage} from 'react-native';
const userInfo='userInfo';

class Storage {
    /**
     * 获取
     * @param key
     * @returns {Promise<T>|*|Promise.<TResult>}
     */

    static get (key) {
        return AsyncStorage.getItem(key).then((value) => {
            const jsonValue = JSON.parse(value);
            // const changeValue=value.substring(1,value.length-1)
            return jsonValue;
        }).catch((err) => {
                console.log(err)
            }
        );
    }
    /**
     * 获取
     * @param key
     * @returns {Promise<T>|*|Promise.<TResult>}
     */

    static getJson (key) {
        return AsyncStorage.getItem(key).then((value) => {
            const jsonValue = JSON.parse(value);
            // const changeValue=value.substring(1,value.length-1)
            return jsonValue;
        }).catch((err) => {
                console.log(err)
            }
        );
    }


    /**
     * 保存
     * @param key
     * @param value
     * @returns {*}
     */
    static save(key, value) {
        return AsyncStorage.setItem(key, JSON.stringify(value));
    }


    /**
     * 更新
     * @param key
     * @param value
     * @returns {Promise<T>|Promise.<TResult>}
     */
    static update(key, value) {
        return DeviceStorage.get(key).then((item) => {
            value = typeof value === 'string' ? value : Object.assign({}, item, value);
            return AsyncStorage.setItem(key, JSON.stringify(value));
        }).catch((err) => {
                console.log(err)
            }
        );
    }


    /**
     * 更新
     * @param key
     * @returns {*}
     */
    static delete(key) {
        return AsyncStorage.removeItem(key);
    }

    static getUser = () => {
        return AsyncStorage.getItem(userInfo)
            .then((user) => {
                if (user) {
                    return JSON.parse(user);
                } else {
                    return {};
                }
            })
            .catch(error => {
                // console.log(error);
            });
    };

    static setUser = (user) => {
        AsyncStorage.setItem(userInfo, JSON.stringify(user));
    };

}

export default Storage;