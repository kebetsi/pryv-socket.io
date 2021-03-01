const pryv = require('pryv');
const io = require('socket.io-client');

const creds = require('./creds.json');

const con = new pryv.Connection(`https://${creds.token}@${creds.username}.${creds.domain}/`);

const socket = io(`https://${creds.username}.${creds.domain}/${creds.username}?auth=${creds.token}`);

let modifiedSince = Date.now() / 1000;

socket.on('connect', async () => {
  console.log('im in');
})
socket.on('eventsChanged', async () => {
  socket.emit('events.get', { modifiedSince: modifiedSince}, (err, res) => {
    console.log('retrieved', JSON.stringify(res, null, 2))
    modifiedSince = res.meta.serverTime;
  })
});
