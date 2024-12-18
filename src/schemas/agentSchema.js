
// Import mongoose to interact with MongoDB and define schemas and models
import mongoose from "mongoose";

// Define the schema for the "agents" collection in MongoDB
const AGENT_SCHEMA = new mongoose.Schema({

     // First name of the agent (required field
    first_name:{

         // The data type is a string
        type: String,

        // This field must be provided when creating an agent
        required:true

    },

      // Last name of the agent (required field)
    last_name:{

        // The data type is a string
        type: String,

        // This field must be provided when creating an agent
        required:true

    },

    // Email address of the agent (required field
    email:{

        // The data type is a string
        type: String,

        // This field must be provided when creating an agent
        required:true

    },

     // Region where the agent operates (required field)
    region:{

        // The data type is a string
        type: String,

        // This field must be provided when creating an agent
        required:true

    },

    // Rating of the agent, default is 0 if not specified
    rating:{

        // The data type is a number
        type: Number,

        // Default value if not provided
        default: 0

    },

    // Fee charged by the agent, default is 0 if not specified
    fee:{

         // The data type is a number
        type: Number,

         // Default value if not provided
        default: 0

    },

    // Total sales made by the agent, default is 0 if not specified
    sales:{

         // The data type is a number
        type: Number,

         // Default value if not provided
        default: 0

    },

    //Position for the agents
    position:{

         // The data type is a string
        type:String,

         // Default value employee
        default:"employee"

    }
    
})

// Create a model for the "agents" collection using the schema defined above
const AGENTS = mongoose.model("agents", AGENT_SCHEMA)

// Export the AGENTS model for use in other parts of the application
export default AGENTS


