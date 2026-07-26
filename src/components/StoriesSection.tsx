import { Card } from "./ui/card";
import { MdOutlineFormatQuote as Quote } from "react-icons/md";

export function StoriesSection() {
  return (
    <section className="px-4 py-16">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl mb-12">You're not alone</h2>
        
        <Card className="p-8 relative">
          <Quote className="h-8 w-8 text-muted-foreground mb-4 mx-auto" />
          <blockquote className="text-xl leading-relaxed mb-6 italic">
            "I thought I was just careless until I was diagnosed. Knowing gave me relief, and strategies."
          </blockquote>
          <div className="h-px bg-border w-16 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Anonymous testimonial</p>
        </Card>
      </div>
    </section>
  );
}