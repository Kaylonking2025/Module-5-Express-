// Import the Express package to create and manage routes for handling HTTP requests
import Express from "express"

// Import the 'helloWorld' controller function from the health controller
import {helloWorld} from "../features/health/health.controller.js"

// Create a new Express router instance for health-related routes
const HEALTH_ROUTES = Express.Router()

// Define a GET route to handle requests to the '/hello' endpoint
// When a GET request is made to '/hello', the 'helloWorld' function is called to handle the request
HEALTH_ROUTES.get('/hello', helloWorld);

// Export the HEALTH_ROUTES router so it can be used in other parts of the application
export default HEALTH_ROUTES