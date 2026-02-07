import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, TrendingUp, TrendingDown, AlertTriangle, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
} from "recharts";
import { cn } from "@/lib/utils";

// Types
interface TrendData {
    rank: number;
    name: string;
    category: string;
    score: number;
    status: "rising" | "falling" | "stable";
    change: string;
    popularityData: { name: string; value: number }[];
    declineData: { name: string; value: number }[];
    reasoning: string;
}

// Mock Data Generator
const generateTrendData = (index: number): TrendData => {
    const names = [
        "Silent Reviews", "De-influencing", "Corecore edits", "Frutiger Aero", "Y2K Fashion",
        "Digital Camera", "Low exposure pics", "Photo dumps", "GRWM for...", "Asmr packaging",
        "Study with me", "Night luxe", "Old money aesthetic", "Clean girl makeup", "Glazed donut skin",
        "Cloud bread", "Feta pasta", "Butter boards", "Tinned fish date", "Girl dinner",
        "Rat snacking", "Beige flags", "Roman Empire", "Tube girl", "Wes Anderson style",
        "Canon G7X", "Dyson Airwrap", "Stanley Cup", "Owala bottle", "Sambas",
        "Gazelles", "Onitsuka Tiger", "Bag charm", "Ribbons everywhere", "Coquette aesthetic",
        "Mob wife aesthetic", "Eclectic grandpa", "Loud budgeting", "Doom scrolling", "Monk mode",
        "Dopamine menu", "Sunday reset", "Everything shower", "Bed rotting", "Hot girl walk",
        "Silly little walk", "Girl math", "Boy math", "Can we go to the...", "I'm just a girl"
    ];

    const categories = ["Lifestyle", "Tech", "Fashion", "Food", "Beauty"];
    const status = index < 15 ? "rising" : index < 35 ? "stable" : "falling";

    // Randomized graph data based on status
    const baseValue = 1000 + Math.random() * 2000;
    const popularityData = Array.from({ length: 7 }, (_, i) => ({
        name: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i],
        value: status === "rising"
            ? baseValue + (i * 500) + Math.random() * 200
            : status === "falling"
                ? baseValue - (i * 300) + Math.random() * 200
                : baseValue + Math.random() * 500
    }));

    const declineData = Array.from({ length: 6 }, (_, i) => ({
        name: `Week ${i + 1}`,
        value: status === "falling"
            ? 100 - (i * 15)
            : status === "rising"
                ? 20 + (i * 10)
                : 50 + (Math.random() * 10 - 5)
    }));

    const reasoning = status === "falling"
        ? "Analysis detects distinct audience fatigue. Engagement metrics have dropped 45% week-over-week as saturation hits peak levels."
        : status === "rising"
            ? "Strong upward momentum driven by cross-platform adoption. Early adopters are transitioning to mass market phase."
            : "Trend has reached maturity. View counts are stable but engagement ratios are normalizing.";

    return {
        rank: index + 1,
        name: names[index % names.length],
        category: categories[index % categories.length],
        score: 98 - index,
        status: status as "rising" | "falling" | "stable",
        change: index < 15 ? "+12%" : index < 35 ? "+2%" : "-8%",
        popularityData,
        declineData,
        reasoning
    };
};

const topTrends = Array.from({ length: 50 }, (_, i) => generateTrendData(i));

const TrendAnalysis = () => {
    const [selectedTrend, setSelectedTrend] = useState<TrendData>(topTrends[0]);

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-waxy-lime selection:text-black">
            {/* Header */}
            <div className="px-6 md:px-12 pt-8 pb-6 border-b border-zinc-800 flex items-center gap-4">
                <Link to="/dashboard">
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-zinc-800 text-white">
                        <ArrowLeft className="h-6 w-6" />
                    </Button>
                </Link>
                <div>
                    <h1 className="font-airone text-4xl md:text-5xl font-bold lowercase tracking-tight">trend analysis</h1>
                    <p className="text-zinc-400 mt-1">deep dive into what's hot and what's not</p>
                </div>
            </div>

            <div className="px-6 md:px-12 py-8 space-y-8">

                {/* Graphs Section - Dynamic based on selected trend */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Popularity Graph */}
                    <motion.div
                        key={`pop-${selectedTrend.name}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex flex-col">
                                <h3 className="font-airone text-2xl font-bold lowercase flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-waxy-blue" />
                                    Popularity: {selectedTrend.name}
                                </h3>
                                <span className="text-xs text-zinc-400 mt-1">7 Day Engagement Volume</span>
                            </div>
                            <span className={cn(
                                "px-3 py-1 rounded-full text-xs font-bold border",
                                selectedTrend.status === "rising" ? "bg-waxy-lime border-black text-black" :
                                    selectedTrend.status === "falling" ? "bg-red-900/30 border-red-800 text-red-400" :
                                        "bg-zinc-800 border-zinc-700 text-zinc-400"
                            )}>
                                {selectedTrend.status === "rising" ? "Rising" :
                                    selectedTrend.status === "falling" ? "Critical" : "Stable"}
                            </span>
                        </div>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={selectedTrend.popularityData}>
                                    <defs>
                                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#5227FF" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#5227FF" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#3f3f46" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#a1a1aa', fontSize: 12 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#a1a1aa', fontSize: 12 }} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '12px', color: '#fff' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    <Area type="monotone" dataKey="value" stroke="#5227FF" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* Decline Graph with Reasoning */}
                    <motion.div
                        key={`dec-${selectedTrend.name}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex flex-col">
                                <h3 className="font-airone text-2xl font-bold lowercase flex items-center gap-2">
                                    <TrendingDown className="w-5 h-5 text-waxy-pink" />
                                    Decline Analysis
                                </h3>
                                <span className="text-xs text-zinc-400 mt-1">6 Week Retention Rate</span>
                            </div>
                            {selectedTrend.status === "falling" && (
                                <span className="bg-red-900/30 px-3 py-1 rounded-full text-xs font-bold border border-red-800 text-red-400 animate-pulse">
                                    Action Needed
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col h-full">
                            <div className="h-[200px] w-full mb-6">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={selectedTrend.declineData}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#3f3f46" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#a1a1aa', fontSize: 12 }} dy={10} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '12px', color: '#fff' }}
                                            itemStyle={{ color: '#fff' }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="value"
                                            stroke={selectedTrend.status === "falling" ? "#DC2626" : "#10B981"}
                                            strokeWidth={3}
                                            dot={{ r: 4, fill: selectedTrend.status === "falling" ? "#DC2626" : "#10B981" }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="bg-black p-4 rounded-2xl border border-zinc-800 flex gap-3">
                                <div className={cn(
                                    "p-2 rounded-full h-fit flex-shrink-0 text-black",
                                    selectedTrend.status === "falling" ? "bg-red-400 text-black" : "bg-waxy-lime text-black"
                                )}>
                                    <AlertTriangle className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm uppercase tracking-wider text-zinc-500 mb-1">AI Reasoning</h4>
                                    <p className="font-medium text-zinc-200 text-sm leading-relaxed">
                                        {selectedTrend.reasoning}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>

                {/* Top 50 List - Clickable */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h2 className="font-airone text-3xl font-bold lowercase mb-6">Top 50 Trending Now</h2>
                    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-black/20 border-b border-zinc-800">
                                    <tr>
                                        <th className="p-6 font-bold text-zinc-500 text-sm uppercase tracking-wider">Rank</th>
                                        <th className="p-6 font-bold text-zinc-500 text-sm uppercase tracking-wider">Trend</th>
                                        <th className="p-6 font-bold text-zinc-500 text-sm uppercase tracking-wider">Category</th>
                                        <th className="p-6 font-bold text-zinc-500 text-sm uppercase tracking-wider">Score</th>
                                        <th className="p-6 font-bold text-zinc-500 text-sm uppercase tracking-wider">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-800">
                                    {topTrends.map((trend) => (
                                        <tr
                                            key={trend.rank}
                                            onClick={() => setSelectedTrend(trend)}
                                            className={cn(
                                                "transition-all cursor-pointer",
                                                selectedTrend.rank === trend.rank ? "bg-zinc-800" : "hover:bg-zinc-800/50",
                                            )}
                                        >
                                            <td className="p-6 font-black text-xl font-airone text-zinc-300">{String(trend.rank).padStart(2, '0')}</td>
                                            <td className="p-6 font-bold text-lg text-white">{trend.name}</td>
                                            <td className="p-6">
                                                <span className="bg-zinc-800 px-3 py-1 rounded-full text-xs font-bold text-zinc-300 border border-zinc-700">
                                                    {trend.category}
                                                </span>
                                            </td>
                                            <td className="p-6 font-bold text-zinc-300">{trend.score}</td>
                                            <td className="p-6">
                                                <div className={`flex items-center gap-2 font-bold text-sm ${trend.status === 'rising' ? 'text-green-400' :
                                                    trend.status === 'falling' ? 'text-red-400' : 'text-zinc-500'
                                                    }`}>
                                                    {trend.status === 'rising' && <TrendingUp className="w-4 h-4" />}
                                                    {trend.status === 'falling' && <TrendingDown className="w-4 h-4" />}
                                                    <span className="capitalize">{trend.status}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

export default TrendAnalysis;
