import os
import json
import time
import pandas as pd
from datetime import date

# ======================================================
# PATHS (CORRECT & COMPLETE)
# ======================================================

# project root (ThonMyData/)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# data folder
DATA_DIR = os.path.join(BASE_DIR, "data")

# input CSV
DATA_PATH = os.path.join(DATA_DIR, "content_calendar_history.csv")

# output JSON in ROOT folder
OUT_PATH = os.path.join(BASE_DIR, "daily.json")

REFRESH_SECONDS = 24 * 60 * 60  # 24 hours

# ======================================================
# UTILS
# ======================================================

def needs_refresh(path):
    if not os.path.exists(path):
        return True
    return time.time() - os.path.getmtime(path) > REFRESH_SECONDS


def score_and_rank(df, top_k=10):
    df = df.copy()
    df["score"] = (
        0.4 * df["velocity"]
        + 0.3 * (1 - df["decay_score"])
        + 0.3 * df["calendar_score"]
    )
    return df.sort_values("score", ascending=False).head(top_k)


def to_payload(df):
    return [
        {
            "name": row["trend_name"],
            "base": row["trend_base"],
            "score": round(row["score"], 3)
        }
        for _, row in df.iterrows()
    ]

# ======================================================
# MAIN LOGIC
# ======================================================

def generate_dashboard(niche="travel"):
    df = pd.read_csv(DATA_PATH)
    df["date"] = pd.to_datetime(df["date"]).dt.date

    df = df[df["date"] == date.today()]
    df = df[df["creator_niche"] == niche]

    top_trends = score_and_rank(df[df["trend_type"] != "music"], 10)
    top_audio  = score_and_rank(df[df["trend_type"] == "music"], 10)

    output = {
        "date": str(date.today()),
        "niche": niche,
        "top_trends": to_payload(top_trends),
        "top_audio": to_payload(top_audio)
    }

    with open(OUT_PATH, "w") as f:
        json.dump(output, f, indent=2)

    print("Dashboard JSON refreshed at:", OUT_PATH)


def main():
    if needs_refresh(OUT_PATH):
        generate_dashboard(niche="travel")
    else:
        print("Dashboard JSON is fresh. No update needed.")


if __name__ == "__main__":
    main()
