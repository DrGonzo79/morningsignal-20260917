# Phased build prompts

## Phase 1 — paid concierge instrumentation

Implement a private operator console for a 25-person, 14-day paid cohort. Preserve the current action catalog and safety boundary. Add consent versioning, manual input provenance, decision/reply event logging, quiet hours, export/deletion, and a cohort funnel. Do not add wearable OAuth or an LLM. Acceptance: every delivered action is traceable to policy version, inputs, operator, and reply; deletion completes within one business day.

## Phase 2 — real SMS, fail closed

Add a messaging provider behind an adapter. Implement signed webhooks, STOP handling, user-local scheduling, idempotency, delivery receipts, provider timeout/rejection states, and a no-safe-action path. Build golden contract tests shared with the policy service. Acceptance: retries never duplicate a daily action; all failures are visible; opt-outs are immediate.

## Phase 3 — one wearable integration

Integrate only the vendor most used by retained paying customers. Normalize timestamps, units, baseline windows, and freshness; store minimum necessary data; rotate/revoke tokens. Add a manual fallback and explain missing/stale signals. Acceptance: stale or incomplete data never generates a normal recommendation; authorization and deletion tests pass.

## Phase 4 — bounded personalization

Create an approved action catalog and learn ranking from consented accept/skip/complete events. An LLM may only rewrite approved copy within schema and safety constraints. Add offline evaluation, policy rollout/rollback, drift monitoring, and external clinical/legal review. Acceptance: no generated action can escape the catalog; every output is reproducible from stored versions.
