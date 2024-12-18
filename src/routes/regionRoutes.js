// Imports the Express package to build a web server and handle HTTP requests
import Express from "express" 

// Imports specific controller functions to handle agent-related requests
import {regionCreate, getRegion, getAllStars } from "../controllers/regionController.js"

import { tokenMiddleware } from "../shared/middleware/baseMiddleware.js"

// Initializes a new router object to handle agent routes
const REGION_ROUTES = Express.Router()

// POST route to create a new agent
REGION_ROUTES.post("/region-create",tokenMiddleware, regionCreate)

// GET route to fetch all agents
REGION_ROUTES.get("/region",tokenMiddleware, getRegion) 

// GET route to fetch agents based on a specific region
REGION_ROUTES.get("/all-stars",tokenMiddleware, getAllStars)


// Exports the router for use in other parts of the application
export default REGION_ROUTES