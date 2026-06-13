import { Request, Response, NextFunction } from 'express';
import { createHotelService, getAllHotelsService, getHotelByIdService, deleteHotelService } from '../services/hotel.service';
import { StatusCodes } from 'http-status-codes';

export async function createHotelHandler(req: Request, res: Response, next: NextFunction) {
    // 1. call theservice layer
    const hotelResponse = await createHotelService(req.body);

    // 2. handle the response
    res.status(StatusCodes.CREATED).json({
        success: true,
        message: 'Hotel created successfully',
        data: hotelResponse
    });
}

export async function getHotelByIdHandler(req: Request, res: Response, next: NextFunction) {
    const hotelResponse = await getHotelByIdService(Number(req.params.id));
    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Hotel retrieved successfully',
        data: hotelResponse
    });
}

export async function getAllHotelsHandler(req: Request, res: Response, next: NextFunction) {
    const hotels = await getAllHotelsService();
    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Hotels retrieved successfully',
        data: hotels
    });
}

// TODO:
// delete hotel handler
export async function deleteHotelHandler(req: Request, res: Response, next: NextFunction) {
    const hotelResponse = await deleteHotelService(Number(req.params.id))

    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Hotel deleted successfully',
        data: hotelResponse
    });
}

// update hotel handler