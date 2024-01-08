require('dotenv').config();
const app = require('./index');
const http = require('http');

const port = process.env.PORT || 4000;

const server = http.createServer(app);
server.listen(port, (err) => {
  if (err) {
    console.error('Something bad happened:', err);
    process.exit(1); // Exit the process if there's an error
  }

  console.log(`** Server is listening on port ${port} **`);
});

// Optional: Handle process signals for graceful shutdown
process.on('SIGINT', () => {
  console.log('Received SIGINT. Closing server gracefully.');
  server.close(() => {
    console.log('Server closed. Exiting process.');
    process.exit(0);
  });
});
