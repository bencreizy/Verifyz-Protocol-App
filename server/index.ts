
import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

const app = express();
const port = process.env.PORT || 5000;

async function startServer() {
  const vite = await createViteServer({
    server: { 
      middlewareMode: true,
      host: '0.0.0.0',
      hmr: {
        port: 24678,
        host: '0.0.0.0'
      }
    },
    appType: 'custom'
  });

  // Use Vite's dev server as middleware
  app.use(vite.middlewares);

  // Fallback route to serve the index.html file for any non-API requests
  app.use('*', async (req, res, next) => {
    try {
      const url = req.originalUrl;
      const template = await vite.transformIndexHtml(url, 
        await import('fs').then(fs => 
          fs.promises.readFile(path.resolve(process.cwd(), 'client', 'index.html'), 'utf-8')
        )
      );
      res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });

  app.listen(port, '0.0.0.0', () => {
    console.log(`[express] serving on port ${port}`);
    console.log('Vite middleware is set up and running.');
  });
}

startServer();
