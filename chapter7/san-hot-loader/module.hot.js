webpackHotUpdate("main",{

    /***/ "./examples/loader/src/components/simple-child.san.js":
    /*!************************************************************!*\
      !*** ./examples/loader/src/components/simple-child.san.js ***!
      \************************************************************/
    /*! exports provided: default */
    /***/ (function(module, __webpack_exports__, __webpack_require__) {
    
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SimpleChild; });
    /* harmony import */ var san__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! san */ "./node_modules/san/dist/san.dev.js");
    /* harmony import */ var san__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(san__WEBPACK_IMPORTED_MODULE_0__);
    function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    
    /**
     * Copyright (c) Baidu Inc. All rights reserved.
     *
     * This source code is licensed under the MIT license.
     * See LICENSE file in the project root for license information.
     *
     * @file simple-child.san.js
     * @author clark-t
     */
    
    class SimpleChild extends san__WEBPACK_IMPORTED_MODULE_0__["Component"] {
      initData() {
        return {
          name: 'SimpleChild'
        };
      }
    
    }
    
    _defineProperty(SimpleChild, "template", '<div>This is My {{name}}</div>');
    
    console.log('SimpleChild Loaded');
        if (true) {
            var __HOT_API__ = __webpack_require__(/*! ./lib/runtime/component-client-api.js */ "./lib/runtime/component-client-api.js");
            var __HOT_UTILS__ = __webpack_require__(/*! ./lib/runtime/utils.js */ "./lib/runtime/utils.js");
    
            var __SAN_COMPONENT__ = __HOT_UTILS__.getExports(module);
            if (__SAN_COMPONENT__.template || __SAN_COMPONENT__.prototype.template) {
                module.hot.accept();
                __HOT_API__.install(__webpack_require__(/*! san */ "./node_modules/san/dist/san.dev.js"));
    
                var __HMR_ID__ = '8e963f3e';
                if (!module.hot.data) {
                    __HOT_API__.createRecord(__HMR_ID__, __SAN_COMPONENT__);
                }
                else {
                    __HOT_API__.hotReload(__HMR_ID__, __SAN_COMPONENT__);
                }
            }
        }
        
    /* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))
    
    /***/ })
    
    })
