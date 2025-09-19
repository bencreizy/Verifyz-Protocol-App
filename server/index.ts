import express from "express";
import path from "path";

const app = express();

// Serve static files from public directory
app.use(express.static("public"));

// Serve the React app from client/dist in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
}

// Example route
app.get("/", (req, res) => {
  res.send("Server is running and SSL should now work!");
});

// API routes (keeping your existing API functionality)
app.get("/api/presale/prices", (req, res) => {
  res.json({
    maticUsd: 0.257,
    vfyzUsd: 0.05,
    presaleActive: true,
    presalePhase: 1,
    totalRaised: 0,
    maxCap: 1000000,
    updated: new Date().toISOString(),
    source: "coingecko"
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on http://0.0.0.0:${PORT}`);
});