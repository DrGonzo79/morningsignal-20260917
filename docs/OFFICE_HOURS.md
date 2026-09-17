# Office Hours: MorningSignal

Generated 2026-09-17 · Mode: startup diagnostic · Status: decision recorded for unattended prototype

## Position

The broad “AI health coach” premise is weak. Wearable platforms already explain recovery, and generic advice is free. The narrow opportunity is a consented **decision-and-reply loop** for people who compulsively check their wearable dashboard but fail to change a single behavior.

## Six forcing questions

### 1. Demand reality

No direct demand evidence was available in the source. Category growth and wearable adoption are not demand. The prototype must earn stronger evidence: at least 10 of 25 recruited wearable owners voluntarily follow four suggestions in one week, and at least five prepay for a second month. Anything less is engagement theater.

### 2. Painful status quo

The specific workflow is: wake up → check readiness/sleep/HRV across a wearable app → scan charts and generic explanations → continue the day without choosing a behavior. The cost is not data access; it is daily interpretation effort, decision fatigue, and poor adherence.

### 3. Desperate specificity

**Primary ICP:** a 35–55-year-old manager or founder who owns an Oura/Whoop/Apple Watch, opens the app at least five mornings per week, and is trying to maintain energy or training consistency while managing a busy schedule. They are not ill; they are frustrated that expensive data does not change what they do.

The highest-risk customer is someone with symptoms or a diagnosed condition. They are explicitly outside the initial ICP because the product is not clinical care.

### 4. Narrowest paid wedge

A 14-day paid concierge: the customer forwards or manually enters four morning readings, receives one low-risk action by text before 8 AM, and replies “done,” “skip,” or a short reason. Charge **$19 for the trial**, then test **$12/month**. No dashboard, community, diagnosis, or automated wearable integration is required to validate the value.

### 5. Observation and surprise

No unassisted observation exists yet. Watch five people use the prototype without explanation. Record whether they understand deltas, whether they trust the “why,” whether they choose a goal before seeing the suggestion, and whether “not today” feels safe. The surprise to seek: users may value permission to rest more than optimization.

### 6. Future-fit

Wearable data will become cheaper and more abundant; interpretation will commoditize. A product gets more essential only if it owns the longitudinal behavior-response loop—what this person actually follows, rejects, and benefits from—not merely the raw metric feed.

## Premise challenge

1. More health data is not the problem; adherence is.
2. The SMS channel is an acquisition and habit hypothesis, not a moat.
3. Transparent bounded rules are better than an LLM in the first release because trust, consistency, and safety matter more than prose variety.
4. If users will not pay for a manual 14-day service, automated integrations will not rescue the business.

## Approaches considered

### A. Manual text concierge — minimal viable
- **Effort:** S · **Risk:** Low
- **Pros:** tests willingness to pay and follow actions; no integration dependency; exposes language and safety objections.
- **Cons:** labor intensive; small sample; founder quality may mask weak automation.
- **Reuses:** off-the-shelf business texting and a structured worksheet.

### B. Rule-based morning decision demo — selected
- **Effort:** M · **Risk:** Medium
- **Pros:** unassisted workflow is testable; deterministic explanations; creates the eventual API contract.
- **Cons:** manual inputs add friction; rule weights are unvalidated; simulated messaging can overstate channel fit.
- **Reuses:** shared JSON fixtures and the same decision policy in TypeScript and Python.

### C. Connected adaptive coaching platform — ideal later architecture
- **Effort:** XL · **Risk:** High
- **Pros:** automatic context; longitudinal personalization; richer retention loop.
- **Cons:** OAuth and vendor dependencies; sensitive health data; clinical/regulatory exposure; premature before payment evidence.
- **Reuses:** decision contract and feedback event model from B.

## Recommendation and assignment

Build B only as a recruitment and observation artifact, while selling A. Recruit 25 frequent wearable users, charge before onboarding, and run a 14-day test. Success is action completion on ≥60% of delivered days, week-two retention ≥70%, five unsolicited “where is today’s message?” events, and ≥20% conversion to $12/month.
