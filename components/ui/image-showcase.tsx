"use client"

import { motion } from "framer-motion"
import { BarChart, Calendar, Users } from "lucide-react"
import { useState } from "react"

const ImageTabs = [
  {
    name: "Smart Analyse",
    description: "Få detaljeret indblik i din virksomheds præstation med omfattende analyser.",
    icon: <BarChart />,
  },
  {
    name: "Nem Planlægning",
    description: "Intuitiv kalendergrænsflade til håndtering af aftaler og medarbejdertilgængelighed.",
    icon: <Calendar />,
  },
  {
    name: "Kundehåndtering",
    description: "Hold styr på dine kunder og deres bookinghistorik.",
    icon: <Users />,
  },
]

const Images = [
  {
    imageNumber: 1,
    imageSource: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/statss-US2mU2Y98HvXjreZ9eYZeN9QfPCRRw.png",
  },
  {
    imageNumber: 2,
    imageSource:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/amelia-calendar-overview.jpg-kdgPKb3bPabMZr9BY2pY31wDAFZ5KF.jpeg",
  },
  {
    imageNumber: 3,
    imageSource:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/client-management-1-8xBCnTtbUKqA9eDmSDsgmaGjVRdXuQ.png",
  },
]

export function ImageShowcase() {
  const [activeImage, setActiveImage] = useState(1)

  return (
    <div className="w-full py-12">
      <div className="mx-auto max-w-2xl space-y-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Se BookThis i Aktion</h2>
        <p className="text-md text-muted-foreground">
          Oplev hvordan BookThis kan strømline din forretningsdrift med vores kraftfulde funktioner og intuitive
          grænseflade.
        </p>
      </div>
      <div className="mt-8 flex w-full items-center justify-center text-center">
        <div className="mb-6 flex w-full max-w-4xl flex-col gap-2 md:flex-row">
          {ImageTabs.map((tab, index) => (
            <button
              key={index}
              className="group relative flex w-full flex-col items-start p-3 text-left"
              onClick={() => setActiveImage(index + 1)}
            >
              <div
                className={`mb-2 ${
                  activeImage === index + 1 ? `bg-primary text-primary-foreground` : `bg-primary/10 text-primary`
                } z-10 rounded-lg p-1 group-hover:bg-primary group-hover:text-primary-foreground`}
              >
                {tab.icon}
              </div>
              <div className="z-10 mb-1 text-xs font-semibold">{tab.name}</div>
              <p className="z-10 m-0 text-xs text-muted-foreground">{tab.description}</p>
              {activeImage === index + 1 && (
                <motion.span
                  layoutId="tab"
                  transition={{ type: "spring", duration: 0.3 }}
                  className="absolute inset-0 z-0 rounded-md bg-primary/10"
                />
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="mx-auto max-w-4xl overflow-hidden rounded-lg border">
        {Images.map((image, index) => (
          <div key={index} data-image-number={image.imageNumber}>
            {activeImage === image.imageNumber && (
              <motion.img
                src={image.imageSource}
                alt={`BookThis feature ${image.imageNumber}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full h-[400px] object-contain mx-auto rounded-lg"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

