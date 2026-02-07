import os
import random
import math
import hashlib
import pandas as pd
from datetime import datetime, timedelta

# ======================================================
# PATHS (LOCKED & SAFE)
# ======================================================

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")
os.makedirs(DATA_DIR, exist_ok=True)

OUTPUT_FILE = os.path.join(DATA_DIR, "content_calendar_history.csv")

# ======================================================
# TIME CONFIG
# ======================================================

START_DATE = datetime(2015, 1, 1)
TODAY = datetime.utcnow().date()

# ======================================================
# CREATOR NICHES
# ======================================================

CREATOR_NICHES = [
    "travel", "fitness", "fashion", "tech", "food",
    "music", "lifestyle", "gaming", "education", "finance"
]

# ======================================================
# TREND UNIVERSE (REAL, COMPOSITIONAL)
# ======================================================

MUSIC_BASE = [
    "lush life", "espresso", "greedy", "calm down",
    "as it was", "anti hero", "blinding lights",
    "golden hour", "sunroof", "until i found you"
]

MUSIC_VARIANTS = [
    "remix", "sped up", "slowed", "lofi edit",
    "nightcore", "instrumental"
]

FORMAT_BASE = [
    "get ready with me", "day in my life", "photo dump",
    "routine reel", "faceless reel", "storytime",
    "before after"
]

FORMAT_CONTEXT = [
    "reel", "vlog", "shorts", "with captions", "voiceover"
]

AESTHETICS = [
    "clean girl", "quiet luxury", "soft life",
    "old money", "dark academia", "cozy minimal"
]

AESTHETIC_MODS = [
    "aesthetic", "vibe", "routine", "edit"
]

HOOK_START = [
    "things nobody tells you about",
    "i wish i knew this earlier",
    "stop scrolling if you",
    "this changed everything for me"
]

HOOK_END = [
    "as a creator",
    "in your 20s",
    "before traveling",
    "right now"
]

HASHTAG_BUNDLES = [
    "#reels #fyp #trending",
    "#contentcreator #creatorlife",
    "#facelesscontent #growth",
    "#dailyvlog #travelreels"
]

# ======================================================
# NICHE CONTEXT (KEY LOGIC)
# ======================================================

NICHE_CONTEXT = {
    "Travel": ["airport morning", "packing", "hotel day", "exploring a city", "sunrise travel"],
    "Fitness": ["leg day", "workout routine", "gym session", "meal prep"],
    "Fashion": ["outfit styling", "thrift haul", "wardrobe planning"],
    "Tech": ["workspace setup", "conference day", "coding session"],
    "Food": ["cooking", "recipe prep", "street food hunt"],
    "Music": ["studio day", "practice session", "recording session"],
    "Lifestyle": ["morning routine", "self care day"],
    "Gaming": ["stream setup", "grind session"],
    "Education": ["study session", "exam prep"],
    "Finance": ["workday routine", "budget planning"],
    "Entertainment":["memes","skits","brainrot","reaction"],
}

# ======================================================
# HELPERS
# ======================================================

def make_trend_id(name, niche):
    return hashlib.md5(f"{name}:{niche}".encode()).hexdigest()

def contextualize(base, niche):
    ctx = random.choice(NICHE_CONTEXT[niche])
    return f"{base} - {ctx}"

def generate_trend_universe():
    trends = []

    for m in MUSIC_BASE:
        for v in MUSIC_VARIANTS:
            trends.append(("music", f"{m} {v}"))

    for f in FORMAT_BASE:
        for c in FORMAT_CONTEXT:
            trends.append(("format", f"{f} {c}"))

    for a in AESTHETICS:
        for m in AESTHETIC_MODS:
            trends.append(("aesthetic", f"{a} {m}"))

    for h in HOOK_START:
        for e in HOOK_END:
            trends.append(("hook", f"{h} {e}"))

    for h in HASHTAG_BUNDLES:
        trends.append(("hashtag_bundle", h))

    return trends

TREND_UNIVERSE = generate_trend_universe()

# ======================================================
# SYNTHETIC HISTORY (10 YEARS)
# ======================================================

def generate_history():
    rows = []
    total_days = (TODAY - START_DATE.date()).days

    for d in range(total_days):
        current_date = START_DATE + timedelta(days=d)
        active = random.sample(TREND_UNIVERSE, k=random.randint(40, 120))

        for trend_type, base_name in active:
            niche = random.choice(CREATOR_NICHES)
            name = contextualize(base_name, niche)

            velocity = random.random()
            saturation = min(1.0, velocity + random.uniform(0, 0.25))
            decay = random.random()

            rows.append({
                "trend_id": make_trend_id(name, niche),
                "trend_name": name,
                "trend_base": base_name,
                "trend_type": trend_type,
                "creator_niche": niche,
                "platform": "instagram",
                "date": current_date.date(),

                "appearance_count": random.randint(1, 20),
                "engagement_sum": random.randint(50, 1200),
                "unique_sources": random.randint(1, 5),

                "velocity": velocity,
                "acceleration": random.uniform(-0.1, 0.1),
                "saturation": saturation,
                "novelty": 1 - saturation,
                "decay_score": decay,

                "calendar_score": max(0, velocity - decay),
                "calendar_color": (
                    "green" if velocity > 0.6 else
                    "yellow" if velocity > 0.35 else
                    "red"
                )
            })

    df = pd.DataFrame(rows)
    df.to_csv(OUTPUT_FILE, index=False)
    print("Synthetic history created:", df.shape)

# ======================================================
# DAILY APPEND (NO OVERWRITE)
# ======================================================

def append_today():
    df_old = pd.read_csv(OUTPUT_FILE)
    rows = []

    active = random.sample(TREND_UNIVERSE, k=random.randint(50, 100))
    for trend_type, base_name in active:
        niche = random.choice(CREATOR_NICHES)
        name = contextualize(base_name, niche)

        velocity = random.random()
        decay = random.random()

        rows.append({
            "trend_id": make_trend_id(name, niche),
            "trend_name": name,
            "trend_base": base_name,
            "trend_type": trend_type,
            "creator_niche": niche,
            "platform": "instagram",
            "date": TODAY,

            "appearance_count": random.randint(1, 15),
            "engagement_sum": random.randint(80, 1500),
            "unique_sources": random.randint(1, 4),

            "velocity": velocity,
            "acceleration": random.uniform(-0.1, 0.1),
            "saturation": min(1.0, velocity + random.uniform(0, 0.3)),
            "novelty": random.random(),
            "decay_score": decay,

            "calendar_score": max(0, velocity - decay),
            "calendar_color": (
                "green" if velocity > 0.6 else
                "yellow" if velocity > 0.35 else
                "red"
            )
        })

    df_new = pd.concat([df_old, pd.DataFrame(rows)], ignore_index=True)
    df_new.to_csv(OUTPUT_FILE, index=False)
    print("Appended today's data:", len(rows))

# ======================================================
# MAIN
# ======================================================

def run_ingest():
    if not os.path.exists(OUTPUT_FILE) or os.path.getsize(OUTPUT_FILE) == 0:
        print("Generating synthetic 10-year content calendar history...")
        generate_history()
    else:
        print("Appending today's content trends...")
        append_today()

if __name__ == "__main__":
    run_ingest()
