
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

// Handle Replit's proxy environment and set CSP headers
app.use((req, res, next) => {
  // Set correct protocol for Replit's HTTPS proxy
  if (req.headers['x-forwarded-proto'] === 'https') {
    req.secure = true;
  }
  
  // Set Content Security Policy headers for mobile compatibility
  res.setHeader('Content-Security-Policy', [
    "default-src 'self'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://replit.com",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' ws: wss: https:",
    "media-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'"
  ].join('; '));
  
  // Additional headers for mobile compatibility
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
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
console.log("🚀 Starting Vite development server...");
const vite = spawn("npm", ["run", "dev"], {
  cwd: path.join(__dirname, "../client"),
  stdio: "inherit",
  shell: true
});

vite.on("error", (err) => {
  console.error("❌ Failed to start Vite:", err);
});

// Wait for Vite to start, then set up proxy
setTimeout(async () => {
  try {
    const { createProxyMiddleware } = await import("http-proxy-middleware");
    
    // Proxy everything except /api to Vite dev server
    app.use(
      /^(?!\/api).*/,
      createProxyMiddleware({
        target: "http://127.0.0.1:5173",
        changeOrigin: true,
        ws: true,
        secure: false,
        logLevel: 'silent',
        onError: (err, req, res) => {
          console.log("🔄 Proxy fallback - Vite still starting...");
          res.status(200).send(`
            <!DOCTYPE html>
            <html>
              <head>
                <title>VeriFyz - Loading...</title>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                  body { 
                    margin: 0; 
                    font-family: system-ui, -apple-system, sans-serif;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
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
                <script>
                  setTimeout(() => window.location.reload(), 3000);
                </script>
              </head>
              <body>
                <div>
                  <div class="spinner"></div>
                  <h1>VeriFyz Loading...</h1>
                  <p>Starting up development server...</p>
                </div>
              </body>
            </html>
          `);
        }
      })
    );
    console.log("✅ Proxy middleware configured");
  } catch (error) {
    console.error("❌ Failed to set up proxy:", error);
  }
}, 2000);

// Critical: Bind to 0.0.0.0 for Replit's HTTPS proxy
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ VeriFyz Express server running on 0.0.0.0:${PORT}`);
  console.log(`🔗 Replit HTTPS proxy active`);
  console.log(`🌐 Public URL: https://${process.env.REPL_SLUG || 'your-repl'}.${process.env.REPL_OWNER || 'username'}.repl.co`);
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
