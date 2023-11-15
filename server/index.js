import {createServer} from 'https';
import {readFileSync} from 'fs';
import WebSocket, { WebSocketServer } from 'ws';


// const server = createServer({cert: readFileSync('/path/to/cert.pem'), key: readFileSync('/path/to/key.pem')});
// const wss = new WebSocketServer({ server });
// server.listen(9001);
const connections = new Set();
const wss = new WebSocketServer({port: 9001});

wss.on('connection', ws => {
    connections.add(ws);
    ws.on('error', console.error);

    ws.on('message', (data,isBinary)=>{
        console.log('received: %s', data);
        wss.clients.forEach(client=>{
            if(client.readyState===WebSocket.OPEN){
                client.send(data,{binary:isBinary});
            }
        })
    });

    ws.send('something');
    


});
