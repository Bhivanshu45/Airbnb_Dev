import Hotel from "../db/models/hotel";
import { createHotelDTO } from "../dto/hotel.dto";
import logger from "../config/logger.config";

export async function createHotel(hotelData: createHotelDTO) {
    const hotel = await Hotel.create({
        name: hotelData.name,
        address: hotelData.address,
        location: hotelData.location,
        rating: hotelData.rating,
        ratingCount: hotelData.ratingCount
    });

    logger.info(`Hotel created successfully.', ${hotel.id}`);
    return hotel;

}

export async function getHotelById(id:number){
    const hotel = await Hotel.findByPk(id);

    if(!hotel){
        logger.error(`Hotel with id ${id} not found.`);
        throw new Error(`Hotel with id ${id} not found.`);
    }

    logger.info(`Hotel with id ${id} retrieved successfully.`);
    return hotel;
}

export async function getAllHotels(){
    const hotels = await Hotel.findAll();
    logger.info(`All hotels retrieved successfully. Total count: ${hotels.length}`);
    return hotels;
}