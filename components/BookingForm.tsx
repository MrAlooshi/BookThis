"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { bookings, barbers, services } from '@/lib/api'
import { useAuth } from '@/lib/auth-context'
import type { Barber, Service, TimeSlot } from '@/types'

export default function BookingForm() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedBarber, setSelectedBarber] = useState<string>("")
  const [selectedService, setSelectedService] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string>("")
  
  const [availableBarbers, setAvailableBarbers] = useState<Barber[]>([])
  const [availableServices, setAvailableServices] = useState<Service[]>([])
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([])
  
  const [isLoading, setIsLoading] = useState(false)

  // Fetch barbers and services on mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [barbersData, servicesData] = await Promise.all([
          barbers.getAll(),
          services.getAll()
        ])
        setAvailableBarbers(barbersData)
        setAvailableServices(servicesData)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load booking options",
          variant: "destructive"
        })
      }
    }
    fetchInitialData()
  }, [toast])

  // Fetch available time slots when date and barber are selected
  useEffect(() => {
    if (selectedDate && selectedBarber) {
      const fetchTimeSlots = async () => {
        try {
          const slots = await barbers.getAvailability(
            selectedBarber,
            format(selectedDate, 'yyyy-MM-dd')
          )
          setAvailableTimeSlots(slots)
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to load available times",
            variant: "destructive"
          })
        }
      }
      fetchTimeSlots()
    }
  }, [selectedDate, selectedBarber, toast])

  const handleSubmit = async () => {
    if (!user) {
      router.push('/login')
      return
    }

    if (!selectedDate || !selectedBarber || !selectedService || !selectedTime) {
      toast({
        title: "Error",
        description: "Please fill in all booking details",
        variant: "destructive"
      })
      return
    }

    setIsLoading(true)
    try {
      const booking = await bookings.create({
        barberId: parseInt(selectedBarber),
        serviceId: parseInt(selectedService),
        date: `${format(selectedDate, 'yyyy-MM-dd')}T${selectedTime}`,
      })

      toast({
        title: "Success",
        description: "Booking confirmed! Check your email for details.",
      })
      
      // Clear form
      setSelectedDate(undefined)
      setSelectedBarber("")
      setSelectedService("")
      setSelectedTime("")
      
      // Redirect to dashboard after short delay
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create booking. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Select Date</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={(date) => date < new Date() || date > new Date().setMonth(new Date().getMonth() + 2)}
            className="rounded-md border"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Select Barber</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedBarber} onValueChange={setSelectedBarber}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a barber" />
            </SelectTrigger>
            <SelectContent>
              {availableBarbers.map((barber) => (
                <SelectItem key={barber.id} value={barber.id.toString()}>
                  {barber.name} - {barber.specialty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Select Service</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedService} onValueChange={setSelectedService}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a service" />
            </SelectTrigger>
            <SelectContent>
              {availableServices.map((service) => (
                <SelectItem key={service.id} value={service.id.toString()}>
                  {service.name} - {service.duration}min - ${service.price}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Select Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-2">
            {availableTimeSlots.map((slot) => (
              <Button
                key={slot.time}
                variant={selectedTime === slot.time ? "default" : "outline"}
                onClick={() => setSelectedTime(slot.time)}
              >
                {slot.time}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Button 
        className="w-full" 
        onClick={handleSubmit} 
        disabled={isLoading || !selectedDate || !selectedBarber || !selectedService || !selectedTime}
      >
        {isLoading ? "Confirming..." : "Book Appointment"}
      </Button>
    </div>
  )
} 