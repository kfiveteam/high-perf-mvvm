/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file ANode预热
 */

var ExprType = require('../parser/expr-type');
var each = require('../util/each');
var extend = require('../util/extend');
var kebab2camel = require('../util/kebab2camel');
var hotTags = require('../browser/hot-tags');
var createEl = require('../browser/create-el');
var getPropHandler = require('./get-prop-handler');
var getANodeProp = require('./get-a-node-prop');
var isBrowser = require('../browser/is-browser');
var TextNode = require('./text-node');
var SlotNode = require('./slot-node');
var ForNode = require('./for-node');
var IfNode = require('./if-node');
var TemplateNode = require('./template-node');
var Element = require('./element');

/**
 * ANode预热，分析的数据引用等信息
 *
 * @param {Object} aNode 要预热的ANode
 */
function preheatANode(aNode) {
    var stack = [];

    function recordHotspotData(expr) {
        var refs = analyseExprDataHotspot(expr);

        if (refs.length) {
            for (var i = 0, len = stack.length; i < len; i++) {
                var data = stack[i].hotspot.data;
                if (!data) {
                    data = stack[i].hotspot.data = {};
                }

                each(refs, function (ref) {
                    data[ref] = 1;
                });
            }
        }
    }


    function analyseANodeHotspot(aNode) {
        stack.push(aNode);


        if (aNode.textExpr) {
            aNode.hotspot = {};
            aNode.Clazz = TextNode;
            recordHotspotData(aNode.textExpr);
        }
        else {

            aNode.hotspot = {
                dynamicProps: [],
                xProps: [],
                props: {},
                binds: []
            };

            each(aNode.vars, function (varItem) {
                recordHotspotData(varItem.expr);
            });

            each(aNode.props, function (prop) {
                aNode.hotspot.binds.push({
                    name: kebab2camel(prop.name),
                    expr: prop.noValue != null
                        ? { type: ExprType.BOOL, value: true }
                        : prop.expr,
                    x: prop.x,
                    noValue: prop.noValue
                });
                recordHotspotData(prop.expr);
            });

            for (var key in aNode.directives) {
                if (aNode.directives.hasOwnProperty(key)) {
                    var directive = aNode.directives[key];
                    recordHotspotData(
                        directive.value,
                        !/^(html|bind)$/.test(key)
                    );

                    // init trackBy getKey function
                    if (key === 'for') {
                        var trackBy = directive.trackBy;
                        if (trackBy
                            && trackBy.type === ExprType.ACCESSOR
                            && trackBy.paths[0].value === directive.item
                        ) {
                            aNode.hotspot.getForKey = new Function(
                                directive.item,
                                'return ' + directive.trackByRaw
                            );
                        }
                    }
                }
            }

            each(aNode.elses, function (child) {
                analyseANodeHotspot(child);
            });

            each(aNode.children, function (child) {
                analyseANodeHotspot(child);
            });
        }

        stack.pop();
    }

    if (aNode && !aNode.hotspot) {
        analyseANodeHotspot(aNode);
    }
}

/**
 * 分析表达式的数据引用
 *
 * @param {Object} expr 要分析的表达式
 * @return {Array}
 */
function analyseExprDataHotspot(expr, accessorMeanDynamic) {
    var refs = [];
    var isDynamic;

    function analyseExprs(exprs, accessorMeanDynamic) {
        for (var i = 0, l = exprs.length; i < l; i++) {
            refs = refs.concat(analyseExprDataHotspot(exprs[i], accessorMeanDynamic));
            isDynamic = isDynamic || exprs[i].dynamic;
        }
    }

    switch (expr.type) {
        case ExprType.ACCESSOR:
            isDynamic = accessorMeanDynamic;

            var paths = expr.paths;
            refs.push(paths[0].value);

            if (paths.length > 1) {
                refs.push(paths[0].value + '.' + (paths[1].value || '*'));
            }

            analyseExprs(paths.slice(1), 1);
            break;

        case ExprType.UNARY:
            refs = analyseExprDataHotspot(expr.expr, accessorMeanDynamic);
            isDynamic = expr.expr.dynamic;
            break;

        case ExprType.TEXT:
        case ExprType.BINARY:
        case ExprType.TERTIARY:
            analyseExprs(expr.segs, accessorMeanDynamic);
            break;

        case ExprType.INTERP:
            refs = analyseExprDataHotspot(expr.expr);
            isDynamic = expr.expr.dynamic;

            each(expr.filters, function (filter) {
                analyseExprs(filter.name.paths);
                analyseExprs(filter.args);
            });

            break;

        case ExprType.CALL:
            analyseExprs(expr.name.paths);
            analyseExprs(expr.args);
            break;

        case ExprType.ARRAY:
        case ExprType.OBJECT:
            for (var i = 0; i < expr.items.length; i++) {
                refs = refs.concat(analyseExprDataHotspot(expr.items[i].expr));
                isDynamic = isDynamic || expr.items[i].expr.dynamic;
            }
            break;
    }

    isDynamic && (expr.dynamic = true);
    return refs;
}

exports = module.exports = preheatANode;
