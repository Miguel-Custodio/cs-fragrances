import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  // Prerendered routes are <route>.html (no trailing-slash redirect): /about -> about.html
  app.get("*", (req, res, next) => {
    const clean = decodeURIComponent(req.path).replace(/\/+$/, "");
    if (!clean || clean.includes("..") || path.extname(clean)) return next();
    const file = path.join(staticPath, `${clean}.html`);
    return res.sendFile(file, (err) => (err ? next() : undefined));
  });

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
