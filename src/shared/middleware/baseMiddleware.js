

const ACCESS_TOKEN = "attack-titan"

export const tokenMiddleware = (req,res,next) => {
    const token = req.headers.authorization
 
    if(!token) {
       return res.status(400).json({
        message:"Authorization token not present in headers"
       })
    }
   if(token !== ACCESS_TOKEN){
    return res.status(400).json ({
        message:"unauthorized, cannoot access endpoint, incorrect token recevied"
    })
    }
    return next()
 }
 