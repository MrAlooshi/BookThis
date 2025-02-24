import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { AvailabilitySlot } from '@/types';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const barberId = searchParams.get('barberId');

  if (!barberId) {
    return NextResponse.json({ error: 'Barber ID is required' }, { status: 400 });
  }

  try {
    const availability: AvailabilitySlot[] = await prisma.availability.findMany({
      where: { barberId: Number(barberId) },
    });

    return NextResponse.json(availability, { status: 200 });
  } catch (error) {
    console.error('Availability Error:', error);
    return NextResponse.json({ error: 'Failed to fetch availability' }, { status: 500 });
  }
}
