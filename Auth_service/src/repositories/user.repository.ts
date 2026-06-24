import { SignupDto } from "../dto/signup.dto";
import logger from "../config/logger.config";
import { prisma } from "../config/prisma.config";
import bcrypt from "bcrypt";
import { BadRequestError } from "../utils/errors/app.error";
import { LoginDto } from "../dto/login.dto";
import { generateAccessToken, generateRefreshToken } from "../utils/helpers/jwt.util";

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
