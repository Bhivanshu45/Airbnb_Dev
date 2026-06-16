import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();


// usage

// import { prisma } from "./config/prisma";

// const users = await prisma.user.findMany();