"use client"

import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { BellIcon, CalendarIcon, CreditCard, FileTextIcon, Check } from "lucide-react"
import { useState } from "react"
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid"
import { Marquee } from "@/components/ui/marquee"
import { PulsatingButton } from "@/components/ui/pulsating-button"
import { cn } from "@/lib/utils"
import { ImageShowcase } from "@/components/ui/image-showcase"

const reviews = [
  {
    name: "Sarah M.",
    username: "@sarah_m",
    body: "BookThis har revolutioneret, hvordan jeg håndterer mine aftaler. Så intuitivt!",
    img: "https://avatar.vercel.sh/sarah",
  },
  {
    name: "Michael R.",
    username: "@mike_r",
    body: "Det bedste bookingsystem, jeg nogensinde har brugt. Rent, simpelt og effektivt.",
    img: "https://avatar.vercel.sh/michael",
  },
  {
    name: "Emma L.",
    username: "@emma_l",
    body: "Perfekt til min virksomhed. De automatiske påmindelser er en game-changer!",
    img: "https://avatar.vercel.sh/emma",
  },
  {
    name: "David K.",
    username: "@david_k",
    body: "Har effektiviseret hele min bookingproces. Meget anbefalelsesværdigt!",
    img: "https://avatar.vercel.sh/david",
  },
  {
    name: "Lisa P.",
    username: "@lisa_p",
    body: "Kundeservicen er blevet markant forbedret siden vi begyndte at bruge BookThis.",
    img: "https://avatar.vercel.sh/lisa",
  },
  {
    name: "James W.",
    username: "@james_w",
    body: "Analyserne hjælper mig med bedre at forstå min virksomhed.",
    img: "https://avatar.vercel.sh/james",
  },
]

const firstRow = reviews.slice(0, reviews.length / 2)
const secondRow = reviews.slice(reviews.length / 2)

const features = [
   {
    Icon: CalendarIcon,
    name: "Smart Planlægning",
    description: "Intelligent bookingsystem, der tilpasser sig dine åbningstider og personalets tilgængelighed.",
    className: "col-span-3 lg:col-span-2",
  },
  {
    Icon: CreditCard,
    name: "Sikre Betalinger",
    description: "Modtag betalinger online med vores sikre betalingssystem.",
    className: "col-span-3 lg:col-span-1",
  },
  {
    Icon: BellIcon,
    name: "Øjeblikkelige Notifikationer",
    description: "Hold alle opdateret med automatiske notifikationer og påmindelser.",
    className: "col-span-3 lg:col-span-1",
  },
  {
    Icon: FileTextIcon,
    name: "Detaljeret Analyse",
    description: "Få indsigt i din virksomhed med omfattende rapporteringsværktøjer.",
    className: "col-span-3 lg:col-span-2",
  },
]

const pricingPlans = [
{
    name: "Basis",
    description: "Start med essentielle værktøjer til at styrke din online tilstedeværelse.",
    monthlyPrice: 99,
    annualPrice: 89,
    link: "https://github.com/ansub/syntaxUI",
    features: [
      "SEO-strategi & Emneanbefalinger",
      "Konkurrentanalyse for at skille dig ud",
      "Indbygget Søgeordsforskning",
      "Målret de nyeste Google trends",
      "SEO-optimerede blogs og sociale medier",
      "Teknisk SEO-analyse og rapporter",
      "Målret 100+ regioner og sprog",
    ],
  },
  {
    name: "Professionel",
    description: "Få adgang til avancerede funktioner og premium indhold til at booste din forretning.",
    monthlyPrice: 130,
    annualPrice: 119,
    link: "https://github.com/ansub/syntaxUI",
    features: [
      "Alt i Basis pakken",
      "Få 25 premium blogs",
      "Indeksér op til 1000 sider",
      "Premium support",
      "Lokal SEO",
      "SEO Agent",
    ],
  },
  {
    name: "Premium",
    description: "Ultimativ tilpasning og dedikeret support til større virksomheder.",
    monthlyPrice: 339,
    annualPrice: 309,
    link: "https://github.com/ansub/syntaxUI",
    features: [
      "Alt i Professionel pakken",
      "Ubegrænset antal premium blogs",
      "Tilføj din egen AI-modelnøgle",
      "Premium support & træningssessioner",
    ],
  },
]

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string
  name: string
  username: string
  body: string
}) => {
  return (
    <figure className="relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4 hover:bg-accent">
      <div className="flex flex-row items-center gap-2">
        <Image className="rounded-full" width={32} height={32} alt="" src={img || "/placeholder.svg"} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium">{name}</figcaption>
          <p className="text-xs text-muted-foreground">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  )
}

const BackgroundShift = ({ shiftKey }: { shiftKey: string }) => (
  <motion.span
    key={shiftKey}
    layoutId="bg-shift"
    className="absolute inset-0 -z-10 rounded-lg bg-primary"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ type: "spring", stiffness: 200, damping: 20 }}
  />
)

export default function Home() {
  const [billingCycle, setBillingCycle] = useState<"M" | "A">("M")

  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="mb-6 text-5xl font-bold tracking-tight">Forenkl Din Planlægning</h1>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">
              BookThis gør det nemt at administrere aftaler, modtage betalinger og udvikle din forretning.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/book">
                <PulsatingButton>Start Booking Nu</PulsatingButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Image Showcase Section */}
      <section>
        <div className="container mx-auto px-4">
          <ImageShowcase />
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Kraftfulde Funktioner</h2>
          <BentoGrid>
            {features.map((feature, idx) => (
              <BentoCard key={idx} {...feature} />
            ))}
          </BentoGrid>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Hvad Vores Brugere Siger</h2>
          <div className="relative">
            <Marquee pauseOnHover className="[--duration:20s]">
              {firstRow.map((review) => (
                <ReviewCard key={review.username} {...review} />
              ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="mt-4 [--duration:20s]">
              {secondRow.map((review) => (
                <ReviewCard key={review.username} {...review} />
              ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background" />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative w-full overflow-hidden py-12 text-black lg:px-2 lg:py-12">
        <div className="relative z-10 my-12 flex flex-col items-center justify-center gap-4">
          <div className="flex w-full flex-col items-start justify-center space-y-4 md:items-center">
            <div className="mb-2 inline-block rounded-full bg-primary/10 px-2 py-[0.20rem] text-xs font-medium uppercase text-primary">
              Priser
            </div>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl dark:text-gray-200">
              Fair pris, uretfærdig fordel.
            </p>
            <p className="text-md max-w-xl text-gray-700 md:text-center dark:text-gray-300">
              Kom i gang med BookThis i dag og løft din virksomhed til næste niveau.
            </p>
          </div>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setBillingCycle("M")}
              className={cn(
                `rounded-lg px-4 py-2 text-sm font-medium `,
                billingCycle === "M"
                  ? "relative bg-primary text-primary-foreground "
                  : "text-gray-700 hover:bg-primary/10 dark:text-gray-300 dark:hover:text-black",
              )}
            >
              Månedlig
              {billingCycle === "M" && <BackgroundShift shiftKey="monthly" />}
            </button>
            <button
              onClick={() => setBillingCycle("A")}
              className={cn(
                `rounded-lg px-4 py-2 text-sm font-medium `,
                billingCycle === "A"
                  ? "relative bg-primary text-primary-foreground "
                  : "text-gray-700 hover:bg-primary/10 dark:text-gray-300 dark:hover:text-black",
              )}
            >
              Årlig
              {billingCycle === "A" && <BackgroundShift shiftKey="annual" />}
            </button>
          </div>
        </div>
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-8 lg:flex-row lg:gap-4">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className="w-full rounded-xl border-[1px] border-gray-300 p-6 text-left dark:border-gray-600"
            >
              <p className="mb-1 mt-0 text-sm font-medium uppercase text-primary">{plan.name}</p>
              <p className="my-0 mb-6 text-sm text-gray-600">{plan.description}</p>
              <div className="mb-8 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={billingCycle === "M" ? "monthly" : "annual"}
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className="my-0 text-3xl font-semibold text-gray-900 dark:text-gray-100"
                  >
                    <span>{billingCycle === "M" ? plan.monthlyPrice : plan.annualPrice} kr.</span>
                    <span className="text-sm font-medium">/{billingCycle === "M" ? "month" : "year"}</span>
                  </motion.p>
                </AnimatePresence>
                <motion.button
                  whileTap={{ scale: 0.985 }}
                  onClick={() => {
                    window.open(plan.link)
                  }}
                  className="mt-8 w-full rounded-lg bg-primary py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  Kom i gang
                </motion.button>
              </div>
              {plan.features.map((feature, idx) => (
                <div key={idx} className="mb-3 flex items-center gap-2">
                  <Check className="text-primary" size={18} />
                  <span className="text-sm text-gray-600">{feature}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold">Klar til at Forenkle Din Planlægning?</h2>
          <p className="mb-8 text-xl">
            Tilslut dig tusindvis af virksomheder, der allerede bruger BookThis til at strømline deres drift.
          </p>
          <Link href="/book">
            <button className="inline-flex items-center justify-center rounded-lg border-2 border-primary-foreground bg-transparent px-8 py-3 font-medium text-primary-foreground transition-all hover:bg-primary-foreground hover:text-primary">
              Start Gratis
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Om BookThis</h3>
              <p className="text-sm text-gray-600">
                BookThis er den førende planlægningsløsning for virksomheder i alle størrelser. Forenkl din bookingproces
                og udvikl din forretning med os.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Hurtige Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/features" className="text-sm text-gray-600 hover:text-primary">
                    Funktioner
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-sm text-gray-600 hover:text-primary">
                    Priser
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm text-gray-600 hover:text-primary">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="text-sm text-gray-600 hover:text-primary">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Kontakt Os</h3>
              <p className="text-sm text-gray-600">Bookinggade 123</p>
              <p className="text-sm text-gray-600">Planlæggerby, 9220</p>
              <p className="text-sm text-gray-600">Telefon: (45) 12 34 56 78</p>
              <p className="text-sm text-gray-600">Email: info@bookthis.dk</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Følg Os</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-primary">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-primary">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-primary">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8 text-center">
            <p className="text-sm text-gray-600">&copy; 2025 BookThis. Alle rettigheder forbeholdes.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}

