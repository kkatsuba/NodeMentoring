import app from './app';
import connection from './data/connection';

const port = process.env.NODE_PORT || 8080;

const runServer = () => app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});

connection()
    .then(runServer)
    .catch(err => {
      console.error('Failed to attempt db connection', err);
    });
