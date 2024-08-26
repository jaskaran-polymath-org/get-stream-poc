import { PORT } from '../constants';
import { app } from 'app';


const server = app.listen(PORT, () => {
  console.log(`✅ App is listening on port: ${PORT}`);
});

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

function gracefulShutdown() {
  console.log('SIGINT signal received: closing HTTP server');

  server.close(() => {
    console.log('HTTP server closed');
  });
}
