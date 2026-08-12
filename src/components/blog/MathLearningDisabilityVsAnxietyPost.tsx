import { useRef } from "react";
import { ListenButton } from "../ListenButton";
import { usePageMeta, useJsonLd } from "../../lib/usePageMeta";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Link } from "react-router";
import { 
  MdArrowBack as ArrowLeft, 
  MdOutlineSchedule as Clock, 
  MdOutlineWarningAmber as AlertTriangle, 
  MdOutlineCheckCircle as CheckCircle, 
  MdOutlinePsychology as Brain,
  MdOutlineMonitorHeart as HeartPulse,
  MdOutlineSchool as GraduationCap,
  MdArrowForward as ArrowRight
} from "react-icons/md";

export function MathLearningDisabilityVsAnxietyPost() {
  const articleRef = useRef<HTMLElement>(null);
  usePageMeta({
    title: "Math Learning Disability vs Math Anxiety: Understanding the Difference | Count Me In",
    description: "Is it dyscalculia or math anxiety? Learn the key differences between a math learning disability and anxiety about numbers, and why getting the right diagnosis matters.",
    ogType: "article",
    canonical: "https://countmein.site/blog/math-learning-disability-vs-anxiety",
  });

  // Article structured data for SEO
  useJsonLd({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Math Learning Disability vs Math Anxiety: Understanding the Critical Difference",
    "description": "Is it dyscalculia or math anxiety? Learn the key differences between a math learning disability and anxiety about numbers.",
    "author": {
      "@type": "Organization",
      "name": "Count Me In"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Count Me In",
      "logo": {
        "@type": "ImageObject",
        "url": "https://countmein.site/logo.png"
      }
    },
    "datePublished": "2025-04-15",
    "dateModified": "2025-04-15",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://countmein.site/blog/math-learning-disability-vs-anxiety"
    },
    "articleSection": "Understanding",
    "keywords": ["dyscalculia", "math anxiety", "math learning disability", "number dyslexia", "diagnosis"]
  });

  return (
    <div className="pt-24 pb-20">
      <div className="container-custom max-w-3xl">
        {/* Back to Blog */}
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to all articles
        </Link>

        {/* Readable region: everything the Listen button reads aloud */}
        <article ref={articleRef}>
        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge variant="outline" className="text-primary border-primary/30">
              Understanding
            </Badge>
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              8 min read
            </span>
            <ListenButton contentRef={articleRef} label="Listen to article" ariaLabel="Listen to this article aloud" />
          </div>
          
          <h1 className="text-3xl lg:text-4xl leading-tight mb-4">
            Math Learning Disability vs Math Anxiety: 
            <span className="text-gradient">Understanding the Critical Difference</span>
          </h1>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            They can look similar on the surface—both involve struggling with math and feeling 
            stressed about numbers. But the underlying causes, and therefore the solutions, are 
            fundamentally different.
          </p>
        </div>

        {/* Key Takeaway Box */}
        <Card className="bg-amber-50 border-amber-200 mb-10">
          <CardContent className="p-6">
            <div className="flex gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-amber-800 font-semibold mb-2">The Bottom Line</p>
                <p className="text-sm text-amber-700 leading-relaxed">
                  <strong>Dyscalculia (math learning disability)</strong> is a neurological difference 
                  in how the brain processes numbers. <strong>Math anxiety</strong> is an emotional 
                  response that can develop for many reasons. You can have one, both, or neither—but 
                  treating math anxiety won't cure dyscalculia, and vice versa.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-semibold mt-10 mb-4">What Is a Math Learning Disability?</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            A math learning disability—clinically known as <strong>dyscalculia</strong>—is a 
            specific learning difference that affects how the brain processes numerical information. 
            It's not about intelligence, effort, or education quality. It's a fundamental difference 
            in brain wiring that has been present since birth.
          </p>
          
          <p className="text-muted-foreground leading-relaxed mb-4">
            People with dyscalculia often struggle with:
          </p>
          
          <ul className="space-y-2 mb-6">
            {[
              "Understanding quantity and number sense (knowing that 7 is more than 5 without counting)",
              "Recognizing patterns in numbers",
              "Remembering math facts (times tables, addition facts)",
              "Reading clocks and understanding time",
              "Estimating distances or measurements",
              "Following sequential instructions with numbers",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                {item}
              </li>
            ))}
          </ul>

          <Card className="my-8">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <Brain className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">The Neurological Reality</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Brain imaging studies consistently show that people with dyscalculia process 
                numerical information differently. The intraparietal sulcus—a region critical 
                for number processing—shows different activation patterns. This isn't a deficit 
                that can be overcome through willpower or practice; it's a permanent neurological 
                difference that requires accommodations and alternative strategies.
              </p>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-semibold mt-10 mb-4">What Is Math Anxiety?</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>Math anxiety</strong> is an emotional response characterized by feelings of 
            tension, apprehension, or fear that interfere with math performance. Unlike dyscalculia, 
            math anxiety is not a learning disability—it's an anxiety disorder specific to mathematical 
            situations.
          </p>
          
          <p className="text-muted-foreground leading-relaxed mb-4">
            Common signs of math anxiety include:
          </p>
          
          <ul className="space-y-2 mb-6">
            {[
              "Rapid heartbeat or sweating when faced with math problems",
              "Avoiding situations that require math",
              "Feeling that you'll never be 'good at math'",
              "Panic during timed math tests",
              "Mental blanking—even on math you know",
              "Negative self-talk about mathematical abilities",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-muted-foreground">
                <HeartPulse className="h-4 w-4 text-accent flex-shrink-0 mt-1" />
                {item}
              </li>
            ))}
          </ul>

          <p className="text-muted-foreground leading-relaxed mb-4">
            Crucially, people with math anxiety <strong>can</strong> understand mathematical 
            concepts—they're just prevented from demonstrating that understanding by their 
            emotional response. Remove the anxiety, and their math ability often shines through.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">The Chicken-and-Egg Problem</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Here's where it gets complicated: dyscalculia and math anxiety often co-occur. 
            Someone with undiagnosed dyscalculia may develop math anxiety after years of 
            struggling in math class. Conversely, severe math anxiety can lead to gaps in 
            mathematical knowledge that look like a learning disability.
          </p>

          <Card className="my-8 bg-primary/[0.04] border-primary/20">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">How to Tell the Difference</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-primary mb-2">Dyscalculia indicators:</p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Struggled with math from very early childhood</li>
                    <li>• Difficulty with basic number sense (subitizing)</li>
                    <li>• Trouble reading analog clocks, even as an adult</li>
                    <li>• Can't estimate quantities at a glance</li>
                    <li>• Mixes up left and right frequently</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-accent mb-2">Math anxiety indicators:</p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Math problems started after a specific incident</li>
                    <li>• Performs better in untimed, low-pressure settings</li>
                    <li>• Understands concepts but 'freezes' on tests</li>
                    <li>• Anxiety is situational (only in math contexts)</li>
                    <li>• Can do math fine when relaxed</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <h2 className="text-2xl font-semibold mt-10 mb-4">Why the Distinction Matters</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Getting the right diagnosis matters because the interventions are completely different:
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <GraduationCap className="h-4 w-4 text-primary" />
                  <p className="font-medium">For Dyscalculia</p>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Accommodations (calculators, extra time)</li>
                  <li>• Multisensory math instruction</li>
                  <li>• Visual and concrete representations</li>
                  <li>• Assistive technology</li>
                  <li>• Workplace/educational rights protection</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <HeartPulse className="h-4 w-4 text-accent" />
                  <p className="font-medium">For Math Anxiety</p>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Cognitive behavioral therapy (CBT)</li>
                  <li>• Relaxation and breathing techniques</li>
                  <li>• Gradual exposure to math situations</li>
                  <li>• Reframing negative self-talk</li>
                  <li>• Untimed, low-stakes practice</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-2xl font-semibold mt-10 mb-4">Can You Have Both?</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Absolutely. Research suggests that up to <strong>60% of people with dyscalculia 
            also experience math anxiety</strong>. The years of struggle and negative feedback 
            that often accompany undiagnosed dyscalculia create perfect conditions for anxiety 
            to develop.
          </p>
          
          <p className="text-muted-foreground leading-relaxed mb-4">
            If you suspect you have both, addressing the anxiety first can make it easier to 
            identify and work with the underlying dyscalculia. Therapy, mindfulness, and 
            anxiety management techniques can lower the emotional temperature enough that the 
            neurological differences become clearer—and more manageable.
          </p>

          <h2 className="text-2xl font-semibold mt-10 mb-4">Getting Help</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            If you suspect you have dyscalculia, start with a formal assessment by an 
            educational psychologist. This will give you a clear diagnosis and documentation 
            that can be used to request accommodations at work or in education.
          </p>
          
          <p className="text-muted-foreground leading-relaxed mb-4">
            For math anxiety, a therapist who specializes in anxiety disorders or a learning 
            specialist with experience in math anxiety can be invaluable. Some specialize 
            specifically in math anxiety and understand the unique intersection of emotional 
            and cognitive factors.
          </p>
        </div>

        </article>
        {/* CTA */}
        <div className="mt-12 pt-8 border-t border-border/30">
          <Card className="bg-gradient-to-br from-primary/[0.06] to-accent/[0.04]">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-semibold mb-3">Wondering Where You Fit?</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Our self-check can help you reflect on whether your experiences align more 
                with dyscalculia, math anxiety, or both. It's not a diagnosis—but it's a 
                useful starting point for conversations with professionals.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/self-check">
                  <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full">
                    Take the Self-Check
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/get-assessed">
                  <Button variant="outline" className="px-6 py-3 rounded-full">
                    Find Assessment Providers
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
