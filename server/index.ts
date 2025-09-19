import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Trust Replit's proxy headers
app.set('trust proxy', true);

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/price", (req, res) => {
  res.json({
    price: 0.0075,
    currency: "USD",
    lastUpdated: new Date().toISOString(),
    source: "coingecko"
  });
});

// Serve static files from Vite build
const distPath = path.join(__dirname, "../dist");
app.use(express.static(distPath));

// Fallback to index.html for SPA routing
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// Single server on Replit's port
const PORT = parseInt(process.env.PORT || '5000', 10);

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ VeriFyz server running on 0.0.0.0:${PORT}`);
  console.log(`🌐 Public URL: https://${process.env.REPL_SLUG || 'your-repl'}.${process.env.REPL_OWNER || 'username'}.repl.co`);
});

server.on('error', (err) => {
  console.error('Server error:', err);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});