"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/lib/auth-context"

const timeSlots = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"]

const services = [
  { id: "1", name: "Herreklipning", duration: "30 min", price: "300 kr." },
  { id: "2", name: "Skæg", duration: "15 min", price: "150 kr." },
  { id: "3", name: "Hår og skæg", duration: "45 min", price: "400 kr." },
  { id: "4", name: "Skinfade med skæg", duration: "45 min", price: "450 kr." },
  { id: "5", name: "Børneklipning", duration: "30 min", price: "250 kr." },
]

export default function BookingPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [selectedService, setSelectedService] = useState<string>("")
  const { user } = useAuth()
  const router = useRouter()

  const handleBooking = () => {
    if (!user) {
      router.push("/login")
      return
    }

    console.log("Booking oprettet:", {
      date,
      time: selectedTime,
      service: selectedService,
      userId: user.id,
    })

    router.push("/dashboard")
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Book en Tid</h1>

      <div className="max-w-3xl mx-auto grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Vælg Behandling</CardTitle>
            <CardDescription>Vælg den behandling du ønsker at booke</CardDescription>
          </CardHeader>
          <CardContent>
            <Select onValueChange={setSelectedService} value={selectedService}>
              <SelectTrigger>
                <SelectValue placeholder="Vælg en behandling" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service.id} value={service.id}>
                    {service.name} - {service.price}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vælg Dato</CardTitle>
            <CardDescription>Vælg din foretrukne dato</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Vælg Tid</CardTitle>
            <CardDescription>Vælg dit foretrukne tidspunkt</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  onClick={() => setSelectedTime(time)}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {time}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Booking Oversigt</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="font-medium">Valgt Behandling:</p>
                <p className="text-muted-foreground">
                  {services.find((s) => s.id === selectedService)?.name || "Ikke valgt"}
                </p>
              </div>
              <div>
                <p className="font-medium">Dato & Tid:</p>
                <p className="text-muted-foreground">
                  {date?.toLocaleDateString('da-DK')} {selectedTime || "Ikke valgt"}
                </p>
              </div>
              <Button className="w-full" onClick={handleBooking} disabled={!selectedService || !date || !selectedTime}>
                Bekræft Booking
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

