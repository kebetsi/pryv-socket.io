const pryv = require('pryv');

const creds = require('./creds.json');

const con = new pryv.Connection(`https://${creds.token}@${creds.username}.${creds.domain}/`);

const filePath = './README.md';

(async () => {
  const result = await con.createEventWithFile(
    {
      type: 'file/attached',
      streamId: 'diary'
    },
    filePath
  );
  console.log('created', JSON.stringify(result, null, 2))
})();
