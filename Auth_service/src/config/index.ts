// This file contains all the basic configuration logic for the app server to work
import dotenv from 'dotenv';

type ServerConfig = {
    PORT: number
    ACCESS_TOKEN_SECRET: string
    REFRESH_TOKEN_SECRET: string
}

function loadEnv() {
    dotenv.config();
    console.log(`Environment variables loaded`);
}

loadEnv();

export const serverConfig: ServerConfig = {
    PORT: Number(process.env.PORT) || 3001,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'default_access_token_secret',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'default_refresh_token_secret'
};