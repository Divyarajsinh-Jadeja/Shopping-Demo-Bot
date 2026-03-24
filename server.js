const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const dotenv = require("dotenv");

const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

// Load environment variables from .env if present
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";

// Log every incoming request (method + URL)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// Enable basic security headers
app.use(helmet());

// Limit repeated requests to reduce abuse
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200, // limit each IP to 200 requests per window
    standardHeaders: true,
    legacyHeaders: false
  })
);

// Enable CORS (set CORS_ORIGIN in production to a specific domain)
app.use(
  cors({
    origin: CORS_ORIGIN === "*" ? true : CORS_ORIGIN
  })
);

// Parse JSON request bodies
app.use(express.json({ limit: "50kb" }));

// OpenAPI spec endpoint for ChatGPT Custom GPT Actions
app.get("/openapi.json", (req, res) => {
  res.status(200).json({
    openapi: "3.1.0",
    info: {
      title: "Shopping Demo API",
      version: "1.0.0",
      description: "Simple shopping backend for product listing and order creation."
    },
    servers: [
      {
        url: BASE_URL
      }
    ],
    paths: {
      "/products": {
        get: {
          operationId: "getProducts",
          summary: "Get all products",
          responses: {
            "200": {
              description: "Array of products",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "integer" },
                        name: { type: "string" },
                        price: { type: "number" },
                        image: { type: "string", format: "uri" },
                        url: { type: "string", format: "uri" }
                      },
                      required: ["id", "name", "price", "image", "url"]
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/order": {
        post: {
          operationId: "createOrder",
          summary: "Create an order by product id",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    productId: { type: "integer" }
                  },
                  required: ["productId"]
                }
              }
            }
          },
          responses: {
            "200": {
              description: "Order created",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean" },
                      message: { type: "string" },
                      payment_url: { type: "string", format: "uri" }
                    },
                    required: ["success", "message", "payment_url"]
                  }
                }
              }
            },
            "400": { description: "Invalid request body" },
            "404": { description: "Product not found" }
          }
        }
      }
    }
  });
});

// Product routes
// Final endpoint: GET /products
app.use("/products", productRoutes);

// Order routes
// Final endpoint: POST /order
app.use("/order", orderRoutes);

// Simple health endpoint to check if server is running
app.get("/", (req, res) => {
  res.status(200).send("API is running 🚀");
});

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found"
  });
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error"
  });
});

// Start server on port 3000
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  console.log(`OpenAPI spec available at ${BASE_URL}/openapi.json`);
});
