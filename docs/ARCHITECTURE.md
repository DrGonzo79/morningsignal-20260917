# Architecture

## Prototype topology

```mermaid
flowchart LR
  U[Browser user] --> N[Next.js static UI]
  F[Shared fictional fixtures] --> N
  N --> T[Deterministic TypeScript decision policy]
  C[API client / curl] --> A[FastAPI /v1/decisions]
  A --> P[Deterministic Python decision policy]
  F -. contract mirrored .-> P
  T --> R[One action + reasons + reply state]
  P --> J[Validated JSON response]
```

GitHub Pages hosts only the static frontend. The Python service is runnable locally and tested in CI; it is not deployed. The frontend mirrors the small policy locally so the public demo remains functional without pretending Pages can host FastAPI.

## Decision flow and shadow paths

```mermaid
sequenceDiagram
  participant U as User
  participant V as Validator
  participant D as Policy
  participant UI as Message UI
  U->>V: Four signals + goal
  alt nil / wrong type / out of range
    V-->>U: Named inline validation error
  else valid input
    V->>D: Normalized inputs
    D->>D: Weighted readiness + band
    D-->>UI: One catalog action + two reasons
    UI-->>U: Decision and safety boundary
    U->>UI: Accept or skip
    UI-->>U: Visible feedback confirmation
  end
```

Empty state is intentional before generation. The browser demo has no upstream network, eliminating timeout and partial-response behavior. A production client must add request IDs, a 5-second timeout, retry only before delivery, idempotency keys, and a visible “no decision delivered” state.

## Production boundary

- Adapter layer per wearable normalizes units, timestamps, and baseline windows.
- Policy service accepts normalized inputs and emits only approved action IDs.
- Messaging worker owns quiet hours, idempotent delivery, opt-out, and reply parsing.
- Append-only feedback events support audit and learning.
- Safety rules execute before personalization and fail closed.
- Observability includes decision latency, no-decision rate, delivery failures, action acceptance, completion, safety-rule frequency, deletion SLA, and policy-version distribution.
