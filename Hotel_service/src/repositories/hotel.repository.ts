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
    const hotels = await Hotel.findAll({
        where: {
            deletedAt: null
        }
    }
    );
    logger.info(`All hotels retrieved successfully. Total count: ${hotels.length}`);
    return hotels;
}

export async function softDeleteHotel(id: number) {
    const hotel = await Hotel.findByPk(id);

    if (!hotel) {
        logger.error(`Hotel with id ${id} not found for deletion.`);
        throw new Error(`Hotel with id ${id} not found.`);
    }

    hotel.deletedAt = new Date();
    await hotel.save();

    logger.info(`Hotel with id ${id} soft deleted successfully.`);
    return true;
}