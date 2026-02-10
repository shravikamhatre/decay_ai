import os
import json
import time
import pandas as pd
import numpy as np

# ======================================================
# CONFIG
# ======================================================

LOOKBACK_DAYS = 7
TOP_K = 10
REFRESH_SECONDS = 24 * 60 * 60

# ======================================================
# PATHS
# ======================================================

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")
DATA_PATH = os.path.join(DATA_DIR, "content_calendar_history.csv")
OUT_DIR = BASE_DIR

# ======================================================
# UTILS
# ======================================================

def needs_refresh(path):
    if not os.path.exists(path):
        return True
    return time.time() - os.path.getmtime(path) > REFRESH_SECONDS


def compute_base_score(df):
    return (
        0.35 * df["velocity"] +
        0.20 * (1 - df["decay_score"]) +
        0.25 * df["calendar_score"] +
        0.20 * df["novelty"]
    )


def pct_change(series, periods):
    return (series - series.shift(periods)) / series.shift(periods)


def add_time_signals(df):
    df = df.sort_values("date")

    df["velocity_pct"] = df.groupby("trend_id")["velocity"].transform(
        lambda x: pct_change(x, LOOKBACK_DAYS)
    )

    df["engagement_pct"] = df.groupby("trend_id")["engagement_sum"].transform(
        lambda x: pct_change(x, LOOKBACK_DAYS)
    )

    df["appearance_pct"] = df.groupby("trend_id")["appearance_count"].transform(
        lambda x: pct_change(x, LOOKBACK_DAYS)
    )

    df["saturation_pct"] = df.groupby("trend_id")["saturation"].transform(
        lambda x: pct_change(x, LOOKBACK_DAYS)
    )

    return df



def compute_momentum_score(df):
    df["base_score"] = compute_base_score(df)

    df["momentum_score"] = df["base_score"] * (
        1 +
        0.4 * df["velocity_pct"].fillna(0) +
        0.3 * df["engagement_pct"].fillna(0) +
        0.2 * df["appearance_pct"].fillna(0) -
        0.3 * df["saturation_pct"].fillna(0)
    )

    return df


def build_payload(df):
    out = []
    for _, r in df.iterrows():
        out.append({
            "name": r["trend_name"],
            "base": r["trend_base"],
            "score": round(float(r["momentum_score"]), 3),
            "signals": {
                "velocity_pct": round(float(r["velocity_pct"]), 3),
                "engagement_pct": round(float(r["engagement_pct"]), 3),
                "appearance_pct": round(float(r["appearance_pct"]), 3),
                "saturation_pct": round(float(r["saturation_pct"]), 3),
                "novelty": round(float(r["novelty"]), 3),
                "decay_score": round(float(r["decay_score"]), 3)
            }
        })
    return out

# ======================================================
# CORE LOGIC
# ======================================================

def generate_dashboard(niche):
    df = pd.read_csv(DATA_PATH, parse_dates=["date"])
    df = df[df["creator_niche"] == niche]

    if df.empty:
        raise ValueError(f"No data for niche: {niche}")

    df = add_time_signals(df)
    df = compute_momentum_score(df)

    # Keep latest snapshot per trend
    latest = (
        df.sort_values("date")
        .groupby("trend_id", as_index=False)
        .tail(1)
        .dropna(subset=["momentum_score"])
    )

    # ===== SPLITS =====
    trends = latest[latest["trend_type"] != "music"]
    music = latest[latest["trend_type"] == "music"]

    top_trends_good = trends.sort_values(
        "momentum_score", ascending=False
    ).head(TOP_K)

    top_trends_bad = trends.sort_values(
        "momentum_score", ascending=True
    ).head(TOP_K)

    top_music_good = music.sort_values(
        "momentum_score", ascending=False
    ).head(TOP_K)

    top_music_bad = music.sort_values(
        "momentum_score", ascending=True
    ).head(TOP_K)

    output = {
        "niche": niche,
        "lookback_days": LOOKBACK_DAYS,
        "top_trends_good": build_payload(top_trends_good),
        "top_trends_declining": build_payload(top_trends_bad),
        "top_music_good": build_payload(top_music_good),
        "top_music_declining": build_payload(top_music_bad),
    }

    out_path = os.path.join(OUT_DIR, f"daily_{niche}.json")
    with open(out_path, "w") as f:
        json.dump(output, f, indent=2)

    print(f"Dashboard generated → {out_path}")

# ======================================================
# ENTRY
# ======================================================

if __name__ == "__main__":
    niche = "Entertainment"  # YOU keep changing this
    out_path = os.path.join(OUT_DIR, f"daily_{niche}.json")

    if needs_refresh(out_path):
        generate_dashboard(niche)
    else:
        print(f"Dashboard for {niche} is fresh")
