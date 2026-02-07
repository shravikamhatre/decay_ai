import os
import pandas as pd
import numpy as np

# ======================================================
# PATHS
# ======================================================

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")

INPUT_FILE = os.path.join(DATA_DIR, "content_calendar_history.csv")
OUTPUT_FILE = os.path.join(DATA_DIR, "trend_training_table.csv")

# ======================================================
# CONFIG
# ======================================================

ROLLING_WINDOWS = [3, 7, 14]
PREDICTION_HORIZON = 5

# ======================================================
# LOAD & PREP
# ======================================================

df = pd.read_csv(INPUT_FILE, parse_dates=["date"])
df = df.sort_values(["trend_id", "date"]).reset_index(drop=True)

# Encode calendar color numerically (for label)
CALENDAR_MAP = {"red": 0, "yellow": 1, "green": 2}
df["calendar_color_num"] = df["calendar_color"].map(CALENDAR_MAP)

# ======================================================
# FEATURE ENGINEERING
# ======================================================

features = []

for trend_id, g in df.groupby("trend_id"):
    g = g.copy()

    # Rolling velocity means
    for w in ROLLING_WINDOWS:
        g[f"velocity_mean_{w}d"] = g["velocity"].rolling(w).mean()

    # Engagement momentum
    g["engagement_sum_7d"] = g["engagement_sum"].rolling(7).sum()
    g["engagement_mean_7d"] = g["engagement_sum"].rolling(7).mean()

    # Appearance growth
    g["appearance_growth_7d"] = (
        g["appearance_count"]
        .rolling(7)
        .apply(lambda x: x.iloc[-1] - x.iloc[0], raw=False)
    )

    # Saturation delta
    g["saturation_delta_7d"] = (
        g["saturation"] - g["saturation"].shift(7)
    )

    # Calendar score volatility
    g["calendar_volatility_7d"] = (
        g["calendar_score"].rolling(7).std()
    )

    # Velocity slope (trend strength)
    g["velocity_slope_14d"] = (
        g["velocity"]
        .rolling(14)
        .apply(
            lambda x: np.polyfit(range(len(x)), x, 1)[0]
            if len(x) == 14 else np.nan,
            raw=False
        )
    )

    features.append(g)

df_feat = pd.concat(features).reset_index(drop=True)

# ======================================================
# LABEL CREATION (NO LEAKAGE)
# ======================================================

df_feat["future_calendar_color"] = (
    df_feat
    .groupby("trend_id")["calendar_color_num"]
    .shift(-PREDICTION_HORIZON)
)

df_feat["target_trend_green_5d"] = (
    (df_feat["future_calendar_color"] == 2).astype(int)
)

# ======================================================
# CATEGORICAL ENCODING
# ======================================================

CATEGORICAL_COLS = ["trend_type", "creator_niche", "platform"]

df_feat = pd.get_dummies(
    df_feat,
    columns=CATEGORICAL_COLS,
    drop_first=True
)

# ======================================================
# FINAL CLEANUP
# ======================================================

DROP_COLS = [
    "trend_name",
    "trend_base",
    "calendar_color",
    "calendar_color_num",
    "future_calendar_color"
]

df_feat = df_feat.drop(columns=DROP_COLS)

df_feat = df_feat.dropna().reset_index(drop=True)

# ======================================================
# SAVE
# ======================================================

df_feat.to_csv(OUTPUT_FILE, index=False)

print("Feature table created:", df_feat.shape)
print("Saved to:", OUTPUT_FILE)
