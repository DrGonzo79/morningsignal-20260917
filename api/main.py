from typing import Literal

from fastapi import FastAPI
from pydantic import BaseModel, Field

app = FastAPI(title="MorningSignal Decision API", version="0.1.0")


class SignalInput(BaseModel):
    sleep_hours: float = Field(ge=0, le=14)
    hrv_delta: float = Field(ge=-60, le=60)
    resting_hr_delta: float = Field(ge=-20, le=30)
    soreness: int = Field(ge=0, le=10)
    goal: Literal["energy", "training", "sleep"]


class Decision(BaseModel):
    readiness: int
    band: Literal["protect", "steady", "push"]
    headline: str
    action: str
    reasons: list[str]
    check_in: str
    safety_note: str


def build_decision(signal: SignalInput) -> Decision:
    """Turn normalized wearable deltas into one transparent, bounded action."""
    sleep_score = min(100, max(0, signal.sleep_hours / 8 * 100))
    hrv_score = min(100, max(0, 70 + signal.hrv_delta * 1.5))
    heart_score = min(100, max(0, 75 - signal.resting_hr_delta * 4))
    soreness_score = min(100, max(0, 100 - signal.soreness * 10))
    readiness = round(
        sleep_score * 0.36
        + hrv_score * 0.28
        + heart_score * 0.20
        + soreness_score * 0.16
    )

    if readiness < 55:
        action = (
            "Set a 9:30 PM wind-down alarm now."
            if signal.goal == "sleep"
            else "Take a 12-minute daylight walk before noon."
        )
        return Decision(
            readiness=readiness,
            band="protect",
            headline="Protect the morning.",
            action=action,
            reasons=[
                f"{signal.sleep_hours:.1f}h sleep reduced today's capacity",
                f"HRV is {abs(signal.hrv_delta):g}% below the demo baseline",
            ],
            check_in="Text back after lunch: better, same, or worse?",
            safety_note="Educational demo only; not medical advice.",
        )

    if readiness < 78:
        actions = {
            "training": "Cap today's workout at 30 easy minutes.",
            "sleep": "Move caffeine cutoff to 1:00 PM.",
            "energy": "Start with 6 minutes of brisk movement.",
        }
        return Decision(
            readiness=readiness,
            band="steady",
            headline="Keep today steady.",
            action=actions[signal.goal],
            reasons=[
                "Signals are mixed, not alarming",
                f"Resting heart rate is {signal.resting_hr_delta:+g} bpm from baseline",
            ],
            check_in="Text back at 3 PM: useful or missed the mark?",
            safety_note="Educational demo only; not medical advice.",
        )

    actions = {
        "training": "Schedule your hardest 35 minutes before noon.",
        "sleep": "Bank 20 minutes outside before 10 AM.",
        "energy": "Use your first 45 minutes for the hardest task.",
    }
    return Decision(
        readiness=readiness,
        band="push",
        headline="You have room to move.",
        action=actions[signal.goal],
        reasons=[
            f"{signal.sleep_hours:.1f}h sleep supports normal load",
            f"HRV is {signal.hrv_delta:g}% above the demo baseline",
        ],
        check_in="Text back tonight: did you use the window?",
        safety_note="Educational demo only; not medical advice.",
    )


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/v1/decisions", response_model=Decision)
def create_decision(signal: SignalInput) -> Decision:
    return build_decision(signal)
