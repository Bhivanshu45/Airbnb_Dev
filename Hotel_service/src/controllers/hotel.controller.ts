import { Request, Response, NextFunction } from 'express';
import { createHotelService, getAllHotelsService, getHotelByIdService } from '../services/hotel.service';

export async function createHotelHandler(req: Request, res: Response, next: NextFunction) {
    // 1. call theservice layer
    const hotelResponse = await createHotelService(req.body);

    // 2. handle the response
    res.status(201).json({
        success: true,
        message: 'Hotel created successfully',
        data: hotelResponse
    });
}

export async function getHotelByIdHandler(req: Request, res: Response, next: NextFunction) {
    const hotelResponse = await getHotelByIdService(Number(req.params.id));
    res.status(200).json({
        success: true,
        message: 'Hotel retrieved successfully',
        data: hotelResponse
    });
}

export async function getAllHotelsHandler(req: Request, res: Response, next: NextFunction) {
    const hotels = await getAllHotelsService();
    res.status(200).json({
        success: true,
        message: 'Hotels retrieved successfully',
        data: hotels
    });
}