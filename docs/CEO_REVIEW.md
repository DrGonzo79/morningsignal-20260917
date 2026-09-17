# CEO review

Date: 2026-09-17 · Mode: **scope reduction** · Status: DONE_WITH_CONCERNS

## Nuclear scope challenge

The original framing—AI health coaching over SMS—is too broad, clinically risky, and undifferentiated. The product outcome is behavior adherence, not better health prose. The accepted scope is one deterministic, reversible action with visible reasoning and explicit feedback. Wearable OAuth, live SMS, community data, an LLM, and medical claims are cut from the prototype.

**Current state → this plan → 12-month ideal:** ignored wearable charts → paid decision/reply concierge → a trusted action policy with consented longitudinal response data and externally reviewed safety operations.

Alternatives considered: (A) manual concierge, S/low risk; (B) deterministic demo, M/medium risk; (C) adaptive connected coach, XL/high risk. Build B to sell and learn through A. Do not begin C until paid retention exists.

## 1. Architecture review

The static Pages demo and undeployed FastAPI service are deliberately separate. Mirrored rules could drift; contract fixtures and policy-version fields are required before production. Fail closed when input provenance or baseline freshness is missing. No persistence in the public demo reduces risk.

## 2. Error and rescue map

- Out-of-range or nonnumeric signal → field-specific browser error / FastAPI 422; no score.
- Missing or unsupported goal → FastAPI 422; no default medical assumption.
- Wearable timeout (future) → `WearableTimeout`; show “No decision sent—open source app,” never reuse stale data silently.
- SMS provider rejection (future) → `DeliveryRejected`; one alternate-channel alert, no duplicate action.
- Policy has no approved action (future) → `NoSafeAction`; send no recommendation and record a safety event.
- Duplicate scheduler run (future) → idempotency key on user/date/policy; return original decision.

## 3. Security and threat model

Health-adjacent data is sensitive. Risks include credential theft, webhook spoofing, prompt injection in free text, cross-user disclosure, and overbroad retention. Production requires OAuth token vaulting, signed webhooks, strict schemas, per-tenant authorization, rate limits, encryption, audit logs, data export/deletion, and no raw free text in model prompts by default.

## 4. Data flow and interaction edge cases

Nil, empty, wrong-type, impossible-range, and stale inputs must not generate an action. Long decimals are normalized; baseline deltas require units. Double submit disables the button. Navigation during the simulated delay loses only ephemeral state. Back/refresh resets demo state visibly. Feedback can be changed in the demo; production keeps both events and marks the latest effective state.

## 5. Code quality review

The policy is intentionally small and named. Remaining concern: TypeScript/Python duplication. Next step is a language-neutral fixture suite, not a shared runtime. Avoid a premature rule engine; an approved action catalog and versioned pure function are enough.

## 6. Test review

Covered: protect/push decisions, invalid sleep, unsupported goal, health endpoint, primary browser workflow, reply change, validation, and mobile overflow. Gaps: cross-language golden fixtures, accessibility scan, timezone/DST, double-submit, offline browser, SMS idempotency, and deletion flows. These are required before connected beta.

## 7. Observability and monitoring

Prototype failures are visible through CI. Production needs metrics for input freshness, decision band, no-safe-action, p95 latency, provider delivery, reply parsing, daily completion, opt-out, and safety events. Alert on any cross-user access, safety-policy bypass, >5% delivery failures, or >1% stale-input use. A safety-event runbook is mandatory.

## 8. Database and state management

No prototype database. Production should use append-only signal/decision/feedback records with user-scoped indexes and immutable policy versions. Enforce one active decision per user/local-date/policy, while retaining superseded feedback for audit. Separate identity/contact data from signal history.

## 9. API design and contract

`POST /v1/decisions` accepts bounded normalized values and a closed goal enum; response includes score, band, action, reasons, check-in, and safety note. Add policy version, action ID, input freshness, request ID, and idempotency key before v1 stability. Rate limiting belongs at the edge.

## 10. Performance and scalability

The pure policy is cheap; messaging, vendor APIs, and per-user scheduling dominate. At 10×, queue morning deliveries by timezone. At 100×, enforce vendor backpressure, partition jobs, cache baseline summaries, and prevent thundering herds at 7 AM. Never trade safety checks for throughput.

## 11. Design and UX

Hierarchy is correct: one decision first, reasoning second, reply third. The demo labels fictional data and simulated coaching, includes empty/loading/error states, responsive layout, keyboard focus, and no horizontal overflow. Biggest trust risk is presenting a numeric readiness score that looks clinical; production should validate it or demote the number behind qualitative bands.

## CEO review summary

- **Strongest challenges:** no demand evidence; clinical/trust risk; commodity delivery and scoring.
- **Recommended path:** sell a 14-day manual service, use this demo for observation, and gate integrations on paid retention.
- **Accepted scope:** deterministic decision, explanation, reply state, explicit demo fixtures, local/CI FastAPI.
- **Deferred:** OAuth, real SMS, storage, adaptive model, payments, community benchmarking.
- **Not in scope:** diagnosis, treatment, symptom triage, employer surveillance, clinical outcome claims.
