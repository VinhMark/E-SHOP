const app = require('./app');
const connectDb = require('./db/Database');

// Handling uncaught Exception
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  console.log('Shutting dow serve for handling uncaught exception.');
});

// Config
if (process.env.NODE_ENV !== 'PRODUCTION') {
  require('dotenv').config({
    path: 'backend/config/.env',
  });
}

// Connect db
connectDb();

// Create server
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://locahost:${process.env.PORT}`);
});

// Unhandled promise rejection
process.on('unhandledRejection', (err) => {
  console.log(`Shutting down the server for ${err.message}`);
  console.log(`Shutting down the server for unhandled promise rejection.`);

  server.close(() => {
    process.exit(1);
  });
});
