import { z } from "zod";

export const hotelSchema = z.object({
    name: z.string().min(2).max(100),
    address: z.string().min(5).max(200),
    location: z.string().min(2).max(100),
    rating: z.number().min(0).max(5).optional(),
    ratingCount: z.number().min(0).optional()
})