import express from "express";
import { createServer } from "http";
import { setupVite } from "./vite.js";
import { registerRoutes } from "./routes.js";

const app = express();
const server = createServer(app);

// Setup middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup routes
registerRoutes(app);

// Setup Vite in development or serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("dist"));
} else {
  await setupVite(app);
}

const PORT = process.env.PORT || 3000;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
