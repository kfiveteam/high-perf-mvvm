/**
 * @file ChannelMultiplex.js
 */
const open = require('open');

const Channel = require('./Channel');

const EventEmitter = require('events').EventEmitter;
module.exports = class ChannelMultiplex extends EventEmitter {
    constructor() {
        super();
        this._backendMap = new Map();
        this._frontendMap = new Map();
    }
    destory() {
        // 清除所有channel，断开链接
    }
    createBackendChannel(id, ws) {
        const channel = new Channel(ws);
        this._backendMap.set(id, channel);
        open(`http://127.0.0.1:10086/frontend/index.html?ws=127.0.0.1:8899/frontend/${id}`);
    }
    createFrontendChannel(id, ws) {
        const backendChannel = this._backendMap.get(id);
        if (!backendChannel) {
            return ws.close();
        }
        const frontendChannel = new Channel(ws);
      	// 建立frontend与backend之间的全双工通信
        frontendChannel.connect(backendChannel);
      	// 清除原来的channel
        const oldFrontendChannel = this._frontendMap.get(id);
      	oldFrontendChannel && oldFrontendChannel.destroy();
      	// 存储 frontendChannel
        this._frontendMap.set(id, frontendChannel);
    }
    removeBackendChannel(id, title = '') {
        this._backendMap.delete(id);
    }
    removeFrontendChannel(id) {
        this._frontendMap.delete(id);
    }
};
