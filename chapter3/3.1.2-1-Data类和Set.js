const {
    parseExpr,
    ExprType,
    evalExpr
} = require('./san.dev');

/**
 * 数据类
 *
 * @class
 * @param {Object?} data 初始数据
 * @param {Model?} parent 父级数据容器
 */
function Data(data, parent) {
    this.raw = data || {};
}

/**
 * 数据对象变更操作
 *
 * @inner
 * @param {Object|Array} source 要变更的源数据
 * @param {Array} exprPaths 属性路径
 * @param {number} pathsStart 当前处理的属性路径指针位置
 * @param {number} pathsLen 属性路径长度
 * @param {*} value 变更属性值
 * @return {*} 变更后的新数据
 */
function immutableSet(source, exprPaths, pathsStart, pathsLen, value) {
    if (pathsStart >= pathsLen) {
        return value;
    }

    var pathExpr = exprPaths[pathsStart];
    var prop = pathExpr.value;
    var result = source;

    if (source instanceof Array) {
        prop = +prop;
        result = source.slice(0);
        result[prop] = immutableSet(source[prop], exprPaths, pathsStart + 1, pathsLen, value);
    }
    else if (typeof source === 'object') {
        result = {};

        for (var key in source) {
            if (key !== prop && source.hasOwnProperty(key)) {
                result[key] = source[key];
            }
        }

        result[prop] = immutableSet(source[prop], exprPaths, pathsStart + 1, pathsLen, value);
    }

    return result;
}

/**
 * 设置数据项
 *
 * @param {string|Object} expr 数据项路径
 * @param {*} value 数据值
 * @param {Object=} option 设置参数
 * @param {boolean} option.silent 静默设置，不触发变更事件
 */
Data.prototype.set = function (expr, value, option) {
    option = option || {};


    // {
    //     type: ExprType.ACCESSOR
    //     paths: Array
    // }
    expr = parseExpr(expr);

    var prop = expr.paths[0].value;
    this.raw[prop] = immutableSet(this.raw[prop], expr.paths, 1, expr.paths.length, value, this);

    // 在这里响应数据变化，触发视图更新等操作。
};

/**
 * 获取数据项
 *
 * @param {string} expr 数据项路径
 * @param {Data?} callee 当前数据获取的调用环境
 * @return {*}
 */
Data.prototype.get = function (expr) {
    var value = this.raw;
    if (!expr) {
        return value;
    }

    if (typeof expr !== 'object') {
        expr = parseExpr(expr);
    }

    var paths = expr.paths;

    for (var i = 0, l = paths.length; value != null && i < l; i++) {
        value = value[paths[i].value];
    }

    return value;
};

// const origin = {
//     c: {
//         a: [{
//             meixg: 2
//         }],
//         b: 'meixg'
//     }
// };

// const d = new Data(origin);

// console.log(d.get('c.a[0].meixg'));
// console.log(d.raw.c.a[0].meixg);
// d.set('c.a[0].meixg', 123);
// console.log(d.get('c.a[0].meixg'));
// console.log(d.raw.c.a[0].meixg);


var origin = { 'a': [{ 'b': { 'c': 3 } }] };
var data = new Data(origin);

console.log(data.get('a[0].b.c'));
data.set('a[0].b.c', 2);
console.log(data.get('a[0].b.c'));
