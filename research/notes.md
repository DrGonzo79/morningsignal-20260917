# Source notes

## Public source

- Idea: **Daily health decision text message app**
- Date: 2026-09-17
- Public URL: <https://www.ideabrowser.com/hub/ideas/recovery-desk-a70e791d>
- Newsletter thesis: wearable owners do not need another dashboard; they need one contextual action delivered in the channel they already answer.

The public idea page redirected to authentication when opened through a browser and the normal fetch path hit a Vercel security checkpoint. Therefore this document uses only the short idea summary in the subscribed email and does not claim inaccessible page-only scores, keyword data, pricing, or revenue estimates.

## Useful source signals

- Claimed tailwind: AI health coaching is described as a fast-growing category (the newsletter says “on pace to 6x,” without a timeframe or linked dataset in the accessible excerpt).
- Suggested inputs: Oura, Apple, and Whoop data.
- Suggested delivery: one morning SMS, with replies used to learn the user’s goals and context.
- Core product shift: from descriptive insight (“you need more sleep”) to a specific decision (“do this now”).
- Potential expansion: aggregated community patterns, subject to meaningful privacy, consent, and clinical-safety constraints.

## Interpretation and guardrails

The strongest wedge is not “AI health coach.” That phrase invites unsafe scope and crowded competition. The testable product is a **low-risk behavior editor**: one reversible suggestion, an explanation, and a reply loop. The demo intentionally excludes diagnosis, treatment, emergency guidance, real wearable credentials, SMS delivery, and claims that the score is clinically validated.

## Demo fixture policy

All readings, profiles, scores, and responses in the prototype are fictional. The frontend and Python service use the same explicit weighted rule: sleep 36%, HRV delta 28%, resting-heart-rate delta 20%, soreness 16%. This is product-demo logic, not a medical model.
