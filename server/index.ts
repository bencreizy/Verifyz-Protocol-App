
<old_str>
import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

const app = express();
const port = process.env.PORT || 3000;

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

  app.listen(port, () => {
    console.log(`[express] serving on port ${port}`);
    console.log('Vite middleware is set up and running.');
  });
}

startServer();
</old_str>
<new_str>
import express, { type Request, Response, NextFunction } from "express";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
const isProduction = process.env.NODE_ENV === "production";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  // Register API routes here when you add them
  // app.use('/api', apiRoutes);

  if (isProduction) {
    log("Production mode: Serving static files from dist");
    await serveStatic(app);
  } else {
    log("Development mode: Setting up Vite middleware");
    await setupVite(app);
  }

  const port = parseInt(process.env.PORT || '5000', 10);
  const server = app.listen(port, "0.0.0.0", () => {
    log(`VeriFyz server running on port ${port} (${isProduction ? 'production' : 'development'})`);
    log(`Server accessible at http://0.0.0.0:${port}`);
    if (isProduction) {
      log("Ready for Replit SSL proxy - single HTTP endpoint active");
    }
  });

  // Handle deployment environment signals
  const shutdown = (signal: string) => {
    log(`Received ${signal}. Shutting down gracefully.`);
    server.close((err) => {
      if (err) {
        log(`Error during shutdown: ${err.message}`);
        process.exit(1);
      }
      log("Server closed successfully");
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
})();
</new_str>
