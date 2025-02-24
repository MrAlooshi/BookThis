import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const barbers = await prisma.barber.findMany();
      res.status(200).json(barbers);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch barbers' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
