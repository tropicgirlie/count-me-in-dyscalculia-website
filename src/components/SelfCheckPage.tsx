import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import {
  MdArrowForward,
  MdArrowBack,
  MdOutlineWarningAmber,
  MdOutlineRotateLeft,
  MdOutlineInfo,
  MdOutlineDownload,
  MdOutlineMail,
  MdOutlineContentCopy,
  MdCheck,
  MdOutlineShare,
  MdOutlineAssignment,
} from "react-icons/md";
import { usePageMeta } from "../lib/usePageMeta";

interface Question {
  id: number;
  text: string;
  category: string;
}

const questions: Question[] = [
  { id: 1, text: "I frequently struggle to estimate how long tasks will take", category: "Time" },
  { id: 2, text: "I find it hard to read analogue clocks quickly", category: "Time" },
  { id: 3, text: "I often lose track of time and arrive late or too early", category: "Time" },
  { id: 4, text: "Splitting a bill at a restaurant causes me significant anxiety", category: "Numbers" },
  { id: 5, text: "I transpose or mix up numbers when writing them down (e.g. 36 instead of 63)", category: "Numbers" },
  { id: 6, text: "I struggle to remember PINs, phone numbers, or sequences of numbers", category: "Numbers" },
  { id: 7, text: "I have difficulty understanding percentages, fractions, or ratios", category: "Numbers" },
  { id: 8, text: "I find it hard to follow directions involving distances or measurements", category: "Spatial" },
  { id: 9, text: "I often confuse left and right", category: "Spatial" },
  { id: 10, text: "I struggle with reading maps or estimating distances", category: "Spatial" },
  { id: 11, text: "I feel intense anxiety or panic when asked to do mental arithmetic", category: "Emotional" },
  { id: 12, text: "I avoid situations where I might need to count or calculate in front of others", category: "Emotional" },
  { id: 13, text: "I have developed elaborate workarounds to avoid dealing with numbers", category: "Daily Life" },
  { id: 14, text: "I find budgeting and managing finances overwhelming", category: "Daily Life" },
  { id: 15, text: "I struggle to follow recipes that require measurement conversions", category: "Daily Life" },
];

const responseOptions = [
  { value: 0, label: "Never", key: "1" },
  { value: 1, label: "Rarely", key: "2" },
  { value: 2, label: "Sometimes", key: "3" },
  { value: 3, label: "Often", key: "4" },
  { value: 4, label: "Always", key: "5" },
];

const ease = [0.16, 1, 0.3, 1] as const;

export function SelfCheckPage() {
  usePageMeta({
    title: "Dyscalculia Self-Check Quiz for Adults | Count Me In",
    description: "Take this free 15-question dyscalculia self-check to reflect on common traits. Not diagnostic. Helps you decide if a professional assessment is worth exploring.",
  });

  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const categories = [...new Set(questions.map((q) => q.category))];
  const question = questions[currentIndex];

  const totalAnswered = Object.keys(answers).length;
  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
  const maxScore = questions.length * 4;
  const percentage = Math.round((totalScore / maxScore) * 100);
  const allAnswered = totalAnswered === questions.length;

  const handleAnswer = (questionId: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    if (currentIndex < questions.length - 1) {
      window.setTimeout(() => setCurrentIndex((i) => i + 1), 320);
    }
  };

  // Keyboard answering: 1–5
  useEffect(() => {
    if (!started || showResults) return;
    const onKey = (e: KeyboardEvent) => {
      const opt = responseOptions.find((o) => o.key === e.key);
      if (opt) handleAnswer(question.id, opt.value);
      if (e.key === "ArrowLeft" && currentIndex > 0) setCurrentIndex((i) => i - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const handleShowResults = () => {
    setShowResults(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setStarted(false);
    setCurrentIndex(0);
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
    const catScore = catQuestions.reduce((sum, q) => sum + (answers[q.id] || 0), 0);
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

  /* ---------------- Results view ---------------- */
  if (showResults) {
    const result = getResultLevel();
    return (
      <div>
        <section className="pt-32 pb-20 bg-paper/45 min-h-screen">
          <div className="container-custom max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              className="text-center mb-12"
            >
              <span className="inline-flex rounded-full px-3.5 py-1.5 text-xs uppercase tracking-widest tape-label mb-6" style={{ fontWeight: 600 }}>
                Your Results
              </span>
              <h2 className="font-display text-4xl lg:text-5xl text-ink mb-4" style={{ fontWeight: 520 }}>Self-Check Results</h2>
              <p className="text-lg text-ink-muted">Based on your {totalAnswered} responses</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.1 }}
              className={`rounded-3xl border-2 ${result.bg} mb-8 p-8 sm:p-10 text-center`}
            >
              <div className={`font-display text-3xl mb-3 ${result.color}`} style={{ fontWeight: 540 }}>
                {result.level}
              </div>
              <p className="text-ink-muted leading-relaxed max-w-xl mx-auto">{result.description}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.18 }}
              className="paper-card rounded-3xl mb-8 p-8 sm:p-10"
            >
              <h3 className="font-display text-2xl text-ink mb-8" style={{ fontWeight: 520 }}>Breakdown by area</h3>
              <div className="space-y-5">
                {categories.map((cat, i) => {
                  const score = getCategoryScore(cat);
                  return (
                    <div key={cat}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-ink" style={{ fontWeight: 500 }}>{cat}</span>
                        <span className="text-ink-muted tabular-nums">{score}%</span>
                      </div>
                      <div className="h-2.5 bg-ink/[0.06] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${score}%` }}
                          transition={{ duration: 0.9, ease, delay: 0.3 + i * 0.1 }}
                          className="h-full bg-primary rounded-full"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.26 }}
            >
              <div className="paper-surface rounded-2xl p-6 mb-8">
                <div className="flex gap-3">
                  <MdOutlineWarningAmber className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-amber-800" style={{ fontWeight: 600 }}>Important Disclaimer</p>
                    <p className="text-sm text-amber-700 mt-1 leading-relaxed">
                      This self-check is <strong>not a diagnostic tool</strong>. Only a qualified psychologist or educational
                      professional can diagnose dyscalculia. This screening is designed to help you reflect on your
                      experiences and decide if pursuing a formal assessment might be helpful.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                <Link to="/get-assessed">
                  <Button className="bg-ink hover:bg-ink-soft text-white px-8 py-3 h-12 rounded-full shadow-lg group">
                    Find Assessment Providers
                    <MdArrowForward className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="border-ink/20 text-ink hover:bg-ink/5 px-8 py-3 h-12 rounded-full"
                  onClick={handleReset}
                >
                  <MdOutlineRotateLeft className="mr-2 h-4 w-4" />
                  Retake Self-Check
                </Button>
              </div>

              <div className="paper-card rounded-3xl overflow-hidden">
                <div className="paper-surface px-8 py-5 flex items-center gap-3">
                  <MdOutlineShare className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-base text-ink" style={{ fontWeight: 600 }}>Save or share your results</p>
                    <p className="text-sm text-ink-muted mt-0.5">
                      Download a copy or share directly with your assessor. It's a great conversation starter.
                    </p>
                  </div>
                </div>
                <div className="p-8">
                  <div className="grid sm:grid-cols-3 gap-4">
                    <button
                      onClick={handleDownloadResults}
                      className="group flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-primary/25 hover:border-primary hover:bg-primary/[0.04] p-6 text-center transition-all duration-200 cursor-pointer"
                    >
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <MdOutlineDownload className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-ink mb-1" style={{ fontWeight: 600 }}>Download Results</p>
                        <p className="text-xs text-ink-muted leading-relaxed">Save as PDF, formatted and ready to print</p>
                      </div>
                    </button>

                    <button
                      onClick={handleCopyToClipboard}
                      className="group flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-primary/25 hover:border-primary hover:bg-primary/[0.04] p-6 text-center transition-all duration-200 cursor-pointer"
                    >
                      <div className={`h-12 w-12 rounded-full flex items-center justify-center transition-colors ${copied ? "bg-green-100" : "bg-primary/10 group-hover:bg-primary/20"}`}>
                        {copied ? <MdCheck className="h-5 w-5 text-green-600" /> : <MdOutlineContentCopy className="h-5 w-5 text-primary" />}
                      </div>
                      <div>
                        <p className="text-sm text-ink mb-1" style={{ fontWeight: 600 }}>{copied ? "Copied!" : "Copy Summary"}</p>
                        <p className="text-xs text-ink-muted leading-relaxed">Copy a plain-text summary to your clipboard</p>
                      </div>
                    </button>

                    <button
                      onClick={handleEmailAssessor}
                      className="group flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-accent/30 hover:border-accent hover:bg-accent/[0.04] p-6 text-center transition-all duration-200 cursor-pointer"
                    >
                      <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                        <MdOutlineMail className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-sm text-ink mb-1" style={{ fontWeight: 600 }}>Email Your Assessor</p>
                        <p className="text-xs text-ink-muted leading-relaxed">Opens your email with results pre-filled and ready to send</p>
                      </div>
                    </button>
                  </div>

                  <div className="mt-6 flex gap-3 items-start paper-surface rounded-xl p-4">
                    <MdOutlineAssignment className="h-4 w-4 text-ink-muted flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-ink-muted leading-relaxed">
                      <span style={{ fontWeight: 600 }}>Tip for your appointment:</span> Sharing these results gives your
                      assessor useful context before your session. It can save time and help focus the conversation on the
                      areas that matter most to you.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

  /* ---------------- Intro + conversational stepper ---------------- */
  return (
    <div className="min-h-screen bg-paper/45">
      <section className="pt-32 pb-24 relative overflow-hidden">
        <div className="container-custom relative z-10">
          <AnimatePresence mode="wait">
            {!started ? (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.6, ease }}
                className="text-center max-w-2xl mx-auto space-y-6"
              >
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full tape-label">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/60 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  <span className="text-[13px] text-ink" style={{ fontWeight: 500 }}>Reflective Self-Check</span>
                </span>

                <h1 className="font-display text-[clamp(2.4rem,6vw,3.75rem)] leading-[1.04] tracking-tight text-ink" style={{ fontWeight: 520 }}>
                  Could this be <span className="italic" style={{ fontWeight: 400 }}>dyscalculia?</span>
                </h1>

                <p className="text-lg text-ink-muted max-w-xl mx-auto leading-relaxed">
                  Fifteen gentle questions, one at a time. Not diagnostic — but it can help you decide
                  if a formal assessment is worth exploring.
                </p>

                <div className="max-w-xl mx-auto paper-surface rounded-xl p-4">
                  <div className="flex gap-3 text-left">
                    <MdOutlineInfo className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-amber-700">
                      This is a reflective tool, not a clinical screener. Only a qualified professional can diagnose dyscalculia.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    onClick={() => setStarted(true)}
                    className="h-[52px] bg-ink hover:bg-ink-soft text-white px-9 rounded-full shadow-lg text-[15px] group"
                  >
                    Begin the self-check
                    <MdArrowForward className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <p className="mt-4 text-xs text-ink-muted/70">About 3 minutes · you can go back and change any answer</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="stepper"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease }}
                className="max-w-2xl mx-auto"
              >
                {/* Progress */}
                <div className="mb-10">
                  <div className="flex items-center justify-between text-sm text-ink-muted mb-3">
                    <span>
                      Question <span className="text-ink tabular-nums" style={{ fontWeight: 600 }}>{currentIndex + 1}</span>
                      <span className="tabular-nums"> / {questions.length}</span>
                    </span>
                    <span className="inline-flex rounded-full bg-white/80 border border-ink/10 px-3 py-1 text-xs text-ink" style={{ fontWeight: 500 }}>
                      {question.category}
                    </span>
                  </div>
                  <div className="h-1.5 bg-ink/[0.07] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary rounded-full"
                      animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                      transition={{ duration: 0.5, ease }}
                    />
                  </div>
                </div>

                {/* Question card */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={question.id}
                    initial={{ opacity: 0, x: 36 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -28 }}
                    transition={{ duration: 0.38, ease }}
                    className="paper-surface rounded-[1.75rem] p-8 sm:p-12"
                  >
                    <p className="font-display text-[clamp(1.5rem,3.4vw,2.1rem)] leading-[1.25] text-ink mb-10" style={{ fontWeight: 500 }}>
                      {question.text}
                    </p>

                    <div className="flex flex-wrap gap-2.5" role="radiogroup" aria-label="How often is this true for you?">
                      {responseOptions.map((option) => {
                        const selected = answers[question.id] === option.value;
                        return (
                          <button
                            key={option.value}
                            role="radio"
                            aria-checked={selected}
                            onClick={() => handleAnswer(question.id, option.value)}
                            className={`
                              px-5 py-2.5 rounded-full text-sm border transition-all duration-200
                              ${selected
                                ? "bg-ink text-white border-ink shadow-md scale-[1.03]"
                                : "bg-white/80 text-ink-muted border-ink/15 hover:border-ink/40 hover:text-ink hover:-translate-y-0.5"
                              }
                            `}
                            style={{ fontWeight: 500 }}
                          >
                            {option.label}
                          </button>
                        );
                      })}
                    </div>

                    <p className="mt-6 text-xs text-ink-muted/60">Tip: press 1–5 to answer</p>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-8">
                  <button
                    onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
                    disabled={currentIndex === 0}
                    className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink disabled:opacity-30 disabled:hover:text-ink-muted transition-colors"
                  >
                    <MdArrowBack className="h-4 w-4" />
                    Back
                  </button>

                  {currentIndex === questions.length - 1 ? (
                    <Button
                      onClick={handleShowResults}
                      disabled={!allAnswered}
                      className="bg-accent hover:bg-accent/90 text-white px-8 h-11 rounded-full shadow-lg"
                    >
                      See my results
                      <MdArrowForward className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <span className="text-xs text-ink-muted/60 tabular-nums">
                      {totalAnswered} of {questions.length} answered
                    </span>
                  )}
                </div>

                {currentIndex === questions.length - 1 && !allAnswered && (
                  <p className="text-center text-sm text-ink-muted mt-4">
                    {questions.length - totalAnswered} question{questions.length - totalAnswered === 1 ? "" : "s"} still
                    unanswered — use Back to revisit them.
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
