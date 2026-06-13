import express from 'express';// TODO: Resolve this TS compilation issue
import { createHotelHandler, deleteHotelHandler, getAllHotelsHandler, getHotelByIdHandler } from '../../controllers/hotel.controller';
import { hotelSchema } from '../../validators/hotel.validator';
import { validateRequestBody } from '../../validators';

const hotelRouter = express.Router();

hotelRouter.post('/', validateRequestBody(hotelSchema) ,createHotelHandler)
hotelRouter.get('/:id', getHotelByIdHandler)
hotelRouter.get('/', getAllHotelsHandler)
hotelRouter.delete('/:id',deleteHotelHandler)

export default hotelRouter;