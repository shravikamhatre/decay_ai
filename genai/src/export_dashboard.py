import os
import sys
import json
import time
import pandas as pd
niche="Travel"
# ======================================================
# PATHS
# ======================================================

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")
DATA_PATH = os.path.join(DATA_DIR, "content_calendar_history.csv")
OUT_DIR = BASE_DIR

REFRESH_SECONDS = 24 * 60 * 60  # 24 hours

# ======================================================
# UTILS
# ======================================================

def needs_refresh(path):
    if not os.path.exists(path):
        return True
    return time.time() - os.path.getmtime(path) > REFRESH_SECONDS


def score(df):
    df = df.copy()
    df["score"] = (
        0.4 * df["velocity"]
        + 0.3 * (1 - df["decay_score"])
        + 0.3 * df["calendar_score"]
    )
    return df


def to_payload(df, k=10):
    df = df.head(k)
    return [
        {
            "name": row["trend_name"],
            "base": row["trend_base"],
            "score": round(row["score"], 3)
        }
        for _, row in df.iterrows()
    ]


def top_k_with_backfill(df, condition, k=10):
    df = score(df)
    df = df[condition]
    df = df.sort_values(["date", "score"], ascending=[False, False])
    return df.head(k)

# ======================================================
# CORE LOGIC
# ======================================================

def generate_dashboard(niche):
    df = pd.read_csv(DATA_PATH)
    df["date"] = pd.to_datetime(df["date"]).dt.date

    # Filter by user niche only
    df = df[df["creator_niche"] == niche]

    if df.empty:
        raise ValueError(f"No data found for niche: {niche}")

    # GUARANTEED TOP 10 (with backfill)
    top_trends = top_k_with_backfill(
        df,
        df["trend_type"] != "music",
        10
    )

    top_audio = top_k_with_backfill(
        df,
        df["trend_type"] == "music",
        10
    )

    output = {
        "niche": niche,
        "top_trends": to_payload(top_trends, 10),
        "top_audio": to_payload(top_audio, 10)
    }

    out_path = os.path.join(OUT_DIR, f"daily_{niche}.json")

    with open(out_path, "w") as f:
        json.dump(output, f, indent=2)

    print(f"Top-10 dashboard generated → {out_path}")

# ======================================================
# ENTRY POINT
# ======================================================

def main():
    niche = "Travel"   # ASHWERAAAAAA

    out_path = os.path.join(OUT_DIR, f"daily_{niche}.json")

    if needs_refresh(out_path):
        generate_dashboard(niche)
    else:
        print(f"Dashboard for '{niche}' is fresh.")

if __name__ == "__main__":
    main()
