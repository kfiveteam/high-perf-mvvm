const http = require('http');
const Koa = require('koa');
const WebSocket = require('ws');
const ChannelMultiplex = require('./ChannelMultiplex');

class Server {
    constructor(options) {
        this.hostname = options.hostname || '0.0.0.0';
        this.port = options.port || 8899;
        this._createServer();
    }
    _createServer() {
        this.app = new Koa();
        this._server = http.createServer(this.app.callback());
        this._server.on('error', err => {});
    }
    listen() {
        return this._server.listen(this.port, this.hostname, err => {
            if (err) { return; }
            this._createSocketServer();
        });
    }
    _createSocketServer() {
        if (this._wsServer) { return; }
        this._wsServer = new WebSocketServer(this._server);
    }
};

class WebSocketServer {
    constructor(server) {
      	this.channelMultiplex = new ChannelMultiplex();
        this.server = server;
        const that = this;
        const wss = (this._wss = new WebSocket.Server({noServer: true}));
        server.on('upgrade', function(request, socket, head) {
            wss.handleUpgrade(request, socket, head, ws => {
                const [_, role, id] = request.url.split('/');
                switch (role) {
                    case 'backend':
                        that.channelMultiplex.createBackendChannel(id, ws);
                        break;
                    case 'frontend':
                        that.channelMultiplex.createFrontendChannel(id, ws);
                        break;
                  default: break;
                }
            });
        });
    }
};

new Server({
    port: 8899
}).listen();
