/**
 * @file Channel.js
 */
const EventEmitter = require('events').EventEmitter;
module.exports = class Channel extends EventEmitter {
    constructor(ws) {
        super();
        this._ws = ws;
        this._connections = [];
        ws.on('message', message => {
          	// 发送数据给所有 connection：A -> B1,B2,B3...
            this._connections.forEach(connection => {
                connection.send(message);
            });
          	// 配合 connect 接收数据：B1,B2,B3... -> A
          	this.emit('message', message);
        });
    }
    send(message) {
        this._ws.send(message);
    }
    connect(connection) {
        this._connections.push(connection);
        connection.on('message', message => {
          	// 其他channel --数据--> 本channel
            this.send(message);
        });
    }
};
