from fastapi.testclient import TestClient

from main import app

client = TestClient(app)


def test_health() -> None:
    assert client.get("/health").json() == {"status": "ok"}


def test_under_recovered_profile_gets_bounded_action() -> None:
    response = client.post(
        "/v1/decisions",
        json={
            "sleep_hours": 5.3,
            "hrv_delta": -22,
            "resting_hr_delta": 8,
            "soreness": 7,
            "goal": "training",
        },
    )
    assert response.status_code == 200
    body = response.json()
    assert body["band"] == "protect"
    assert body["action"] == "Take a 12-minute daylight walk before noon."
    assert body["safety_note"]


def test_ready_profile_respects_training_goal() -> None:
    response = client.post(
        "/v1/decisions",
        json={
            "sleep_hours": 8.1,
            "hrv_delta": 11,
            "resting_hr_delta": -2,
            "soreness": 1,
            "goal": "training",
        },
    )
    assert response.status_code == 200
    body = response.json()
    assert body["band"] == "push"
    assert "35 minutes" in body["action"]


def test_invalid_sleep_is_rejected() -> None:
    response = client.post(
        "/v1/decisions",
        json={
            "sleep_hours": 25,
            "hrv_delta": 0,
            "resting_hr_delta": 0,
            "soreness": 2,
            "goal": "energy",
        },
    )
    assert response.status_code == 422


def test_unknown_goal_is_rejected() -> None:
    response = client.post(
        "/v1/decisions",
        json={
            "sleep_hours": 7,
            "hrv_delta": 0,
            "resting_hr_delta": 0,
            "soreness": 2,
            "goal": "diagnose",
        },
    )
    assert response.status_code == 422
