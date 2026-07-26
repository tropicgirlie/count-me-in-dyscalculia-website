import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { MdOutlineOpenInNew as ExternalLink } from "react-icons/md";

export function GetAssessedSection() {
  const providers = [
    {
      region: "Ireland",
      organization: "Dyslexia Association of Ireland",
      service: "Adult dyscalculia",
      price: "€600"
    },
    {
      region: "UK", 
      organization: "British Dyslexia Association",
      service: "Dyscalculia assessment",
      price: "£690"
    }
  ];

  return (
    <section className="px-4 py-16">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl">Professional diagnosis matters</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Assessment gives you access to accommodations at work, college, and in daily life.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {providers.map((provider, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{provider.region}</Badge>
                  <span className="text-2xl font-semibold text-teal-600">{provider.price}</span>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-1">{provider.organization}</h4>
                  <p className="text-muted-foreground">{provider.service}</p>
                </div>
                
                <Button variant="outline" className="w-full group">
                  Contact provider
                  <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Pricing Disclaimer */}
        <div className="mb-8 p-4 bg-muted/50 rounded-lg border border-muted">
          <p className="text-sm text-muted-foreground text-center">
            <strong>Pricing Disclaimer:</strong> Prices were taken from provider websites and may not be current. 
            Always check with providers directly for up-to-date pricing, availability, and assessment details.
          </p>
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
            Find providers near you
          </Button>
        </div>
      </div>
    </section>
  );
}