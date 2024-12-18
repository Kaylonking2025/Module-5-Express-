// Import the AGENTS model from the schema to interact with the "agents" collection in MongoDB
import REGION from "../schemas/regionSchema.js"
import AGENTS from "../schemas/agentSchema.js";

//-----------------------------------------------------regionCreate----------------------------------------------------------//
// This endpoint allows clients to create a new agent and stores the agent's data in the database
export const regionCreate = async (req,res) => {

    const { region } = req.query;
    const regionNames = ['North', 'East', 'South', 'West'];

    // Validate that region is one of the allowed regions
    if (!regionNames.includes(region)) {
        return res.status(400).send({ message: 'Invalid region. Must be one of: North, East, South, West.' });
    }

    // Check if the region already exists
    const existingRegion = await REGION.findOne({ region: region });
    if (existingRegion) {
     return res.status(400).send({ message: `Region ${region} already exists.` });
     }

    // Ensure the region is provided
    if (!region) {
        return res.status(400).send({ message: 'Region is required' });
    }

    // Query the AGENTS collection to find all agents in the specified region
    const agentsByRegion = await AGENTS.find({ region: region }).sort({ total_sales: 1 }).limit(3).all();

    // Check if there are agents in the specified region
    if (agentsByRegion.length === 0) {
    return res.status(404).send({ message: 'No agents found in this region' });
    }

    // Calculate total_sales by summing sales of all agents in the region
    const allAgentsInRegion = await AGENTS.find({ region: region })
    let totalSales= 0
    allAgentsInRegion.forEach((agent) => {
        totalSales += agent.sales
    });
    
    const regionManager = allAgentsInRegion.find(agent => agent.position === "Manager")

    const Createregion = new REGION({

        // First name of the agent
        region:region,

        // Last name of the agent
        address:`189 ${region} Asmouth Head, Bully City, 45677`,

        // Email of the agent
        total_sales: totalSales,

        // Region of the agent
        manager:regionManager,

        //Rating of the agent
        top_agents:agentsByRegion,

    })
    
    await Createregion.save()
    
    
    
    // Respond with the updated region
    res.status(200).send({ message: 'Region created successfully', region: Createregion, total_sales: totalSales})
}



//-------------------------------------------getRegion----------------------------------------------------------//

export const getRegion = async (req, res) => {
    const { region } = req.query;
    
    // Ensure that the region parameter is provided
    if (!region) {
        return res.status(400).send({ message: 'Region is required.' });
    }

    try {
        // Query the database for the specified region (should only return one document)
        const regionData = await REGION.findOne({ region: region });

        // Check if the region exists
        if (!regionData) {
            return res.status(404).send({ message: `Region ${region} not found.` });
        }

        // Return the region data
        res.status(200).send({ region: regionData });
        
    } catch (err) {
        // Handle any unexpected errors
        console.error(err);
        res.status(500).send({ message: 'An error occurred while fetching region data.' });
    }
};


//-------------------------------------------------getAllstarsinfo--------------------------------------------------------------//

export const getAllStars = async (req,res) => {
    const allNorthAgents = await AGENTS.find({region:"North"}) 
    const allSouthAgents = await AGENTS.find({region:"South"})
    const allEastAgents = await AGENTS.find({region:"East"})
    const allWestAgents = await AGENTS.find({region:"West"})

    //sort the agents reting and only take the top rated agent
    const northAgentsSorted = allNorthAgents.sort((a, b) => b.sales - a.sales)
    const southAgentsSorted = allSouthAgents.sort((a, b) => b.sales - a.sales)
    const eastAgentsSorted = allEastAgents.sort((a, b) => b.sales - a.sales)
    const westAgentsSorted = allWestAgents.sort((a, b) => b.sales - a.sales)

    // Select the top agent from each region (first after sorting)
    const topNorthAgent = northAgentsSorted[0];
    const topSouthAgent = southAgentsSorted[0];
    const topEastAgent = eastAgentsSorted[0];
    const topWestAgent = westAgentsSorted[0];



     // Respond with the top agents in each region
     res.json({
        North: topNorthAgent,
        South: topSouthAgent,
        East: topEastAgent,
        West: topWestAgent,
    }); 
};