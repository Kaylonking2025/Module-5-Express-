// Initial dependencies and definitions


// Import dotenv to load environment variables
import dotenv from "dotenv"

// Import Express framework
import Express from "express"

// Import MongoDB connection manager
import { openMongoConnection } from "./mongo-manager.js";

// Load environment variables from .env file
dotenv.config()

 // Initialize an Express app
const app = Express();

// Define the port from environment variable or default to 3004
const port = process.env.PORT || 3004;

// Import routes

// Import health check routes
import HealthRoutes from "./src/routes/health.routes.js"

// Import agent-related routes
import AGENT_ROUTES from "./src/routes/agentRoutes.js";

import REGION_ROUTES from "./src/routes/regionRoutes.js";

// Middleware to parse incoming JSON requests
app.use(Express.json());

 // Use health routes in the app
app.use(HealthRoutes)

// Use agent routes in the app
app.use(AGENT_ROUTES)


app.use(REGION_ROUTES)

 // Open MongoDB connection
openMongoConnection();

// Start server and listen on the defined port
app.listen(port, () => {
    
    // Log a message once the server starts
    console.log(`server is listening on port ${port}`)
})