# Product plan

## Product thesis

MorningSignal converts wearable noise into one explainable, low-risk morning action and uses explicit replies to learn what a person will actually do. It is an adherence product, not a medical product or analytics dashboard.

## ICP and jobs to be done

**ICP:** frequent Oura, Whoop, or Apple Watch users aged roughly 35–55 who check recovery data most mornings, control their own schedule, and already spend on wellness but struggle to translate insight into action.

**JTBD:** “When I wake up to several health signals, tell me the single safest useful thing to do today, explain why, and let me respond without managing another app.”

Excluded initially: patients seeking diagnosis/treatment, employer monitoring, minors, competitive-athlete programming, and emergency or symptom triage.

## MVP vertical slice

1. Capture sleep duration, HRV delta, resting-HR delta, soreness, and today’s goal.
2. Validate safe ranges and compute a deterministic readiness band.
3. Return exactly one bounded action plus the two strongest reasons.
4. Record “I’ll do it” or “not today” feedback.
5. Show a persistent safety boundary.

Real SMS, wearable OAuth, accounts, storage, billing, an LLM, and clinician workflows are deferred until the concierge test earns them.

## Data model

- `User`: timezone, consent version, preferences, quiet hours.
- `DailySignal`: date, source, sleep hours, HRV delta, resting-HR delta, soreness, provenance.
- `Decision`: policy version, readiness score, band, action ID, reasons, delivery timestamp.
- `FeedbackEvent`: accepted/skipped/completed, reason, timestamp.
- `SafetyEvent`: rule fired, input snapshot hash, escalation copy, reviewed status.

The public demo persists none of these. Production health-adjacent data must be minimized, encrypted, retention-limited, exportable, and deletable.

## AI/model strategy

Use rules first. An LLM may later rewrite approved action templates for tone, but it must never invent an action, diagnose, or override safety rules. Personalization should start with contextual bandits over an approved action catalog only after enough consented feedback exists. Every output stores policy and template versions for auditability.

## Economics

- Concierge trial: $19 for 14 days.
- Target subscription: $12/month consumer plan.
- Target variable cost: <$1.50/user/month for SMS and inference after automation.
- Gross-margin target: >80%; support target: <10 minutes/user/month.
- Kill test: fewer than 5 of 25 paid trialists convert, or action completion stays below 40% despite copy iteration.

The source offered no accessible price or revenue evidence; these are validation hypotheses, not forecasts.

## Validation plan

1. Interview 10 frequent wearable checkers around their actual last seven mornings.
2. Sell 25 concierge trials before integrating a wearable.
3. Observe five unassisted prototype sessions.
4. Track delivered → read → accepted → completed → reported useful.
5. Interview all skips within 24 hours; classify timing, effort, trust, irrelevance, and safety concern.
6. Advance only if ≥60% day-level completion, ≥70% week-two retention, and ≥20% paid conversion.

## Distribution and GTM

Start with coaches and small wearable-user communities where a trusted facilitator can recruit cohorts. Publish anonymized “action adherence” learnings, not health outcomes. Later channels: Oura/Whoop coaches, wellness newsletters, employer executive-wellness benefits. Avoid influencer health claims until the product has a formal clinical and legal review.

## Moat

The only plausible moat is the permissioned longitudinal mapping from signal context → suggested action → acceptance/completion → self-reported effect. SMS, an LLM wrapper, and readiness scoring are commodities. Trust, safety operations, and dense per-user feedback may compound.

## Risks

- Harm or delayed care from overconfident guidance.
- Metric errors, missing baselines, timezone drift, or stale wearable sync.
- Health-data privacy and consent failure.
- Alert fatigue and novelty decay.
- Vendor API changes and SMS deliverability.
- Proxy optimization: maximizing replies instead of useful behavior.
- False personalization from sparse or biased feedback.

## 30 / 60 / 90 days

- **0–30:** paid concierge, 25 users, five observed sessions, safety taxonomy, manual daily operations.
- **31–60:** automate approved rules, add consented SMS replies, instrument funnel, run second paid cohort.
- **61–90:** one wearable integration only if manual retention clears thresholds; add deletion/export; secure external clinical/legal review before expanding action catalog.
