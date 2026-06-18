import {
  confirmBooking,
  createBooking,
  createIdempotencyKey,
  finalizeIdempotencyKey,
  getIdempotencyKeyWithLock,
} from "../repositories/booking.repository";
import { CreateBookingDTO } from "../dto/booking.dto";
import { generateIdempotencyKey } from "../utils/generateIdempotencyKey";

import { prisma } from "../config/prisma";

export async function createBookingService(createBookingDTO: CreateBookingDTO) {
  const booking = await createBooking({
    userId: createBookingDTO.userId,
    hotelId: createBookingDTO.hotelId,
    totalGuests: createBookingDTO.totalGuests,
    bookingAmount: createBookingDTO.bookingAmount,
  });

  const idempotencyKey = generateIdempotencyKey();
  await createIdempotencyKey(idempotencyKey, booking.id);

  return {
    bookingId: booking.id,
    idempotencyKey,
  };
}

export async function finalizeBookingService(idempotencyKey: string) {
  await prisma.$transaction(async (tx) => {
    const idempotencyKeyData = await getIdempotencyKeyWithLock(tx,idempotencyKey);
    if (!idempotencyKeyData) {
      throw new Error("Invalid idempotency key");
    }

    if (idempotencyKeyData.finalized) {
      throw new Error("Booking already finalized");
    }

    const booking = await confirmBooking(tx,idempotencyKeyData.bookingId);
    await finalizeIdempotencyKey(tx,idempotencyKey);

    return booking;
  });
}
