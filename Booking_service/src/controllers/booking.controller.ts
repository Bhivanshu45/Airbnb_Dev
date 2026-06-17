import { createBookingService,finalizeBookingService } from "../services/booking.service";
import { Request, Response } from "express";

export const createBookingHandler = async(  req: Request, res: Response) => {
    const booking = await createBookingService(req.body);
    res.status(201).json({
        message: "Booking created successfully",
        booking
    });
    
}

export const confirmBookingHandler = async( req: Request, res: Response) => {
    const booking = await finalizeBookingService(req.params.idempotencyKey);
    res.status(200).json({
        message: "Booking confirmed successfully",
        booking
    });
}