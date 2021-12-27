/**
 * 初始化组件内部监听数据变化
 *
 * @private
 * @param {Object} change 数据变化信息
 */
Component.prototype._initDataChanger = function (change) {
    var me = this;

    this._dataChanger = function (change) {
        // 进行组件的更新操作
        if (!me._dataChanges) {
            nextTick(me._update, me);
            me._dataChanges = [];
        }

        me._dataChanges.push(change);
    };
    this.data.listen(this._dataChanger);
};