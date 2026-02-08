import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    TrendingUp,
    Flame,
    Minus,
    CheckCircle2,
    XCircle,
    Info,
    Users,
    Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Types
interface NicheBreakdown {
    niche: string;
    successRate: number;
}

interface Trend {
    id: string;
    name: string;
    description: string;
    momentum: "rising" | "hot" | "stable";
    category: string;
    totalOptIns: number;
    nicheBreakdown: NicheBreakdown[];
}

// Hard-coded 2024-2025 trends data
const trendsData: Trend[] = [
    {
        id: "1",
        name: "Silent Reviews",
        description: "Reviewing products without speaking—using text overlays and ambient sounds instead",
        momentum: "hot",
        category: "Reviews",
        totalOptIns: 12400,
        nicheBreakdown: [
            { niche: "Tech", successRate: 84 },
            { niche: "Beauty", successRate: 78 },
            { niche: "Lifestyle", successRate: 71 },
        ],
    },
    {
        id: "2",
        name: "De-influencing",
        description: "Telling audiences what NOT to buy—building trust through honest anti-recommendations",
        momentum: "rising",
        category: "Authenticity",
        totalOptIns: 8900,
        nicheBreakdown: [
            { niche: "Beauty", successRate: 89 },
            { niche: "Fashion", successRate: 82 },
            { niche: "Tech", successRate: 65 },
        ],
    },
    {
        id: "3",
        name: "POV Storytelling",
        description: "First-person narrative reels where viewers experience scenarios from your perspective",
        momentum: "hot",
        category: "Narrative",
        totalOptIns: 15200,
        nicheBreakdown: [
            { niche: "Entertainment", successRate: 91 },
            { niche: "Lifestyle", successRate: 85 },
            { niche: "Comedy", successRate: 88 },
        ],
    },
    {
        id: "4",
        name: "GRWM Mashups",
        description: "Get Ready With Me combined with storytimes, hot takes, or educational content",
        momentum: "stable",
        category: "Lifestyle",
        totalOptIns: 22100,
        nicheBreakdown: [
            { niche: "Beauty", successRate: 92 },
            { niche: "Fashion", successRate: 86 },
            { niche: "Lifestyle", successRate: 79 },
        ],
    },
    {
        id: "5",
        name: "Corecore Edits",
        description: "Abstract, emotional video collages that evoke feelings without explicit narrative",
        momentum: "stable",
        category: "Art",
        totalOptIns: 6700,
        nicheBreakdown: [
            { niche: "Art", successRate: 76 },
            { niche: "Music", successRate: 72 },
            { niche: "Philosophy", successRate: 68 },
        ],
    },
    {
        id: "6",
        name: "Day in My Life",
        description: "Authentic daily vlogs showing real routines without over-production",
        momentum: "stable",
        category: "Vlog",
        totalOptIns: 31500,
        nicheBreakdown: [
            { niche: "Lifestyle", successRate: 88 },
            { niche: "Fitness", successRate: 82 },
            { niche: "Parenting", successRate: 79 },
        ],
    },
    {
        id: "7",
        name: "Micro-tutorials",
        description: "Ultra-short (15-30 sec) tutorials teaching one specific skill or hack",
        momentum: "rising",
        category: "Educational",
        totalOptIns: 18300,
        nicheBreakdown: [
            { niche: "Tech", successRate: 94 },
            { niche: "DIY", successRate: 91 },
            { niche: "Cooking", successRate: 87 },
        ],
    },
    {
        id: "8",
        name: "Behind the Scenes",
        description: "Raw, unpolished content showing the process behind your main content",
        momentum: "rising",
        category: "Authenticity",
        totalOptIns: 14600,
        nicheBreakdown: [
            { niche: "Business", successRate: 86 },
            { niche: "Art", successRate: 84 },
            { niche: "Music", successRate: 81 },
        ],
    },
    {
        id: "9",
        name: "Aesthetic Transitions",
        description: "Smooth, visually satisfying transitions between scenes using match cuts",
        momentum: "stable",
        category: "Editing",
        totalOptIns: 9800,
        nicheBreakdown: [
            { niche: "Fashion", successRate: 88 },
            { niche: "Travel", successRate: 85 },
            { niche: "Beauty", successRate: 82 },
        ],
    },
    {
        id: "10",
        name: "Duet Reactions",
        description: "Adding your perspective or reaction alongside existing viral content",
        momentum: "stable",
        category: "Engagement",
        totalOptIns: 27400,
        nicheBreakdown: [
            { niche: "Comedy", successRate: 89 },
            { niche: "Entertainment", successRate: 84 },
            { niche: "Music", successRate: 78 },
        ],
    },
    {
        id: "11",
        name: "Soft Life Aesthetic",
        description: "Calm, luxurious content promoting rest, self-care, and gentle living",
        momentum: "rising",
        category: "Lifestyle",
        totalOptIns: 11200,
        nicheBreakdown: [
            { niche: "Lifestyle", successRate: 91 },
            { niche: "Wellness", successRate: 88 },
            { niche: "Beauty", successRate: 83 },
        ],
    },
    {
        id: "12",
        name: "Unhinged Marketing",
        description: "Brands and creators embracing chaotic, self-aware, meme-like humor",
        momentum: "hot",
        category: "Marketing",
        totalOptIns: 7800,
        nicheBreakdown: [
            { niche: "Marketing", successRate: 86 },
            { niche: "Comedy", successRate: 82 },
            { niche: "Business", successRate: 71 },
        ],
    },
];

// Momentum badge component
const MomentumBadge = ({ momentum }: { momentum: Trend["momentum"] }) => {
    const config = {
        rising: {
            icon: TrendingUp,
            label: "Rising",
            className: "bg-waxy-blue/20 text-waxy-blue border-waxy-blue/30"
        },
        hot: {
            icon: Flame,
            label: "Hot",
            className: "bg-waxy-terracotta/20 text-waxy-terracotta border-waxy-terracotta/30"
        },
        stable: {
            icon: Minus,
            label: "Stable",
            className: "bg-zinc-800 text-zinc-400 border-zinc-700"
        },
    };

    const { icon: Icon, label, className } = config[momentum];

    return (
        <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border", className)}>
            <Icon className="w-3 h-3" />
            {label}
        </span>
    );
};

// Niche effectiveness bar
const NicheBar = ({ niche, successRate }: NicheBreakdown) => (
    <div className="flex items-center gap-3">
        <span className="text-xs text-zinc-500 w-20 truncate">{niche}</span>
        <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${successRate}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={cn(
                    "h-full rounded-full",
                    successRate >= 80 ? "bg-waxy-lime" : successRate >= 60 ? "bg-waxy-blue" : "bg-zinc-600"
                )}
            />
        </div>
        <span className="text-xs font-bold text-zinc-400 w-10 text-right">{successRate}%</span>
    </div>
);

// Trend card component
const TrendCard = ({ trend }: { trend: Trend }) => {
    const [status, setStatus] = useState<"none" | "opted-in" | "opted-out">("none");

    const handleOptIn = () => {
        setStatus("opted-in");
        toast.success(`Opted in to "${trend.name}"`, {
            description: "Your feedback helps personalize recommendations for you and others.",
        });
    };

    const handleOptOut = () => {
        setStatus("opted-out");
        toast("Opted out of " + trend.name, {
            description: "This trend won't be prioritized for you. You can always change your mind.",
        });
    };

    const handleReset = () => {
        setStatus("none");
        toast("Preference cleared", {
            description: "You can opt in or out again anytime.",
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={cn(
                "bg-zinc-900 rounded-3xl p-6 border transition-all duration-300",
                status === "opted-in"
                    ? "border-waxy-lime/40 shadow-[0_0_30px_rgba(132,204,22,0.1)]"
                    : status === "opted-out"
                        ? "border-zinc-700 opacity-60"
                        : "border-zinc-800 hover:border-zinc-700"
            )}
        >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-lg text-white truncate">{trend.name}</h3>
                        <MomentumBadge momentum={trend.momentum} />
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed">{trend.description}</p>
                </div>
            </div>

            {/* Category tag */}
            <div className="mb-4">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-zinc-800 text-zinc-400 border border-zinc-700">
                    {trend.category}
                </span>
            </div>

            {/* Niche effectiveness */}
            <div className="mb-5">
                <div className="flex items-center gap-2 mb-3">
                    <Users className="w-4 h-4 text-zinc-500" />
                    <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Works for</span>
                </div>
                <div className="space-y-2">
                    {trend.nicheBreakdown.map((niche) => (
                        <NicheBar key={niche.niche} {...niche} />
                    ))}
                </div>
            </div>

            {/* Opt-in count */}
            <div className="flex items-center gap-2 mb-5 text-zinc-500">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs">
                    <span className="font-bold text-zinc-300">{trend.totalOptIns.toLocaleString()}</span> creators tried this
                </span>
            </div>

            {/* Action buttons */}
            <AnimatePresence mode="wait">
                {status === "none" ? (
                    <motion.div
                        key="buttons"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex gap-3"
                    >
                        <Button
                            onClick={handleOptIn}
                            className="flex-1 bg-waxy-lime text-black hover:bg-waxy-lime/90 rounded-full font-bold h-11"
                        >
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Opt In
                        </Button>
                        <Button
                            onClick={handleOptOut}
                            variant="outline"
                            className="flex-1 border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full font-bold h-11"
                        >
                            <XCircle className="w-4 h-4 mr-2" />
                            Opt Out
                        </Button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="status"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-between"
                    >
                        <div className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold",
                            status === "opted-in"
                                ? "bg-waxy-lime/20 text-waxy-lime"
                                : "bg-zinc-800 text-zinc-400"
                        )}>
                            {status === "opted-in" ? (
                                <>
                                    <CheckCircle2 className="w-4 h-4" />
                                    Opted In
                                </>
                            ) : (
                                <>
                                    <XCircle className="w-4 h-4" />
                                    Opted Out
                                </>
                            )}
                        </div>
                        <Button
                            onClick={handleReset}
                            variant="ghost"
                            size="sm"
                            className="text-zinc-500 hover:text-white"
                        >
                            Undo
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const HypeMeter = () => {
    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <div className="px-6 md:px-12 pt-8 pb-6 border-b border-zinc-800">
                <h1 className="font-airone text-4xl md:text-5xl font-bold lowercase tracking-tight">
                    hypemeter
                </h1>
                <p className="text-zinc-400 mt-2 max-w-2xl">
                    explore what's working for creators like you. opt in to try a trend, or opt out if it didn't work—your feedback shapes recommendations for everyone.
                </p>
            </div>

            {/* Info banner */}
            <div className="px-6 md:px-12 py-4">
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 flex items-start gap-3">
                    <div className="p-2 bg-waxy-blue/20 rounded-full">
                        <Info className="w-4 h-4 text-waxy-blue" />
                    </div>
                    <div>
                        <p className="text-sm text-zinc-300 font-medium">Your choices improve the platform</p>
                        <p className="text-xs text-zinc-500 mt-1">
                            When you opt in or out, your anonymized feedback helps us show which trends work for specific niches and content formats. No personal data is shared.
                        </p>
                    </div>
                </div>
            </div>

            {/* Trends grid */}
            <div className="px-6 md:px-12 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {trendsData.map((trend, index) => (
                        <motion.div
                            key={trend.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                        >
                            <TrendCard trend={trend} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HypeMeter;
