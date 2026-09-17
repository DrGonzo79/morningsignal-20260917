"use client";

import { useMemo, useState } from "react";
import {
  Activity, ArrowRight, BatteryMedium, Check, CircleAlert, Clock3,
  HeartPulse, LoaderCircle, MessageCircleReply, MoonStar, ShieldCheck,
  Sparkles, Target, TrendingDown, TrendingUp, Waves,
} from "lucide-react";
import demo from "../data/demo.json";

type Goal = "energy" | "training" | "sleep";
type Inputs = { sleepHours: number; hrvDelta: number; restingHrDelta: number; soreness: number; goal: Goal };
type Decision = {
  readiness: number;
  band: "protect" | "steady" | "push";
  headline: string;
  action: string;
  why: string[];
  checkIn: string;
};

const goals: { id: Goal; label: string; description: string }[] = [
  { id: "energy", label: "More energy", description: "Stay sharp through the afternoon" },
  { id: "training", label: "Train wisely", description: "Balance load and recovery" },
  { id: "sleep", label: "Sleep earlier", description: "Protect tonight’s wind-down" },
];

function decide(input: Inputs): Decision {
  const sleepScore = Math.min(100, Math.max(0, (input.sleepHours / 8) * 100));
  const hrvScore = Math.min(100, Math.max(0, 70 + input.hrvDelta * 1.5));
  const heartScore = Math.min(100, Math.max(0, 75 - input.restingHrDelta * 4));
  const sorenessScore = Math.min(100, Math.max(0, 100 - input.soreness * 10));
  const readiness = Math.round(sleepScore * 0.36 + hrvScore * 0.28 + heartScore * 0.2 + sorenessScore * 0.16);
  if (readiness < 55) return {
    readiness, band: "protect", headline: "Protect the morning.",
    action: input.goal === "sleep" ? "Set a 9:30 PM wind-down alarm now." : "Take a 12-minute daylight walk before noon.",
    why: [`${input.sleepHours.toFixed(1)}h sleep reduced today’s capacity`, `HRV is ${Math.abs(input.hrvDelta)}% below your demo baseline`],
    checkIn: "Text back after lunch: better, same, or worse?",
  };
  if (readiness < 78) return {
    readiness, band: "steady", headline: "Keep today steady.",
    action: input.goal === "training" ? "Cap today’s workout at 30 easy minutes." : input.goal === "sleep" ? "Move caffeine cutoff to 1:00 PM." : "Start with 6 minutes of brisk movement.",
    why: ["Signals are mixed, not alarming", `Resting heart rate is ${input.restingHrDelta >= 0 ? "+" : ""}${input.restingHrDelta} bpm from baseline`],
    checkIn: "Text back at 3 PM: useful or missed the mark?",
  };
  return {
    readiness, band: "push", headline: "You have room to move.",
    action: input.goal === "training" ? "Schedule your hardest 35 minutes before noon." : input.goal === "sleep" ? "Bank 20 minutes outside before 10 AM." : "Use your first 45 minutes for the hardest task.",
    why: [`${input.sleepHours.toFixed(1)}h sleep supports normal load`, `HRV is ${input.hrvDelta}% above your demo baseline`],
    checkIn: "Text back tonight: did you use the window?",
  };
}

export default function Home() {
  const [goal, setGoal] = useState<Goal>("energy");
  const [sleep, setSleep] = useState("7.4");
  const [hrv, setHrv] = useState("-4");
  const [restingHr, setRestingHr] = useState("1");
  const [soreness, setSoreness] = useState(2);
  const [decision, setDecision] = useState<Decision | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState<"done" | "skip" | null>(null);

  const selectedGoal = useMemo(() => goals.find((item) => item.id === goal)!, [goal]);

  function loadProfile(id: string) {
    const profile = demo.profiles.find((item) => item.id === id);
    if (!profile) return;
    setSleep(String(profile.sleepHours)); setHrv(String(profile.hrvDelta));
    setRestingHr(String(profile.restingHrDelta)); setSoreness(profile.soreness);
    setGoal(profile.goal as Goal); setDecision(null); setFeedback(null); setError("");
  }

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const parsed = { sleepHours: Number(sleep), hrvDelta: Number(hrv), restingHrDelta: Number(restingHr), soreness, goal };
    if (!Number.isFinite(parsed.sleepHours) || parsed.sleepHours < 0 || parsed.sleepHours > 14) {
      setError("Sleep must be between 0 and 14 hours."); setDecision(null); return;
    }
    if (!Number.isFinite(parsed.hrvDelta) || parsed.hrvDelta < -60 || parsed.hrvDelta > 60) {
      setError("HRV change must be between −60% and 60%."); setDecision(null); return;
    }
    if (!Number.isFinite(parsed.restingHrDelta) || parsed.restingHrDelta < -20 || parsed.restingHrDelta > 30) {
      setError("Resting heart-rate change must be between −20 and 30 bpm."); setDecision(null); return;
    }
    setError(""); setFeedback(null); setLoading(true); setDecision(null);
    window.setTimeout(() => { setDecision(decide(parsed)); setLoading(false); }, 550);
  }

  return <>
    <a className="skip" href="#decision-lab">Skip to decision lab</a>
    <header className="topbar">
      <a href="#top" className="brand" aria-label="MorningSignal home"><span><Waves /></span>MorningSignal</a>
      <nav aria-label="Page"><a href="#decision-lab">Decision lab</a><a href="#how">How it works</a></nav>
      <span className="demo-pill"><i /> FICTIONAL DATA · SIMULATED COACH</span>
    </header>

    <main id="top">
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow"><Sparkles size={15}/> YOUR DATA, EDITED DOWN</span>
          <h1>One signal.<br/><em>One decision.</em></h1>
          <p>MorningSignal turns a noisy wearable dashboard into one transparent, low-risk action for today—and learns when you text back.</p>
          <a className="primary" href="#decision-lab">Get today’s signal <ArrowRight /></a>
        </div>
        <div className="phone" aria-hidden="true">
          <div className="phone-top"><span>9:12</span><b>MorningSignal</b><BatteryMedium/></div>
          <div className="thread-date">TODAY  ·  DEMO</div>
          <div className="bubble incoming"><small>MS</small><p><b>Protect the morning.</b><br/>Your recovery signals dipped overnight. Take a 12-minute daylight walk before noon.</p><time>7:03 AM</time></div>
          <div className="bubble outgoing"><p>Done. Feeling better.</p><time>12:18 PM</time></div>
          <div className="typing"><span/><span/><span/></div>
        </div>
      </section>

      <section className="principles" aria-label="Product boundaries">
        <div><Target/><span><b>One bounded action</b><small>No dashboard scavenger hunt.</small></span></div>
        <div><ShieldCheck/><span><b>Transparent logic</b><small>See which signals mattered.</small></span></div>
        <div><MessageCircleReply/><span><b>Feedback by reply</b><small>Useful behavior beats passive charts.</small></span></div>
      </section>

      <section className="lab" id="decision-lab">
        <div className="section-title"><span>MORNING CHECK-IN 01</span><h2>Turn last night into today’s move.</h2><p>Use a fictional profile or adjust four demo signals.</p></div>
        <div className="lab-grid">
          <form className="input-card" onSubmit={submit}>
            <div className="card-head"><span><small>WEARABLE SNAPSHOT</small><h3>Your demo signals</h3></span><Activity/></div>
            <div className="profiles" aria-label="Demo profiles">
              {demo.profiles.map((profile) => <button type="button" key={profile.id} onClick={() => loadProfile(profile.id)}>{profile.label}</button>)}
            </div>
            <div className="fields">
              <label><span><MoonStar/>Sleep duration</span><div><input aria-label="Sleep duration" inputMode="decimal" value={sleep} onChange={(e) => setSleep(e.target.value)}/><i>hours</i></div></label>
              <label><span><HeartPulse/>HRV vs baseline</span><div><input aria-label="HRV change" inputMode="numeric" value={hrv} onChange={(e) => setHrv(e.target.value)}/><i>%</i></div></label>
              <label><span><Activity/>Resting HR</span><div><input aria-label="Resting heart rate change" inputMode="numeric" value={restingHr} onChange={(e) => setRestingHr(e.target.value)}/><i>bpm Δ</i></div></label>
              <label className="range"><span><BatteryMedium/>Soreness <b>{soreness}/10</b></span><input aria-label="Soreness" type="range" min="0" max="10" value={soreness} onChange={(e) => setSoreness(Number(e.target.value))}/></label>
            </div>
            <fieldset><legend>Today’s priority</legend><div className="goal-grid">{goals.map((item) => <button type="button" key={item.id} className={goal === item.id ? "selected" : ""} onClick={() => {setGoal(item.id); setDecision(null); setFeedback(null);}}><b>{item.label}</b><small>{item.description}</small></button>)}</div></fieldset>
            {error && <div className="error" role="alert"><CircleAlert/>{error}</div>}
            <div className="form-foot"><p><CircleAlert/>Not medical advice. Stop and seek qualified care for urgent or concerning symptoms.</p><button className="run" disabled={loading}>{loading ? <><LoaderCircle className="spin"/>Reading signals…</> : <>Generate one decision <ArrowRight/></>}</button></div>
          </form>

          <aside className={`decision-card ${decision?.band ?? ""}`} aria-live="polite">
            <div className="card-head"><span><small>TODAY’S MESSAGE</small><h3>{selectedGoal.label}</h3></span><MessageCircleReply/></div>
            <div className="decision-body">
              {loading && <div className="empty"><LoaderCircle className="spin"/><h4>Editing the noise</h4><p>Weighting recovery signals against today’s stated priority.</p></div>}
              {!loading && !decision && <div className="empty"><div className="signal-mark"><Waves/></div><h4>No signal yet.</h4><p>Check the demo readings, choose a priority, and generate one decision.</p></div>}
              {!loading && decision && <>
                <div className="readiness"><span><small>READINESS</small><strong>{decision.readiness}<i>/100</i></strong></span>{decision.band === "protect" ? <TrendingDown/> : <TrendingUp/>}</div>
                <div className="sms"><small>MORNING SIGNAL · JUST NOW</small><h4>{decision.headline}</h4><p>{decision.action}</p><span><Clock3/>{decision.checkIn}</span></div>
                <div className="because"><small>WHY THIS, TODAY</small>{decision.why.map((reason) => <p key={reason}><Check/>{reason}</p>)}</div>
                {!feedback && <div className="reply"><p>Log the demo response</p><div><button onClick={() => setFeedback("done")} type="button">I’ll do it</button><button onClick={() => setFeedback("skip")} type="button">Not today</button></div></div>}
                {feedback && <div className="logged"><Check/><span><b>{feedback === "done" ? "Action accepted" : "Action skipped"}</b><small>{feedback === "done" ? "The next demo suggestion will favor short, concrete actions." : "The next demo suggestion will lower effort and ask why."}</small></span><button type="button" onClick={() => setFeedback(null)}>Change</button></div>}
              </>}
            </div>
          </aside>
        </div>
      </section>

      <section className="how" id="how"><span>THE PAID WEDGE</span><h2>Adherence before analytics.</h2><p>The first product is a consented morning decision and reply loop for wearable owners who already check recovery data but still do nothing differently.</p><div className="metrics"><b>$12<small>/month target</small></b><b>5 days<small>weekly action rate</small></b><b>14 days<small>paid concierge test</small></b></div></section>
    </main>
    <footer><a href="#top" className="brand"><span><Waves/></span>MorningSignal</a><p>Fictional prototype · Simulated decision logic · No live wearable or SMS connection.</p><a href="https://www.ideabrowser.com/hub/ideas/recovery-desk-a70e791d">Public source ↗</a></footer>
  </>;
}
