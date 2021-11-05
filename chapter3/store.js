/**
 * san-store
 * Copyright 2017 Baidu Inc. All rights reserved.
 *
 * @file store class
 * @author errorrik
 */


import flattenDiff from './flatten-diff';
import parseName from './parse-name';

/**
 * Store 类，应用程序状态数据的容器
 *
 * @class
 */
export default class Store {
    /**
     * 构造函数
     *
     * @param {Object?} options 初始化参数
     * @param {Object?} options.initData 容器的初始化数据
     * @param {Object?} options.actions 容器的action函数集合
     */
    constructor(
        {
            initData = {},
            actions = {},
        } = {}
    ) {
        this.raw = initData;
        this.actions = actions;
        this.listeners = [];
    }

    /**
     * 获取 state
     *
     * @param {string} name state名称
     * @return {*}
     */
    getState(name) {
        name = parseName(name);

        let value = this.raw;
        for (let i = 0, l = name.length; value != null && i < l; i++) {
            value = value[name[i]];
        }

        return value;
    }

    /**
     * 监听 store 数据变化
     *
     * @param {Function} listener 监听器函数，接收diff对象
     */
    listen(listener) {
        if (typeof listener === 'function') {
            this.listeners.push(listener);
        }
    }

    /**
     * 移除 store 数据变化监听器
     *
     * @param {Function} listener 监听器函数
     */
    unlisten(listener) {
        let len = this.listeners.length;
        while (len--) {
            if (this.listeners[len] === listener){
                this.listeners.splice(len, 1);
            }
        }
    }

    /**
     * 触发 store 数据变化
     *
     * @private
     * @param {Array} diff 数据变更信息对象
     */
    _fire(diff) {
        this.listeners.forEach(listener => {
            listener.call(this, diff);
        });
    }

    /**
     * 添加一个 action
     *
     * @param {string} name action的名称
     * @param {Function} action action函数
     */
    addAction(name, action) {
        if (typeof action !== 'function') {
            return;
        }

        if (this.actions[name]) {
            throw new Error('Action ' + name + ' exists!');
        }

        this.actions[name] = action;
    }

    /**
     * action 的 dispatch 入口
     *
     * @private
     * @param {string} name action名称
     * @param {*} payload payload
     */
    dispatch(name, payload) {
        let action = this.actions[name];

        if (typeof action !== 'function') {
            return;
        }

        let actionReturn = this._actionStart(action, payload);


        let diff;
        if (actionReturn) {

            this.raw = actionReturn[0];
            diff = actionReturn[1];

        }

        if (diff) {
            this._fire(diff);
        }
    }

    /**
     * 开始运行 action
     *
     * @param {string} id action的id
     * @param {string} name action 名称
     * @param {Function} action action 函数
     * @param {*} payload payload
     */
    _actionStart(action, payload) {

        let returnValue = action.call(this, payload, {
            getState: this.getState,
            dispatch: (name, payload) => this.dispatch(name, payload)
        });

        if (returnValue != null && typeof returnValue.buildWithDiff === 'function') {
            let updateInfo = returnValue.buildWithDiff()(this.raw);
            updateInfo[1] = flattenDiff(updateInfo[1]);

            return updateInfo;
        }
    }
}



