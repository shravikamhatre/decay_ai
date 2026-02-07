const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

export interface TrendSignals {
    velocity_pct: number;
    engagement_pct: number;
    appearance_pct: number;
    saturation_pct: number;
    novelty: number;
    decay_score: number;
}

export interface ContentItem {
    id: string;
    title: string;
    category: "good" | "okay" | "bad";
    date: string;
    score: number;
    signals: TrendSignals;
    type: "trend" | "music" | "declining";
}

export interface TrendData {
    name: string;
    base: string;
    score: number;
    signals: TrendSignals;
}

export interface TrendsResponse {
    success: boolean;
    niche: string;
    schedule: ContentItem[];
    raw: {
        trendsGood: TrendData[];
        trendsDeclining: TrendData[];
        musicGood: TrendData[];
        musicDeclining: TrendData[];
    };
}

/**
 * Fetch trending content for a niche
 */
export const getTrends = async (niche: string): Promise<TrendsResponse | null> => {
    try {
        const response = await fetch(`${API_BASE_URL}/trends/${niche}`);

        if (!response.ok) {
            console.error("Failed to fetch trends:", response.statusText);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error("Trends fetch error:", error);
        return null;
    }
};

/**
 * Get the best content to post today based on score
 */
export const getBestContentForToday = (schedule: ContentItem[]): ContentItem[] => {
    const today = new Date().toISOString().split("T")[0];
    return schedule
        .filter(item => item.date === today && item.category !== "bad")
        .sort((a, b) => b.score - a.score);
};

/**
 * Get content warnings (declining trends to avoid)
 */
export const getContentWarnings = (schedule: ContentItem[]): ContentItem[] => {
    return schedule.filter(item => item.type === "declining");
};

/**
 * Calculate urgency based on decay score
 * Higher decay = more urgent to post now
 */
export const getUrgencyLabel = (decayScore: number): string => {
    if (decayScore > 0.8) return "🔥 Post ASAP";
    if (decayScore > 0.5) return "⏰ This week";
    if (decayScore > 0.2) return "📅 Can wait";
    return "🐢 Low priority";
};

/**
 * Available niches
 */
export const AVAILABLE_NICHES = [
    "Food",
    "Fashion",
    "Tech",
    "Gaming",
    "Fitness",
    "Travel",
    "Music",
    "Education",
    "Entertainment",
    "Finance",
    "Lifestyle"
];
