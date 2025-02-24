import prisma from './prisma';
import { BookingWithDetails } from '@/types';

type CreateBookingInput = {
  customerId: number;
  barberId: number;
  serviceId: number;
  date: Date;
};

export const createBooking = async ({
  customerId,
  barberId,
  serviceId,
  date,
}: CreateBookingInput): Promise<BookingWithDetails> => {
  return await prisma.booking.create({
    data: {
      customerId,
      barberId,
      serviceId,
      date: new Date(date),
    },
    include: {
      customer: true,
      barber: true,
      service: true,
    },
  });
};

export const getBookings = async (): Promise<BookingWithDetails[]> => {
  return await prisma.booking.findMany({
    include: {
      customer: true,
      barber: true,
      service: true,
    },
  });
};
