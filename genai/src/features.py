import os
import pandas as pd
import numpy as np

# ======================================================
# PATHS
# ======================================================

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")

INPUT_FILE = os.path.join(DATA_DIR, "content_calendar_history.csv")

# ======================================================
# CONFIG
# ======================================================

ROLLING_WINDOWS = [3, 7, 14]
PREDICTION_HORIZON = 5

# ======================================================
# LOAD
# ======================================================

print("Loading:", INPUT_FILE)

df = pd.read_csv(INPUT_FILE, parse_dates=["date"])
df = df.sort_values(["trend_id", "date"]).reset_index(drop=True)

print("Rows loaded:", len(df))

# ======================================================
# CALENDAR COLOR → NUMERIC
# ======================================================

CALENDAR_MAP = {"red": 0, "yellow": 1, "green": 2}
df["calendar_color_num"] = df["calendar_color"].map(CALENDAR_MAP)

# ======================================================
# FEATURE ENGINEERING (PER TREND)
# ======================================================

out = []

for trend_id, g in df.groupby("trend_id", sort=False):
    g = g.copy()

    # Velocity rolling means
    for w in ROLLING_WINDOWS:
        g[f"velocity_mean_{w}d"] = g["velocity"].rolling(
            w, min_periods=1
        ).mean()

    # Engagement momentum
    g["engagement_sum_7d"] = g["engagement_sum"].rolling(
        7, min_periods=1
    ).sum()

    g["engagement_mean_7d"] = g["engagement_sum"].rolling(
        7, min_periods=1
    ).mean()

    # Appearance growth
    g["appearance_growth_7d"] = (
        g["appearance_count"]
        .rolling(7, min_periods=1)
        .apply(lambda x: x.iloc[-1] - x.iloc[0], raw=False)
    )

    # Saturation delta
    g["saturation_delta_7d"] = g["saturation"] - g["saturation"].shift(7)

    # Calendar score volatility
    g["calendar_volatility_7d"] = (
        g["calendar_score"].rolling(7, min_periods=2).std()
    )

    # Velocity slope (trend strength)
    g["velocity_slope_14d"] = (
        g["velocity"]
        .rolling(14, min_periods=5)
        .apply(
            lambda x: np.polyfit(range(len(x)), x, 1)[0],
            raw=False
        )
    )

    out.append(g)

df_feat = pd.concat(out).reset_index(drop=True)

print("Features added.")

# ======================================================
# LABEL (FUTURE, NO LEAKAGE)
# ======================================================

df_feat["future_calendar_color"] = (
    df_feat
    .groupby("trend_id")["calendar_color_num"]
    .shift(-PREDICTION_HORIZON)
)

df_feat["target_trend_green_5d"] = (
    (df_feat["future_calendar_color"] == 2).astype("Int64")
)

# ======================================================
# CLEANUP (KEEP ROWS, DO NOT DROP DATA)
# ======================================================

# We intentionally DO NOT drop rows.
# XGBoost filtering will happen at train time.

df_feat = df_feat.drop(columns=["future_calendar_color"])

# ======================================================
# SAVE BACK TO SAME FILE
# ======================================================

df_feat.to_csv(INPUT_FILE, index=False)

print("Updated file saved (in-place):", INPUT_FILE)
print("Total columns now:", len(df_feat.columns))
print("Sample feature columns:",
      [c for c in df_feat.columns if "velocity_mean" in c][:3])
print((df_feat.tail(10)))
