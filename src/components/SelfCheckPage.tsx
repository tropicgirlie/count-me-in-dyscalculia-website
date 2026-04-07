import { useState } from "react";
import { Link } from "react-router";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  CheckCircle,
  Circle,
  ArrowRight,
  ArrowLeft,
  AlertTriangle,
  RotateCcw,
  Info,
  Download,
  Mail,
  Copy,
  Check,
  Share2,
  ClipboardList,
} from "lucide-react";
import { usePageMeta } from "../lib/usePageMeta";

interface Question {
  id: number;
  text: string;
  category: string;
}

const questions: Question[] = [
  {
    id: 1,
    text: "I frequently struggle to estimate how long tasks will take",
    category: "Time",
  },
  {
    id: 2,
    text: "I find it hard to read analogue clocks quickly",
    category: "Time",
  },
  {
    id: 3,
    text: "I often lose track of time and arrive late or too early",
    category: "Time",
  },
  {
    id: 4,
    text: "Splitting a bill at a restaurant causes me significant anxiety",
    category: "Numbers",
  },
  {
    id: 5,
    text: "I transpose or mix up numbers when writing them down (e.g. 36 instead of 63)",
    category: "Numbers",
  },
  {
    id: 6,
    text: "I struggle to remember PINs, phone numbers, or sequences of numbers",
    category: "Numbers",
  },
  {
    id: 7,
    text: "I have difficulty understanding percentages, fractions, or ratios",
    category: "Numbers",
  },
  {
    id: 8,
    text: "I find it hard to follow directions involving distances or measurements",
    category: "Spatial",
  },
  {
    id: 9,
    text: "I often confuse left and right",
    category: "Spatial",
  },
  {
    id: 10,
    text: "I struggle with reading maps or estimating distances",
    category: "Spatial",
  },
  {
    id: 11,
    text: "I feel intense anxiety or panic when asked to do mental arithmetic",
    category: "Emotional",
  },
  {
    id: 12,
    text: "I avoid situations where I might need to count or calculate in front of others",
    category: "Emotional",
  },
  {
    id: 13,
    text: "I have developed elaborate workarounds to avoid dealing with numbers",
    category: "Daily Life",
  },
  {
    id: 14,
    text: "I find budgeting and managing finances overwhelming",
    category: "Daily Life",
  },
  {
    id: 15,
    text: "I struggle to follow recipes that require measurement conversions",
    category: "Daily Life",
  },
];

const responseOptions = [
  { value: 0, label: "Never", color: "bg-muted text-muted-foreground" },
  { value: 1, label: "Rarely", color: "bg-blue-50 text-blue-700 border-blue-200" },
  { value: 2, label: "Sometimes", color: "bg-amber-50 text-amber-700 border-amber-200" },
  { value: 3, label: "Often", color: "bg-orange-50 text-orange-700 border-orange-200" },
  { value: 4, label: "Always", color: "bg-red-50 text-red-700 border-red-200" },
];

export function SelfCheckPage() {
  usePageMeta({
    title: "Dyscalculia Self-Check Quiz for Adults | Count Me In",
    description: "Take this free 15-question dyscalculia self-check to reflect on common traits. Not diagnostic. Helps you decide if a professional assessment is worth exploring.",
  });

  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [copied, setCopied] = useState(false);

  const categories = [...new Set(questions.map((q) => q.category))];
  const sectionQuestions = questions.filter(
    (q) => q.category === categories[currentSection]
  );

  const totalAnswered = Object.keys(answers).length;
  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
  const maxScore = questions.length * 4;
  const percentage = Math.round((totalScore / maxScore) * 100);

  const handleAnswer = (questionId: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentSection < categories.length - 1) {
      setCurrentSection((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    if (currentSection > 0) {
      setCurrentSection((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleShowResults = () => {
    setShowResults(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setCurrentSection(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getResultLevel = () => {
    if (percentage <= 25)
      return {
        level: "Low identification",
        color: "text-green-700",
        bg: "bg-green-50 border-green-200",
        description:
          "Your responses suggest a low level of identification with common dyscalculia traits. If you still have concerns, speaking with a professional is always worthwhile.",
      };
    if (percentage <= 50)
      return {
        level: "Moderate identification",
        color: "text-amber-700",
        bg: "bg-amber-50 border-amber-200",
        description:
          "Your responses suggest moderate identification with dyscalculia traits. Many people share some of these experiences. If they're affecting your daily life, a professional assessment could provide clarity and access to support.",
      };
    if (percentage <= 75)
      return {
        level: "High identification",
        color: "text-orange-700",
        bg: "bg-orange-50 border-orange-200",
        description:
          "Your responses suggest significant identification with common dyscalculia traits. This doesn't mean you have dyscalculia. Only a qualified professional can determine that, but it may be worth exploring further.",
      };
    return {
      level: "Very high identification",
      color: "text-red-700",
      bg: "bg-red-50 border-red-200",
      description:
        "Your responses suggest very high identification with dyscalculia traits. We'd encourage you to explore a professional assessment. Remember: a diagnosis isn't a label, it's a key that unlocks support and understanding.",
    };
  };

  const getCategoryScore = (category: string) => {
    const catQuestions = questions.filter((q) => q.category === category);
    const catScore = catQuestions.reduce(
      (sum, q) => sum + (answers[q.id] || 0),
      0
    );
    const catMax = catQuestions.length * 4;
    return Math.round((catScore / catMax) * 100);
  };

  const handleDownloadResults = () => {
    const result = getResultLevel();
    const date = new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const categoryRows = categories
      .map((cat) => {
        const score = getCategoryScore(cat);
        return `
          <tr>
            <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">${cat}</td>
            <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:center;">
              <div style="background:#e5e7eb;border-radius:9999px;height:10px;width:100%;overflow:hidden;">
                <div style="background:#009688;height:100%;width:${score}%;border-radius:9999px;"></div>
              </div>
            </td>
            <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:right;font-weight:600;">${score}%</td>
          </tr>`;
      })
      .join("");

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Dyscalculia Self-Check Results – Count Me In</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    body { font-family: Inter, sans-serif; color: #1a1a1a; background: #fff; margin: 0; padding: 0; }
    .page { max-width: 680px; margin: 0 auto; padding: 48px 32px; }
    .header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 40px; border-bottom: 2px solid #009688; padding-bottom: 20px; }
    .logo { font-size: 22px; font-weight: 700; color: #009688; }
    .date { font-size: 13px; color: #6b7280; }
    h1 { font-size: 26px; font-weight: 700; margin: 0 0 8px; }
    .subtitle { color: #6b7280; font-size: 14px; margin-bottom: 32px; }
    .result-box { border-radius: 12px; padding: 24px; margin-bottom: 28px; }
    .result-label { font-size: 20px; font-weight: 700; margin-bottom: 8px; }
    .result-desc { font-size: 14px; line-height: 1.7; }
    .score-summary { font-size: 15px; color: #374151; margin-bottom: 8px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 28px; }
    th { text-align: left; padding: 8px 12px; background: #f3f4f6; font-size: 13px; color: #374151; }
    .disclaimer { background: #fffbeb; border: 1px solid #fcd34d; border-radius: 10px; padding: 16px 20px; font-size: 13px; line-height: 1.6; color: #92400e; margin-bottom: 28px; }
    .footer { font-size: 12px; color: #9ca3af; text-align: center; border-top: 1px solid #e5e7eb; padding-top: 20px; }
    @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
  </style>
</head>
<body>
  <div class="page">
    <div class="header">
      <div class="logo">Count Me In</div>
      <div class="date">Completed ${date}</div>
    </div>
    <h1>Dyscalculia Self-Check Results</h1>
    <p class="subtitle">Reflective self-check. Not a diagnostic tool. For personal use and to share with your assessor.</p>

    <div class="result-box" style="background:${percentage > 75 ? "#fef2f2" : percentage > 50 ? "#fff7ed" : percentage > 25 ? "#fffbeb" : "#f0fdf4"};border:1.5px solid ${percentage > 75 ? "#fca5a5" : percentage > 50 ? "#fdba74" : percentage > 25 ? "#fcd34d" : "#86efac"};">
      <div class="result-label" style="color:${percentage > 75 ? "#b91c1c" : percentage > 50 ? "#c2410c" : percentage > 25 ? "#92400e" : "#15803d"};">${result.level}</div>
      <p class="result-desc">${result.description}</p>
    </div>

    <p class="score-summary">Overall score: <strong>${totalScore} / ${maxScore} (${percentage}%)</strong> across ${totalAnswered} questions in 5 areas.</p>

    <table>
      <thead><tr><th>Area</th><th>Score (visual)</th><th style="text-align:right;">%</th></tr></thead>
      <tbody>${categoryRows}</tbody>
    </table>

    <div class="disclaimer">
      <strong>Important:</strong> This self-check is not a diagnostic tool. Only a qualified psychologist or educational professional can diagnose dyscalculia. These results are intended to help you reflect on your experiences and decide whether a formal assessment may be worthwhile.
    </div>

    <div class="footer">
      countmein.site &nbsp;·&nbsp; info@momops.org &nbsp;·&nbsp; Generated by the Count Me In Self-Check Tool
    </div>
  </div>
  <script>window.onload = function(){ window.print(); }</script>
</body>
</html>`;

    const win = window.open("", "_blank");
    if (win) {
      win.document.write(html);
      win.document.close();
    }
  };

  const generateResultsText = () => {
    const result = getResultLevel();
    const date = new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const lines = [
      `DYSCALCULIA SELF-CHECK RESULTS, Count Me In`,
      `Completed: ${date}`,
      `countmein.site`,
      ``,
      `OVERALL RESULT: ${result.level}`,
      `Score: ${totalScore} / ${maxScore} (${percentage}%)`,
      ``,
      result.description,
      ``,
      `BREAKDOWN BY AREA:`,
      ...categories.map((cat) => `  ${cat}: ${getCategoryScore(cat)}%`),
      ``,
      `DISCLAIMER: This self-check is not a diagnostic tool. Only a qualified`,
      `psychologist or educational professional can diagnose dyscalculia.`,
      `These results are for personal reflection and to share with your assessor.`,
      ``,
      `Contact: info@momops.org`,
    ];
    return lines.join("\n");
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateResultsText());
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback
      const ta = document.createElement("textarea");
      ta.value = generateResultsText();
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleEmailAssessor = () => {
    const result = getResultLevel();
    const subject = encodeURIComponent("My Dyscalculia Self-Check Results – Count Me In");
    const body = encodeURIComponent(
      `Hi,\n\nI recently completed the Count Me In dyscalculia self-check tool and wanted to share my results ahead of our appointment.\n\n` +
      `OVERALL RESULT: ${result.level}\n` +
      `Score: ${totalScore} / ${maxScore} (${percentage}%)\n\n` +
      `BREAKDOWN BY AREA:\n` +
      categories.map((cat) => `  ${cat}: ${getCategoryScore(cat)}%`).join("\n") +
      `\n\n${result.description}\n\n` +
      `Please note this is a reflective self-check, not a clinical diagnostic. I look forward to discussing this with you.\n\n` +
      `Full results generated at countmein.site/self-check`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  if (showResults) {
    const result = getResultLevel();
    return (
      <div>
        <section className="pt-28 pb-20 bg-gradient-to-b from-background to-muted/30">
          <div className="container-custom max-w-3xl">
            <div className="text-center mb-12">
              <Badge variant="outline" className="text-primary border-primary/40 bg-primary/5 px-4 py-1.5 mb-6">
                Your Results
              </Badge>
              <h2 className="text-4xl mb-4">Self-Check Results</h2>
              <p className="text-lg text-muted-foreground">
                Based on your {totalAnswered} responses
              </p>
            </div>

            {/* Main Result */}
            <Card className={`border-2 ${result.bg} mb-8`}>
              <CardContent className="p-8 text-center">
                <div className={`text-2xl mb-2 ${result.color}`} style={{ fontWeight: 600 }}>
                  {result.level}
                </div>
                <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">
                  {result.description}
                </p>
              </CardContent>
            </Card>

            {/* Category Breakdown */}
            <Card className="shadow-custom mb-8">
              <CardContent className="p-8">
                <h3 className="text-xl mb-6">Breakdown by Area</h3>
                <div className="space-y-4">
                  {categories.map((cat) => {
                    const score = getCategoryScore(cat);
                    return (
                      <div key={cat}>
                        <div className="flex justify-between text-sm mb-1">
                          <span style={{ fontWeight: 500 }}>{cat}</span>
                          <span className="text-muted-foreground">{score}%</span>
                        </div>
                        <div className="h-3 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-all duration-500"
                            style={{ width: `${score}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Disclaimer */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
              <div className="flex gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-amber-800" style={{ fontWeight: 600 }}>
                    Important Disclaimer
                  </p>
                  <p className="text-sm text-amber-700 mt-1 leading-relaxed">
                    This self-check is <strong>not a diagnostic tool</strong>.
                    Only a qualified psychologist or educational professional can
                    diagnose dyscalculia. This screening is designed to help you
                    reflect on your experiences and decide if pursuing a formal
                    assessment might be helpful.
                  </p>
                </div>
              </div>
            </div>

            {/* Email Capture - Added for lead generation */}
            <Card className="shadow-custom border border-accent/20 overflow-hidden mb-8">
              <div className="bg-accent/[0.06] border-b border-accent/15 px-8 py-5 flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent flex-shrink-0" />
                <div>
                  <p className="text-base text-foreground" style={{ fontWeight: 600 }}>
                    Get your results via email
                  </p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Plus receive practical strategies and resources for navigating dyscalculia
                  </p>
                </div>
              </div>
              <CardContent className="p-8">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 px-5 py-3 bg-muted/50 border border-border/60 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                  />
                  <Button className="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-full shadow-md whitespace-nowrap">
                    Send My Results
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  No spam, ever. Unsubscribe anytime. We respect your privacy.
                </p>
              </CardContent>
            </Card>

            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Link to="/get-assessed">
                <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full shadow-lg group">
                  Find Assessment Providers
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-full"
                onClick={handleReset}
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Retake Self-Check
              </Button>
            </div>

            {/* Download & Share Section */}
            <Card className="shadow-custom border border-primary/15 overflow-hidden">
              <div className="bg-primary/[0.06] border-b border-primary/15 px-8 py-5 flex items-center gap-3">
                <Share2 className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-base text-foreground" style={{ fontWeight: 600 }}>
                    Save or share your results
                  </p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Download a copy or share directly with your assessor. It's a great conversation starter.
                  </p>
                </div>
              </div>
              <CardContent className="p-8">
                <div className="grid sm:grid-cols-3 gap-4">

                  {/* Download PDF */}
                  <button
                    onClick={handleDownloadResults}
                    className="group flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-primary/25 hover:border-primary hover:bg-primary/[0.04] p-6 text-center transition-all duration-200 cursor-pointer"
                  >
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Download className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-foreground mb-1" style={{ fontWeight: 600 }}>Download Results</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">Save as PDF, formatted and ready to print</p>
                    </div>
                  </button>

                  {/* Copy to Clipboard */}
                  <button
                    onClick={handleCopyToClipboard}
                    className="group flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-primary/25 hover:border-primary hover:bg-primary/[0.04] p-6 text-center transition-all duration-200 cursor-pointer"
                  >
                    <div className={`h-12 w-12 rounded-full flex items-center justify-center transition-colors ${copied ? "bg-green-100" : "bg-primary/10 group-hover:bg-primary/20"}`}>
                      {copied
                        ? <Check className="h-5 w-5 text-green-600" />
                        : <Copy className="h-5 w-5 text-primary" />
                      }
                    </div>
                    <div>
                      <p className="text-sm text-foreground mb-1" style={{ fontWeight: 600 }}>
                        {copied ? "Copied!" : "Copy Summary"}
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">Copy a plain-text summary to your clipboard</p>
                    </div>
                  </button>

                  {/* Email Assessor */}
                  <button
                    onClick={handleEmailAssessor}
                    className="group flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-accent/30 hover:border-accent hover:bg-accent/[0.04] p-6 text-center transition-all duration-200 cursor-pointer"
                  >
                    <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <Mail className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-foreground mb-1" style={{ fontWeight: 600 }}>Email Your Assessor</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">Opens your email with results pre-filled and ready to send</p>
                    </div>
                  </button>

                </div>

                {/* Tip */}
                <div className="mt-6 flex gap-3 items-start bg-muted/50 rounded-xl p-4">
                  <ClipboardList className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <span style={{ fontWeight: 600 }}>Tip for your appointment:</span> Sharing these results gives your assessor useful context before your session. It can save time and help focus the conversation on the areas that matter most to you.
                  </p>
                </div>
              </CardContent>
            </Card>

          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="pt-24 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="container-custom relative z-10">
          <div className="text-center space-y-5 mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/[0.08] border border-primary/15">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/60 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-[13px] text-primary" style={{ fontWeight: 500 }}>Reflective Self-Check</span>
            </div>

            <h1 className="text-[2.5rem] lg:text-[3.25rem] leading-[1.05] tracking-tight">
              <span className="text-gradient">Could This Be Dyscalculia?</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              This 15-question self-check helps you reflect on common
              dyscalculia traits. It's not diagnostic, but it can help you
              decide if a formal assessment is worth exploring.
            </p>
          </div>

          {/* Disclaimer */}
          <div className="max-w-2xl mx-auto bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8">
            <div className="flex gap-3">
              <Info className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-700">
                This is a reflective tool, not a clinical screener. Only a
                qualified professional can diagnose dyscalculia.
              </p>
            </div>
          </div>

          {/* Progress */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>
                Section {currentSection + 1} of {categories.length}:{" "}
                <span style={{ fontWeight: 500 }} className="text-foreground">
                  {categories[currentSection]}
                </span>
              </span>
              <span>
                {totalAnswered}/{questions.length} answered
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{
                  width: `${(totalAnswered / questions.length) * 100}%`,
                }}
              />
            </div>
            {/* Section tabs */}
            <div className="flex gap-1.5 mt-4">
              {categories.map((cat, i) => {
                const catQuestions = questions.filter(
                  (q) => q.category === cat
                );
                const catAnswered = catQuestions.filter(
                  (q) => answers[q.id] !== undefined
                ).length;
                const allAnswered = catAnswered === catQuestions.length;
                return (
                  <button
                    key={cat}
                    onClick={() => setCurrentSection(i)}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs transition-all duration-200 ${
                      i === currentSection
                        ? "bg-primary text-white"
                        : allAnswered
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                    style={{ fontWeight: 500 }}
                  >
                    {cat}
                    {allAnswered && i !== currentSection && (
                      <CheckCircle className="h-3 w-3 inline ml-1" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Questions */}
      <section className="py-8 pb-20">
        <div className="container-custom max-w-2xl">
          <div className="space-y-6">
            {sectionQuestions.map((question, index) => (
              <Card
                key={question.id}
                className={`shadow-custom transition-all duration-200 ${
                  answers[question.id] !== undefined
                    ? "border-primary/20"
                    : ""
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex gap-3 mb-4">
                    <div className="flex-shrink-0 mt-0.5">
                      {answers[question.id] !== undefined ? (
                        <CheckCircle className="h-5 w-5 text-primary" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground/40" />
                      )}
                    </div>
                    <p className="text-base leading-relaxed">
                      {question.text}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 ml-8">
                    {responseOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() =>
                          handleAnswer(question.id, option.value)
                        }
                        className={`px-4 py-2 rounded-full text-sm border transition-all duration-200 ${
                          answers[question.id] === option.value
                            ? "bg-primary text-white border-primary shadow-md"
                            : `${option.color} hover:shadow-sm`
                        }`}
                        style={{ fontWeight: 500 }}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-10">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentSection === 0}
              className="px-6 py-3 rounded-full"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            {currentSection < categories.length - 1 ? (
              <Button
                onClick={handleNext}
                className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full"
              >
                Next Section
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleShowResults}
                disabled={totalAnswered < questions.length}
                className="bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-full shadow-lg"
              >
                See My Results
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>

          {totalAnswered < questions.length &&
            currentSection === categories.length - 1 && (
              <p className="text-center text-sm text-muted-foreground mt-4">
                Please answer all {questions.length} questions to see your
                results ({questions.length - totalAnswered} remaining)
              </p>
            )}
        </div>
      </section>
    </div>
  );
}