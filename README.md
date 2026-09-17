# MorningSignal

One wearable signal, one explainable morning decision, one reply loop.

This is a runnable product prototype inspired by Ideabrowser’s public [Daily health decision text message app](https://www.ideabrowser.com/hub/ideas/recovery-desk-a70e791d). All readings and results are fictional. The decision policy is deterministic and unvalidated; this is not medical advice.

## What works

- Choose fictional wearable profiles or enter bounded demo readings.
- Generate one goal-aware action with transparent reasons.
- Exercise validation, loading, empty, and response states.
- Accept or skip the suggestion and change the recorded demo reply.
- Call the FastAPI decision endpoint with the same domain policy.
- Run integration and browser tests on desktop and mobile.

GitHub Pages hosts the static Next.js frontend only. The Python API is source code tested locally and in CI; it is **not publicly deployed**.

## Run frontend

```bash
npm ci
npm run dev
```

Open <http://localhost:3000>.

## Run and test API

Requires Python 3.12+ and [uv](https://docs.astral.sh/uv/).

```bash
cd api
uv sync --frozen
uv run pytest
uv run uvicorn main:app --reload
```

Example:

```bash
curl -X POST http://127.0.0.1:8000/v1/decisions \
  -H 'content-type: application/json' \
  -d '{"sleep_hours":5.3,"hrv_delta":-22,"resting_hr_delta":8,"soreness":7,"goal":"training"}'
```

## Verify everything

```bash
npm run typecheck
npm run test:e2e
npm run build
npm run audit:prod
cd api && uv run pytest
```

## Product documents

- [Office Hours diagnosis](docs/OFFICE_HOURS.md)
- [Product plan](docs/PRODUCT.md)
- [Architecture](docs/ARCHITECTURE.md)
- [CEO review](docs/CEO_REVIEW.md)
- [Build prompts](docs/BUILD_PROMPTS.md)
- [Source notes](research/notes.md)
