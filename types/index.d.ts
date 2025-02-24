import { Booking, User, Barber, Service, Payment, Availability } from '@prisma/client';

export type BookingWithDetails = Booking & {
  customer: User;
  barber: Barber;
  service: Service;
  payment?: Payment;
};

export type AvailabilitySlot = {
  id: number;
  barberId: number;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
};

export type TimeSlot = {
  time: string;
  available: boolean;
}

export type Barber = {
  id: number;
  name: string;
  specialty: string;
}

export type Service = {
  id: number;
  name: string;
  description?: string;
  price: number;
  duration: number;
}
