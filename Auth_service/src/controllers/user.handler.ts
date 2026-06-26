import { Request, Response } from 'express';
import { getProfileService, logoutService, refreshTokenService, registerService } from '../services/user.service';
import logger from '../config/logger.config';
import { loginUserService } from '../services/user.service';

export const registerHandler = async (req: Request, res: Response) => {
    // Handle user registration logic here
    try{
        const createdUser = await registerService(req.body);
        logger.info(`User registered successfully: ${createdUser.email}`);
        res.status(201).json({ success: true, message: 'User registered successfully', user: createdUser });
        

    }catch(err){
        logger.error("Error in registerHandler function", err);
        res.status(500).json({ success: false, message: 'User registration failed', error: err });
    }
}

export const loginUserHandler = async (req: Request, res: Response) => {
    try {
        const loggedInUser = await loginUserService(req.body);
        logger.info(`User logged in successfully: ${loggedInUser.user.email}`);
        res.status(200).json({ success: true, message: 'User logged in successfully', user: loggedInUser });
    } catch (err) {
        logger.error("Error in loginUserHandler function", err);
        res.status(500).json({ success: false, message: 'User login failed', error: err });
    }
};

export const refreshTokenHandler = async (
    req: Request,
    res: Response
) => {

    try {

        const token = await refreshTokenService(req.body);

        res.status(200).json({
            success: true,
            message: "Access token refreshed successfully",
            data: token
        });

    } catch (err) {

        logger.error("Error in refreshTokenHandler", err);

        res.status(500).json({
            success: false,
            message: "Failed to refresh access token",
            error: err
        });

    }

}

export const profileHandler = async (req: any, res: Response) => {
    try {
        const profileDetails = await getProfileService({id: req.user.id });
        logger.info(`Profile details fetched successfully: ${profileDetails.email}`);
        res.status(200).json({ success: true, message: 'Profile details fetched successfully', profile: profileDetails });
    } catch (err) {
        logger.error("Error in profileHandler function", err);
        res.status(500).json({ success: false, message: 'Fetching profile details failed', error: err });
    }
};

export const logoutHandler = async (
    req: Request,
    res: Response
) => {

    try {

        const response =
            await logoutService(req.body);

        logger.info("User logged out successfully");

        res.status(200).json({
            success: true,
            message: response.message
        });

    } catch (err) {

        logger.error(
            "Error in logoutHandler",
            err
        );

        res.status(500).json({
            success: false,
            message: "Logout failed",
            error: err
        });

    }

}