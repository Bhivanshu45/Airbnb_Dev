import { createHotelDTO } from "../dto/hotel.dto";
import { createHotel, getAllHotels, getHotelById, softDeleteHotel } from "../repositories/hotel.repository";

export async function createHotelService(hoteldata: createHotelDTO) {
    const hotel = await createHotel(hoteldata);
    return hotel;
}

export async function getHotelByIdService(id: number) {
    const hotel = await getHotelById(id);
    return hotel;
}

export async function getAllHotelsService() {
    const hotels = await getAllHotels();
    return hotels;
}

export async function deleteHotelService(id: number) {
    const hotel = await softDeleteHotel(id);
    return hotel;
}