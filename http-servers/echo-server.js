const http = require('http');

const server = http.createServer((request, response) => {
    request.pipe(response);
});

const port = process.env.PORT || 8080;
server.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});