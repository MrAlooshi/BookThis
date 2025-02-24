import { NextRequest, NextResponse } from 'next/server';
import { createBooking, getBookings } from '@/lib/booking';

export async function GET() {
  try {
    const bookings = await getBookings();
    return NextResponse.json(bookings, { status: 200 });
  } catch (error: any) {
    console.error('❌ Get Bookings Error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch bookings',
      details: error.message 
    }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    if (!body) {
      return NextResponse.json({ error: 'Empty request body' }, { status: 400 });
    }

    const { customerId, barberId, serviceId, date } = JSON.parse(body);
    
    if (!customerId || !barberId || !serviceId || !date) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const booking = await createBooking({ 
      customerId: Number(customerId),
      barberId: Number(barberId), 
      serviceId: Number(serviceId),
      date: new Date(date)
    });
    
    return NextResponse.json(booking, { status: 201 });
  } catch (error: any) {
    console.error('❌ Create Booking Error:', error);
    return NextResponse.json({ 
      error: 'Failed to create booking',
      details: error.message 
    }, { status: 500 });
  }
}
