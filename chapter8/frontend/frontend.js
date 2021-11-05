/**
 * @file
 */
// url: http://127.0.0.1:5500/index.html?ws=127.0.0.1:8899/frontend/TAblp_DU2o_V-bJYVtgqF
const wsUrl = location.search.slice(1).replace('=', '://'); 
const ws = new WebSocket(wsUrl);

ws.onopen = () => {
    ws.send('frontend ready');
};
ws.onmessage = (e) => {
    console.log('frontend get msg', e)
};

setInterval(() => {
    ws.send('hello, Im frontend');
}, 1000);
