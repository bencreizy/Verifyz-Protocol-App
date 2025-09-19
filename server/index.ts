import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
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

// In development, we'll proxy to the Vite dev server
if (process.env.NODE_ENV !== "production") {
  // Import vite dynamically in development
  const setupViteProxy = async () => {
    const { createProxyMiddleware } = await import("http-proxy-middleware");
    
    // Proxy everything except /api to Vite dev server running on port 5173
    app.use(
      /^(?!\/api).*/,
      createProxyMiddleware({
        target: "http://localhost:5173",
        changeOrigin: true,
        ws: true,
        onError: (err, req, res) => {
          console.error("Proxy error:", err);
          // If Vite isn't running, serve a basic HTML page
          res.status(200).send(`
            <!DOCTYPE html>
            <html>
              <head>
                <title>Starting Vite...</title>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
              </head>
              <body>
                <div style="display: flex; align-items: center; justify-content: center; height: 100vh; font-family: sans-serif;">
                  <div style="text-align: center;">
                    <h1>Starting Development Server...</h1>
                    <p>Please wait a moment and refresh the page.</p>
                  </div>
                </div>
              </body>
            </html>
          `);
        }
      })
    );
  };
  
  setupViteProxy().catch(console.error);
} else {
  // In production, serve the built client files
  const clientPath = path.join(__dirname, "../client/dist");
  app.use(express.static(clientPath));
  
  // Catch-all for client-side routing
  app.get("*", (req, res) => {
    res.sendFile(path.join(clientPath, "index.html"));
  });
}

const PORT = parseInt(process.env.PORT || "5000", 10);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on http://0.0.0.0:${PORT}`);
  
  // Also start Vite in development
  if (process.env.NODE_ENV !== "production") {
    import("child_process").then(({ spawn }) => {
      console.log("Starting Vite development server...");
      const vite = spawn("npx", ["vite", "--host", "0.0.0.0"], {
        cwd: path.join(__dirname, "../client"),
        stdio: "inherit",
        shell: true
      });
      
      vite.on("error", (err) => {
        console.error("Failed to start Vite:", err);
      });
    });
  }
});