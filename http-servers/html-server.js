const http = require('http');
const fs = require('fs');
const path = require('path');
const through2 = require('through2');

const template = (input, templateObj = {}) => {
    if (!Object.keys(templateObj).length) {
        return input;
    }

    let result = input;
    for (const key in templateObj) {
        if (!templateObj.hasOwnProperty(key)) continue;

        result = result.replace(new RegExp(`{${key}}`, 'g'), () => templateObj[key]);
    }
    return result;
};

const server = http.createServer((request, response) => {
    const indexPath = path.join(__dirname, 'index.html');
    const data = {
        greeting: 'Hello',
        name: 'World !'
    };

    response.writeHead(200, {
        'Content-Type': 'text/html'
    });

    fs.createReadStream(indexPath).pipe(through2((chunk, enc, cb) => {
        const resChunk = template(chunk.toString('utf8'), data);
        cb(null, resChunk);
    })).pipe(response);
});

const port = process.env.PORT || 8080;
server.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});