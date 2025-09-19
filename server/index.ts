
import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

const app = express();
const port = process.env.PORT || 5000;

async function startServer() {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom'
  });

  // Use Vite's development server as middleware
  app.use(vite.middlewares);

  // Fallback route to serve the index.html file for any non-API requests
  app.use('*', (req, res) => {
    // Correctly serve the index.html file
    const indexPath = path.resolve(process.cwd(), 'client', 'index.html');
    res.sendFile(indexPath);
  });

  app.listen(port, '0.0.0.0', () => {
    console.log(`[express] serving on port ${port}`);
    console.log('Vite middleware is set up and running.');
  });
}

startServer();
