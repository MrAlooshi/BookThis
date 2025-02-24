import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { bookingId, amount, method } = await req.json();

    // Create Payment Record
    const payment = await prisma.payment.create({
      data: {
        bookingId,
        amount,
        method,
        status: 'COMPLETED',
      },
    });

    // Update Booking Status
    await prisma.booking.update({
      where: { id: bookingId },
      data: { status: 'CONFIRMED' },
    });

    return NextResponse.json(payment, { status: 201 });
  } catch (error) {
    console.error('Payment Error:', error);
    return NextResponse.json({ error: 'Payment failed' }, { status: 500 });
  }
}
