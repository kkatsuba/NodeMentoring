const http = require('http');

const server = http.createServer((request, response) => {
    const product = {
        id: 1,
        name: 'Supreme T-Shirt',
        brand: 'Supreme',
        price: 99.99,
        options: [{
            color: 'blue'
        }, {
            size: 'XL'
        }]
    };

    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(product));
});

const port = process.env.PORT || 8080;
server.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});