
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { spawn } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Trust Replit's proxy headers for HTTPS detection
app.set('trust proxy', true);

// Handle Replit's proxy environment
app.use((req, res, next) => {
  // Set correct protocol for Replit's HTTPS proxy
  if (req.headers['x-forwarded-proto'] === 'https') {
    req.secure = true;
  }
  next();
});

// Middleware - Enhanced CORS for mobile access
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Mock API endpoints for the frontend
app.get("/api/price", (req, res) => {
  res.json({
    price: 0.0075,
    currency: "USD",
    lastUpdated: new Date().toISOString(),
    source: "coingecko"
  });
});

const PORT = parseInt(process.env.PORT || '5000', 10);

// Start Vite dev server first
console.log("Starting Vite development server...");
const vite = spawn("npm", ["run", "dev"], {
  cwd: path.join(__dirname, "../client"),
  stdio: "inherit",
  shell: true
});

vite.on("error", (err) => {
  console.error("Failed to start Vite:", err);
});

// Wait a moment for Vite to start, then set up proxy
setTimeout(async () => {
  try {
    const { createProxyMiddleware } = await import("http-proxy-middleware");
    
    // Proxy everything except /api to Vite dev server
    app.use(
      /^(?!\/api).*/,
      createProxyMiddleware({
        target: "http://localhost:5173",
        changeOrigin: true,
        ws: true,
        secure: false, // Allow proxy to insecure backend
        xfwd: true, // Add X-Forwarded-* headers
        onError: (err, req, res) => {
          console.error("Proxy error:", err);
          res.status(200).send(`
            <!DOCTYPE html>
            <html>
              <head>
                <title>VeriFyz - Starting...</title>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                  body { 
                    margin: 0; 
                    font-family: system-ui, -apple-system, sans-serif;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                  }
                  .container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    text-align: center;
                  }
                  .spinner {
                    width: 40px;
                    height: 40px;
                    border: 4px solid rgba(255,255,255,0.3);
                    border-radius: 50%;
                    border-top-color: white;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 20px;
                  }
                  @keyframes spin {
                    to { transform: rotate(360deg); }
                  }
                </style>
              </head>
              <body>
                <div class="container">
                  <div>
                    <div class="spinner"></div>
                    <h1>Starting VeriFyz...</h1>
                    <p>Please wait a moment and refresh the page.</p>
                  </div>
                </div>
              </body>
            </html>
          `);
        }
      })
    );
  } catch (error) {
    console.error("Failed to set up proxy:", error);
  }
}, 2000);

const server = app.listen(PORT, () => {
  console.log(`✅ VeriFyz server running on port ${PORT}`);
  console.log(`🔗 Replit HTTPS proxy ready`);
  console.log(`🌐 Server accessible at: https://${process.env.REPL_SLUG || 'your-repl'}.${process.env.REPL_OWNER || 'username'}.repl.co`);
  console.log(`Environment PORT: ${process.env.PORT || 'not set, defaulting to 5000'}`);
});

// Handle server errors
server.on('error', (err) => {
  console.error('Server error:', err);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});
