import { ErrorResponse } from "../../utils/ErrorResponse.js";

export default async (req, res, next) => {
    console.log("session in auth gard ", req.session)
    if(!req.session.isConnected)
        return next(new ErrorResponse("you need to login first", 403));
    
    //console.log(req.session);
    return next();
}