/**
 * san-store
 * Copyright 2017 Baidu Inc. All rights reserved.
 *
 * @file san组件的connect
 * @author errorrik
 */

import parseName from '../parse-name';
import Store from '../store';

/**
 * san组件的connect
 *
 * @param {Object} mapStates 状态到组件数据的映射信息
 * @param {Object|Array?} mapActions store的action操作到组件actions方法的映射信息
 * @param {Store} store 指定的store实例
 * @return {function(ComponentClass)}
 */
function connect(mapStates, mapActions, store) {
    let mapStateInfo = [];

    for (let key in mapStates) {
        if (mapStates.hasOwnProperty(key)) {
            let mapState = mapStates[key];
            let mapInfo = {dataName: key};
            mapInfo.stateName = parseName(mapState);
            mapStateInfo.push(mapInfo);
        }
    }

    return function (ComponentClass) {
        let componentProto;
        let ReturnTarget;
        let extProto;

        ReturnTarget = class extends ComponentClass {};
        componentProto = ComponentClass.prototype;
        extProto = ReturnTarget.prototype;

        let inited = componentProto.inited;
        let disposed = componentProto.disposed;

        extProto.inited = function () {

            // init data
            mapStateInfo.forEach(info => {
                this.data.set(info.dataName, store.getState(info.stateName));
            });

            // listen store change
            this.__storeListener = diff => {
                mapStateInfo.forEach(info => {
                    let updateInfo = calcUpdateInfo(info, diff);
                    if (updateInfo) {
                        if (updateInfo.spliceArgs) {
                            this.data.splice(updateInfo.componentData, updateInfo.spliceArgs);
                        }
                        else {
                            this.data.set(updateInfo.componentData, store.getState(updateInfo.storeData));
                        }
                    }
                });
            };
            store.listen(this.__storeListener);

            if (typeof inited === 'function') {
                inited.call(this);
            }
        };

        extProto.disposed = function () {
            store.unlisten(this.__storeListener);
            this.__storeListener = null;

            if (typeof disposed === 'function') {
                disposed.call(this);
            }
        };

        // map actions
        if (!extProto.actions) {
            extProto.actions = {};

            for (let key in mapActions) {
                let actionName = mapActions[key];
                extProto.actions[key] = function (payload) {
                    return store.dispatch(actionName, payload);
                };
            }
        }

        return ReturnTarget;
    };
}

/**
 * 判断 connect 的 state 是否需要更新
 *
 * @param {Object} info state的connect信息对象
 * @param {Array} diff 数据变更的diff信息
 * @return {boolean}
 */
function calcUpdateInfo(info, diff) {
    if (info.stateName) {
        let stateNameLen = info.stateName.length;

        for (let i = 0, diffLen = diff.length; i < diffLen; i++) {
            let diffInfo = diff[i];
            let target = diffInfo.target;
            let matchThisDiff = true;
            let j = 0;
            let targetLen = target.length;

            for (; j < targetLen && j < stateNameLen; j++) {
                if (info.stateName[j] != target[j]) {
                    matchThisDiff = false;
                    break;
                }
            }

            if (matchThisDiff) {
                let updateInfo = {
                    componentData: info.dataName,
                    storeData: info.stateName
                };

                if (targetLen > stateNameLen) {
                    updateInfo.storeData = target;
                    updateInfo.componentData += '.' + target.slice(stateNameLen).join('.');
                }

                if (targetLen >= stateNameLen && diffInfo.splice) {
                    updateInfo.spliceArgs = [
                        diffInfo.splice.index,
                        diffInfo.splice.deleteCount
                    ];

                    if (diffInfo.splice.insertions instanceof Array) {
                        updateInfo.spliceArgs.push.apply(
                            updateInfo.spliceArgs,
                            diffInfo.splice.insertions
                        );
                    }
                }

                return updateInfo;
            }
        }
    }
}

/**
 * createConnector 创建连接
 *
 * @param {Store} store store实例
 * @return {Function}
 */
export default function createConnector(store) {
    if (store instanceof Store) {
        return (mapStates, mapActions) => connect(mapStates, mapActions, store);
    }

    throw new Error(store + ' must be an instance of Store!');
}
