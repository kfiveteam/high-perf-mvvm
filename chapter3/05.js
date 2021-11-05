/**
 * 组件类
 *
 * @class
 * @param {Object} options 初始化参数
 */
 function Component(options) { // eslint-disable-line
    // init data
    var initData = extend(
        typeof this.initData === 'function' && this.initData() || {},
        options.data
    );

    this.data = new Data(initData);
    this._initDataChanger();
}

/**
 * 初始化组件内部监听数据变化
 *
 * @private
 * @param {Object} change 数据变化信息
 */
 Component.prototype._initDataChanger = function (change) {
    this._dataChanger = function (change) {
        // 进行组件的更新操作
    };
    this.data.listen(this._dataChanger);
};