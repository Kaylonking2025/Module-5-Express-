# Module-5
Back End Development 2

## set up all our endpoints
- Routes file for all similar endpoints (all agent endpoints have 1 route file)
- Controller file for all similar endpoint functions (all your agent functions will go in one file)

1. Make sure our routes file is imported and used in app.js
2. Make sure that our controller file exports its functions
3. Make sure that our controller functions are being imported into our routes
4. Create the required endpoint in our routes file
5. Create an appropriate function in the controller file
6. Import that function into your route
7. Have the endpoint call that specific function

## Making our controllers functional

1. Define what functional means

--------------------------------------------------------------------------------
POST
Endpoint - '/region-create'

Create regions for North, East, South and West
Set top_agents to be the three agents with the top sales in that region
Create 4 new agents using previous API's - one for each region.  Use these agents as 'manager'
total_sales will need to be the sum of all sales for agents in region
Send a response Error if region already exists

Functional: 
- We are recieving the data for a agents in different regions
- We are creating a 4 new agents for each region assigning them as agents
- We are added the total sales of agents in each region
- We are sending a message back to the user a error if region already exists
--------------------------------------------------------------------------------

GET
Endpoint - '/agents'

Returns all agents, sorted alphabetically by 'last_name'

Functional:
- get all the agent information out of the database using schema
- sort them by last_name alphabetically
- Make sure information is returned properly
--------------------------------------------------------------------------------

GET
Endpoint - '/agents-by-region'

Required query parameter: 'region'
Returns all agents, sorted by 'rating'

Functional:
- Query parameter by region
- Return all agents sorted by rating 
 
--------------------------------------------------------------------------------

PUT or PATCH
Endpoint - '/agent-update-info'

Only allow updates to 'first_name', 'last_name', 'email' and 'region'
Return error if agent does not already exist

Functional 
-  Allow updates to be made only to 'first_name', 'last_name', 'email' and 'region'
 
--------------------------------------------------------------------------------

DELETE
Endpoint - '/agent-delete'

Accepts any valid parameters
First check to make sure query returns only one agent
Return error and do not delete if improper request or multiple records returned.  Error message should be specific


What is middleware in terms of server side development?

Middleware in server-side development is like a helper that sits between the user's request and the server's response.


How do you implement middleware in an express.js server side?

To implement middleware in an Express.js server, you simply create a function that runs during the request-response cycle. 


What is the purpose of the next parameter in middleware functions?

the next parameter in a middleware function tells Express to move on to the next step in the request-response process.