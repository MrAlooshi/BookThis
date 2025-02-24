import { BellIcon, CalendarIcon, Share2Icon, Users, Zap } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid"
import { Marquee } from "@/components/ui/marquee"

const bookings = [
  {
    name: "Møde med Kunde",
    body: "Diskuter projektets krav og tidsplan.",
  },
  {
    name: "Team Standup",
    body: "Daglig team synkronisering om fremskridt og udfordringer.",
  },
  {
    name: "Tandlægetid",
    body: "Regelmæssig kontrol og tandrensning.",
  },
  {
    name: "Yoga Time",
    body: "Ugentlig yoga session for afslapning og fleksibilitet.",
  },
  {
    name: "Frisørtid",
    body: "Månedlig frisøraftale.",
  },
]

const services = [
  {
    Icon: CalendarIcon,
    name: "Standard Booking",
    description: "Grundlæggende tidsbestilling for enkeltpersoner eller små grupper.",
    href: "/book",
    cta: "Book Nu",
    className: "col-span-3 lg:col-span-2",
    background: (
      <Calendar
        mode="single"
        selected={new Date()}
        className="absolute right-0 top-10 origin-top scale-75 rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-90"
      />
    ),
  },
  {
    Icon: BellIcon,
    name: "Avanceret Planlægning",
    description: "Udvidede bookingfunktioner med notifikationer og påmindelser.",
    href: "/book",
    cta: "Kom i Gang",
    className: "col-span-3 lg:col-span-1",
    background: (
      <Marquee
        pauseOnHover
        className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)]"
      >
        {bookings.map((booking, idx) => (
          <figure
            key={idx}
            className={cn(
              "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
              "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
              "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
              "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none",
            )}
          >
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-col">
                <figcaption className="text-sm font-medium dark:text-white">{booking.name}</figcaption>
              </div>
            </div>
            <blockquote className="mt-2 text-xs">{booking.body}</blockquote>
          </figure>
        ))}
      </Marquee>
    ),
  },
  {
    Icon: Users,
    name: "Virksomhedsløsning",
    description: "Omfattende bookingsystem til store organisationer og franchises.",
    href: "/book",
    cta: "Kontakt Salg",
    className: "col-span-3 lg:col-span-2",
  },
  {
    Icon: Zap,
    name: "Ekspres Booking",
    description: "Strømlinet bookingproces til virksomheder med høj volumen.",
    href: "/book",
    cta: "Prøv Nu",
    className: "col-span-3 lg:col-span-1",
  },
  {
    Icon: Share2Icon,
    name: "Integrationer",
    description: "Forbind dit bookingsystem med over 100+ apps og tjenester.",
    href: "/integrations",
    cta: "Udforsk Integrationer",
    className: "col-span-3 lg:col-span-3",
  },
]

export default function Services() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4 text-center">Vores Ydelser</h1>
      <p className="text-xl text-muted-foreground mb-8 text-center max-w-2xl mx-auto">
        Vælg den perfekte bookingløsning til din virksomhed. Fra simple aftaler til kompleks planlægning, har vi 
        løsningen til dig.
      </p>
      <BentoGrid>
        {services.map((service, idx) => (
          <BentoCard key={idx} {...service} />
        ))}
      </BentoGrid>
    </main>
  )
}

