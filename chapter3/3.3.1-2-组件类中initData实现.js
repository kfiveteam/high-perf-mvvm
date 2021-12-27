/**
 * 组件类
 *
 * @class
 * @param {Object} options 初始化参数
 */
function Component(options) { // eslint-disable-line
    // 初始化data
    var initData = extend(
        typeof this.initData === 'function' && this.initData() || {},
        options.data
    );

    this.data = new Data(initData);
    this._initDataChanger();
}
