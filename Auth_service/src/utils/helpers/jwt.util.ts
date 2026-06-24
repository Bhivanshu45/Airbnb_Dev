import jwt from "jsonwebtoken";
import { serverConfig } from "../../config";

export const generateAccessToken = (
    payload: object
) => {
    return jwt.sign(
        payload,
        serverConfig.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "15m"
        }
    );
};

export const generateRefreshToken = (
    payload: object
) => {
    return jwt.sign(
        payload,
        serverConfig.REFRESH_TOKEN_SECRET,
        {
            expiresIn: "7d"
        }
    );
};