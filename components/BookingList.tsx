"use client";

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { bookings } from '@/lib/api';
import type { BookingWithDetails } from '@/types';

export default function BookingList() {
  const [bookingList, setBookingList] = useState<BookingWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancelling, setCancelling] = useState<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await bookings.getAll();
        setBookingList(data);
      } catch (err) {
        setError('Failed to fetch bookings');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleCancel = async (bookingId: number) => {
    try {
      setCancelling(bookingId);
      await bookings.cancel(bookingId);
      
      // Remove the cancelled booking from the list
      setBookingList(prev => prev.filter(booking => booking.id !== bookingId));
      
      toast({
        title: "Success",
        description: "Booking cancelled successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cancel booking",
        variant: "destructive"
      });
    } finally {
      setCancelling(null);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Your Bookings</h2>
      {bookingList.map((booking) => (
        <div 
          key={booking.id} 
          className="flex items-center justify-between p-4 rounded-lg border"
        >
          <div>
            <p className="font-medium">{booking.service.name}</p>
            <p className="text-sm text-muted-foreground">
              {new Date(booking.date).toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">
              with {booking.barber.name}
            </p>
          </div>
          <Button 
            variant="destructive"
            onClick={() => handleCancel(booking.id)}
            disabled={cancelling === booking.id}
          >
            {cancelling === booking.id ? "Cancelling..." : "Cancel"}
          </Button>
        </div>
      ))}
      {bookingList.length === 0 && (
        <p className="text-center text-muted-foreground">
          No bookings found
        </p>
      )}
    </div>
  );
}
