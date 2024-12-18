// Import mongoose to interact with MongoDB and define schemas and models
import mongoose from "mongoose";

// Define the schema for the "agents" collection in MongoDB
const REGION_SCHEMA = new mongoose.Schema({

     // The region of the agent 
    region:{

         // The data type is a string
        type: String,

        // This field must be provided when creating an agent
        required:true

    },

      //This is the address of the agent 
    address:{

        // The data type is a string
        type: String,

        // This field must be provided when creating an agent
        required:true

    },

    // total Sales for the agent 
    total_sales:{

        // The data type is a string
        type: Number,

        // This field must be provided when creating an agent
        required:true,

        // You might want to add a minimum value validation (e.g., sales cannot be negative)
        min: [0, 'Total sales cannot be negative']
    },

     // Manager of the agent  
    manager:{

        // The data type is a string
        type: String,

       // This field must be provided when creating an agent
       required: true
    },

    // Top agents in region
    top_agents:{

        // The data type is a number
        type: Array,

        // Default value if not provided
        required: true

    },
    
})

// Create a model for the "agents" collection using the schema defined above
const REGION = mongoose.model("region", REGION_SCHEMA)

// Export the AGENTS model for use in other parts of the application
export default REGION
