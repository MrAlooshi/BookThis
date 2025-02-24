import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Define enums to match schema
const Role = {
  CUSTOMER: 'CUSTOMER',
  ADMIN: 'ADMIN'
} as const;

const PaymentStatus = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED'
} as const;

async function main() {
  // Create Users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        role: Role.CUSTOMER
      }
    }),
    prisma.user.create({
      data: {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'admin123',
        role: Role.ADMIN
      }
    })
  ]);

  // Create Services
  const services = await Promise.all([
    prisma.service.create({
      data: {
        name: 'Classic Haircut',
        description: 'Traditional haircut with scissors',
        price: 30.00,
        duration: 30
      }
    }),
    prisma.service.create({
      data: {
        name: 'Beard Trim',
        description: 'Professional beard grooming',
        price: 20.00,
        duration: 20
      }
    })
  ]);

  // Create Barbers
  const barbers = await Promise.all([
    prisma.barber.create({
      data: {
        name: 'Mike Wilson',
        specialty: 'Classic Cuts',
        services: {
          connect: [{ id: services[0].id }, { id: services[1].id }]
        }
      }
    })
  ]);

  // Create Availability
  await Promise.all([
    prisma.availability.create({
      data: {
        barberId: barbers[0].id,
        dayOfWeek: 1, // Monday
        startTime: '09:00',
        endTime: '17:00'
      }
    }),
    prisma.availability.create({
      data: {
        barberId: barbers[0].id,
        dayOfWeek: 2, // Tuesday
        startTime: '09:00',
        endTime: '17:00'
      }
    })
  ]);

  // Create Bookings
  const booking = await prisma.booking.create({
    data: {
      userId: users[0].id,
      barberId: barbers[0].id,
      serviceId: services[0].id,
      date: new Date('2024-03-25T10:00:00Z')
    }
  });

  // Create Payment
  await prisma.payment.create({
    data: {
      bookingId: booking.id,
      amount: services[0].price,
      status: PaymentStatus.COMPLETED,
      method: 'credit_card'
    }
  });

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
