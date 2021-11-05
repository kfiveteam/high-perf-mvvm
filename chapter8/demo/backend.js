import { nanoid } from 'nanoid';
const ws = new WebSocket(`ws://127.0.0.1:8899/backend/${nanoid()}`);

ws.onopen = () => {
    ws.send('backend ready');
};
ws.onmessage = (e) => {
    console.log('backend get msg', e)
};

setInterval(() => {
    ws.send('hello, Im backend');
}, 1000);
