import { SignupDto } from "../dto/signup.dto";
import logger from "../config/logger.config";
import { prisma } from "../config/prisma.config";
import bcrypt from "bcrypt";
import { BadRequestError } from "../utils/errors/app.error";
import { LoginDto, LogoutDto, RefreshTokenDto } from "../dto/login.dto";
import { generateAccessToken, generateRefreshToken } from "../utils/helpers/jwt.util";
import jwt from "jsonwebtoken";
import { serverConfig } from "../config/index";

export const userCreation = async (payload: SignupDto) => {
  try {
    const { name, email, password, role } = payload;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      logger.error(`User with email ${email} already exists.`);
      throw new BadRequestError("User already exists");
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role,
      },
    });

    if (!newUser) {
      logger.error("User creation failed.");
      throw new Error("User creation failed.");
    }

    logger.info(`User created successfully: ${newUser.email}`);
    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };
  } catch (err) {
    logger.error("Error in userCreation function", err);
    throw err;
  }
};

export const loginUser = async (payload: LoginDto) => {
  try {
    const user = await prisma.user.findUnique({
        where: {
            email: payload.email
        }
    });

    if(!user){
        throw new BadRequestError(
            "Invalid email or password"
        );
    }

    const isPasswordValid =
        await bcrypt.compare(
            payload.password,
            user.password
        );

    if(!isPasswordValid){
        throw new BadRequestError(
            "Invalid email or password"
        );
    }

    const accessToken = generateAccessToken({
            id: user.id,
            email: user.email,
            role: user.role
        });

    const refreshToken =
        generateRefreshToken({
            id: user.id
        });

    await prisma.refreshToken.create({
        data: {
            token: refreshToken,
            userId: user.id,
            expiresAt: new Date(
                Date.now() +
                7*24*60*60*1000
            )
        }
    });

    return {
        accessToken,
        refreshToken,
        user: {
            id: user.id,
            email: user.email,
            role: user.role
        }
    };
  } catch (err) {
    logger.error("Error in loginUser function", err);
    throw err;
  }
};

export const refreshAccessToken = async (
    payload: RefreshTokenDto
) => {

    const { refreshToken } = payload;

    // Verify JWT
    const decoded = jwt.verify(
        refreshToken,
        serverConfig.REFRESH_TOKEN_SECRET
    ) as { id: string };

    // Check token exists in DB
    const storedToken = await prisma.refreshToken.findUnique({
        where: {
            token: refreshToken
        }
    });

    if (!storedToken) {
        throw new BadRequestError("Invalid refresh token");
    }

    // Check expiry
    if (storedToken.expiresAt < new Date()) {

        await prisma.refreshToken.delete({
            where: {
                token: refreshToken
            }
        });

        throw new BadRequestError("Refresh token expired");
    }

    // Fetch user
    const user = await prisma.user.findUnique({
        where: {
            id: decoded.id
        }
    });

    if (!user) {
        throw new BadRequestError("User not found");
    }

    const accessToken = generateAccessToken({
        id: user.id,
        email: user.email,
        role: user.role
    });

    return {
        accessToken
    };
}

export const fetchUserProfile = async (payload: { id: string }) => {
  try {
    const user = await prisma.user.findUnique({
        where: {
            id: payload.id
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true
        }
    });
    
    if(!user){
        throw new BadRequestError(
            "User not found"
        );
    }

    return user;
  } catch (err) {
    logger.error("Error in fetchUserProfile function", err);
    throw err;
  }
}

export const logoutUser = async (
    payload: LogoutDto
) => {

    const { refreshToken } = payload;

    // Verify refresh token
    jwt.verify(
        refreshToken,
        serverConfig.REFRESH_TOKEN_SECRET
    );

    // Check if token exists
    const storedToken = await prisma.refreshToken.findUnique({
        where: {
            token: refreshToken
        }
    });

    if (!storedToken) {
        throw new BadRequestError(
            "Refresh token not found"
        );
    }

    // Delete token
    await prisma.refreshToken.delete({
        where: {
            token: refreshToken
        }
    });

    return {
        message: "Logged out successfully"
    };
}
