import Image from "next/image"
import { Bell, BarChart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Features() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-12">BookThis Funktioner</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Online Payment Card */}
        <Card className="group hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-4">
              <div className="w-12 h-12 relative">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/online_payment-E5jNLGt3Yvi48dCmOuQDKjmeiPYGSF.png"
                  alt="Online Betaling"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <span>Online Betaling</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Sikker og bekvem betalingsbehandling med flere muligheder, herunder kreditkort, digitale tegnebøger
              og kontaktløse betalinger. Vores system sikrer, at dine transaktioner er beskyttet med branchestandardkryptering.
            </p>
          </CardContent>
        </Card>

        {/* Cash Register System Card */}
        <Card className="group hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-4">
              <div className="w-12 h-12 relative">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cashing_system-AFbDeoPYw7OpRM7MsIGmpCW7l2dVzB.png"
                  alt="Kassesystem"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <span>Kassestyring</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Omfattende kontanthåndteringssystem med detaljeret kvitteringssporing, daglige rapporter og afstemningsværktøjer.
              Perfekt til virksomheder, der skal håndtere både kontanter og digitale betalinger effektivt.
            </p>
          </CardContent>
        </Card>

        {/* Notifications Card */}
        <Card className="group hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-lg">
                <Bell className="h-6 w-6 text-primary" />
              </div>
              <span>Smarte Notifikationer</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Hold dig informeret med realtidsbooking-notifikationer, aftalepåmindelser og vigtige opdateringer.
              Tilpas dine notifikationsindstillinger for e-mail, SMS eller push-notifikationer.
            </p>
          </CardContent>
        </Card>

        {/* Analytics Card */}
        <Card className="group hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-lg">
                <BarChart className="h-6 w-6 text-primary" />
              </div>
              <span>Avanceret Analyse</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Få værdifuld indsigt med detaljerede analyse- og rapporteringsværktøjer. Spor bookingmønstre,
              omsætningstrends, kundepreferencer og mere for at træffe datadrevne beslutninger for din virksomhedsvækst.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

