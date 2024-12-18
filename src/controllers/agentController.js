// Import the AGENTS model from the schema to interact with the "agents" collection in MongoDB
import AGENTS from "../schemas/agentSchema.js"

//---------------------------------------------Agent Create-----------------------------------------------------//
// This endpoint allows clients to create a new agent and stores the agent's data in the database
export const agentCreate = async (req,res) => {

     // Destructure the incoming request body to get agent details
    const {
        first_name,
        last_name,
        email,
        region,
        rating,
        sales,
        position,
    } = req.body

    // Create a new agent using the AGENTS model, passing the received data
    const createAgent = new AGENTS({

        // First name of the agent
        first_name:first_name,

        // Last name of the agent
        last_name:last_name,

        // Email of the agent
        email:email,

        // Region of the agent
        region:region,

        //Rating of the agent
        rating:rating,

        position:position,

        sales: sales,

    })

    // Attempt to save the newly created agent to the database
    const savedAgent = await createAgent.save()

    // If the agent could not be saved, return a 400 error with a message
    if(!savedAgent){
        return res.status(400).json({message:"Agent could not be saved"})
    }

    // If the agent is saved successfully, return a 201 status with a success message and saved data
    return res.status(201).json({message:"Agent saved", data: savedAgent})

}

//--------------------------------------------GetALLAgentsInfo-----------------------------------------//
// GET request handler to retrieve all agents
export const getAllAgents = async(req,res) => {

      // Sorting by 'last_name' in ascending order
    const allAgents = await AGENTS.find().sort({ last_name: 1 });



    // Send sorted data back to the client
    res.status(200).send(allAgents)

}

//-------------------------------------------------------------GetAgentsbyregion-----------------------------------------//
// GET request handler to retrieve agents by region
// Placeholder for future functionality to filter agents based on their region
export const getAgentsByRegion = async(req,res) => {

   
    const { region } = req.query;

    // Query the AGENTS collection to find all agents in the specified region
    const agentsByRegion = await AGENTS.find({ region: region }).sort({ rating: -1,  last_name: 1 });

     // Check if any agents are found
    if (agentsByRegion.length === 0) {
        return res.status(404).json({message:"No agents found in the specified region"})
    }

    res.send(agentsByRegion)
}

//----------------------------------------------------------PatchUpdateAgentInfo----------------------------------------------------------//
// PATCH request handler to update agent information
// Placeholder for future functionality to update an agent's data
export const patchUpdatedAgentInfo = async(req,res) => {

     // Get the fields to update from the request
    const { first_name, last_name, email, region, rating, position, sales } = req.body;

 // Get the 'agentId' parameter from the request query
    const { agentId } = req.query;

    // Prepare an object with only allowed fields
    const allowedUpdates = { first_name, last_name, email, region, rating, position, sales };

// Filter out any undefined fields (in case some fields are not provided in the request)
const updateFields = Object.fromEntries(
    Object.entries(allowedUpdates).filter(([key, value]) => value !== undefined)
  );

  // If there are no fields to update, return an error
  if (Object.keys(updateFields).length === 0) {
    return res.status(400).json({ message: 'No valid fields to update' });
  }

  // Find the agent by ID and update with the filtered fields
  const updatedAgentInfo = await AGENTS.findByIdAndUpdate(agentId, updateFields, {

      // Return the updated document
    new: true,

    // Ensure the update passes model validation
    runValidators: true  
  });

  if (!updatedAgentInfo) {
    return res.status(404).json({ message: 'Agent not found' });
  }

    res.send(updatedAgentInfo)
}

//-----------------------------------------------------------deleteAgentInfo-----------------------------------------------------//
// DELETE request handler to delete an agent's information
// Placeholder for future functionality to delete an agent from the database
export const deleteAgentInfo = async(req,res) => {

  // Ensure the request method is DELETE
  if (req.method !== 'DELETE') {
    return res.status(405).send({ message: 'Method Not Allowed' });
  }
  // Get the 'agentId' parameter from the request query
   const { agentId } = req.query;

   // Check if the agentId is provided
   if (!agentId) {
    return res.status(400).send({ message: 'Agent ID is required' });
  }
  // Assume `Agent` is the model for agents in the database
  const agent = await AGENTS.findById(agentId);
  
  // If agent is not found, return an error
  if (!agent) {
    return res.status(404).send({ message: 'Agent not found' });
}
  // Perform the deletion
   await agent.remove();

   // Send a success response (204 No Content for successful deletion)
   return res.status(204).send({ message: 'Agent deleted successfully' });
   
};
