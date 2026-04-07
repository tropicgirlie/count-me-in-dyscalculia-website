import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

export function SelfCheckSection() {
  const steps = [
    { number: "1", title: "Read traits", description: "Review common patterns" },
    { number: "2", title: "Try screener", description: "Quick self-assessment" },
    { number: "3", title: "Get assessed", description: "Professional diagnosis" }
  ];

  return (
    <section className="px-4 py-16 bg-muted/20">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="space-y-6 mb-12">
          <h2 className="text-3xl">Check your patterns</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Do you struggle with time, money, directions, or remembering numbers? 
            Our quick checklist can help you see if you share common traits.
          </p>
        </div>

        <Card className="p-8 mb-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-teal-600 text-white flex items-center justify-center text-lg font-semibold">
                  {step.number}
                </div>
                <div className="text-center">
                  <h4 className="font-medium">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
            Try the checklist
          </Button>
        </Card>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-sm text-amber-800">
            <strong>Disclaimer:</strong> Screeners are not diagnostic. Only a qualified psychologist can confirm dyscalculia.
          </p>
        </div>
      </div>
    </section>
  );
}