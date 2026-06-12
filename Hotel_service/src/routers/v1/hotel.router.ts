import express from 'express';// TODO: Resolve this TS compilation issue
import { createHotelHandler, getHotelByIdHandler } from '../../controllers/hotel.controller';
import { hotelSchema } from '../../validators/hotel.validator';
import { validateRequestBody } from '../../validators';

const hotelRouter = express.Router();

hotelRouter.post('/', validateRequestBody(hotelSchema) ,createHotelHandler)
hotelRouter.get('/:id', getHotelByIdHandler)

export default hotelRouter;