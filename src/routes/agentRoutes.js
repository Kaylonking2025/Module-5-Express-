
// Imports the Express package to build a web server and handle HTTP requests
import Express from "express"

import { tokenMiddleware } from "../shared/middleware/baseMiddleware.js"

// Imports specific controller functions to handle agent-related requests
import { agentCreate, getAllAgents, getAgentsByRegion, patchUpdatedAgentInfo, deleteAgentInfo } from "../controllers/agentController.js"

// Initializes a new router object to handle agent routes
const AGENT_ROUTES = Express.Router()

// POST route to create a new agent
AGENT_ROUTES.post("/agent-create", tokenMiddleware, agentCreate)

// GET route to fetch all agents
AGENT_ROUTES.get("/agents",tokenMiddleware, getAllAgents) 

// GET route to fetch agents based on a specific region
AGENT_ROUTES.get("/agents-by-region",tokenMiddleware, getAgentsByRegion)

// PATCH route to update an agent's information
AGENT_ROUTES.patch("/agent-update-info",tokenMiddleware, patchUpdatedAgentInfo)

// DELETE route to remove an agent's information
AGENT_ROUTES.delete("/agent-delete",tokenMiddleware, deleteAgentInfo)

// Exports the router for use in other parts of the application
export default AGENT_ROUTES