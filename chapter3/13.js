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

    // this.bind 中包含了父组件 data 与 当前组建 props 的绑定关系
    // this.scope 中包含了父组件的数据。
    if (this.binds && this.scope) {
        for (var i = 0, l = this.binds.length; i < l; i++) {
            var bindInfo = this.binds[i];

            // 根据绑定关系，从父组件的数据中取值
            var value = evalExpr(bindInfo.expr, this.scope, this.owner);
            initData[bindInfo.name] = value;
        }
    }

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