import { Role } from "@prisma/client";

export interface SignupDto {
    name: string;
    email: string;
    password: string;
    role: Role;
}