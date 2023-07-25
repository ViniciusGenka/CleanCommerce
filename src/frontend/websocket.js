const io = require('socket.io-client');

(async () => {
    const socket = io('ws://localhost:3000');
    socket.on('receive-message', (message) => {
        console.log(`estou no client e recebi uma mensage: ${JSON.stringify(message)}`)
    })
    setTimeout(() => {
        socket.emit('send-message', "order-item", "olá, tudo bem?", "user-id")
    }, 3000)
})()