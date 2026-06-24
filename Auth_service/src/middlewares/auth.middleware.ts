import jwt from "jsonwebtoken";

export const authenticate = (
    req: any,
    res: any,
    next: any
) => {

    const header =
        req.headers.authorization;

    if(!header){
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    const token =
        header.split(" ")[1];

    try{

        const decoded =
            jwt.verify(
                token,
                process.env.ACCESS_TOKEN_SECRET!
            );

        req.user = decoded;

        next();

    }catch(err){

        return res.status(401).json({
            message: "Invalid token"
        });
    }
}