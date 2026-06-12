import express from 'express';// TODO: Resolve this TS compilation issue
import { createHotelHandler, getAllHotelsHandler, getHotelByIdHandler } from '../../controllers/hotel.controller';
import { hotelSchema } from '../../validators/hotel.validator';
import { validateRequestBody } from '../../validators';

const hotelRouter = express.Router();

hotelRouter.post('/', validateRequestBody(hotelSchema) ,createHotelHandler)
hotelRouter.get('/:id', getHotelByIdHandler)
hotelRouter.get('/', getAllHotelsHandler)

export default hotelRouter;