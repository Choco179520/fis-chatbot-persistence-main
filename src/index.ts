import express, { Request, Response, NextFunction } from "express";
import { RequestHandler } from "express-serve-static-core";
import documentRoutes from "./routes/documentRoutes";
import responseSetRoutes from "./routes/responseSetRoutes";
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

// @ts-ignore
declare global {
  namespace Express {
    interface Response {
      sendResponse?: (body: any) => void;
    }
  }
}

app.use(express.static("public", { maxAge: 86400000 }));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Request logging middleware
const requestLoggerMiddleware: RequestHandler = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  console.log(`${req.method} ${req.url} at ${new Date()}`);
  next();
};

app.use(requestLoggerMiddleware);
app.use(express.json());

// Content Security Policy middleware
const setCspHeader: RequestHandler = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'");
  next();
};

app.use(setCspHeader);

const cache: Map<string, any> = new Map(); // In-memory cache

const cacheMiddleware: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Check if the response is already cached
  if (cache.has(req.url)) {
    const cachedResponse = cache.get(req.url);
    return res.send(cachedResponse);
  }
  // Define a custom sendResponse function
  res.sendResponse = (body: any) => {
    // Cache the response
    cache.set(req.url, body);
    // Send the response
    res.send(body);
  };
  next();
};

app.use(cacheMiddleware);
app.use("/api", documentRoutes);
app.use("/api", responseSetRoutes);

// Error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
