import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const barbers = await prisma.barber.findMany();
    return NextResponse.json(barbers);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 