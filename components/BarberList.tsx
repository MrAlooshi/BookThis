"use client";

import { useEffect, useState } from 'react';

type Barber = {
  id: number;
  name: string;
  specialty: string;
};

export default function BarberList() {
  const [barbers, setBarbers] = useState<Barber[]>([]);

  useEffect(() => {
    const fetchBarbers = async () => {
      const response = await fetch('/api/barbers');
      const data = await response.json();
      setBarbers(data);
    };

    fetchBarbers();
  }, []);

  return (
    <div>
      <h2>Available Barbers</h2>
      <ul>
        {barbers.map((barber) => (
          <li key={barber.id}>
            {barber.name} — Specialty: {barber.specialty}
          </li>
        ))}
      </ul>
    </div>
  );
}
