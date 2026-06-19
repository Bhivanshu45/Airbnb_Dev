import Redis from 'ioredis';
import { serverConfig } from '.';

// Singleton pattern to connect to Redis
function connectToRedis() {
    try {

        let connection: Redis;

        return () => {
            if (!connection) {
                connection = new Redis(serverConfig.REDIS_URL,{
                    maxRetriesPerRequest: null
                });
                return connection;
            }

            return connection;
        }
        

    } catch (error) {
        console.error('Error connecting to Redis:', error);
        throw error;
    }
}

export const redisClient = connectToRedis();