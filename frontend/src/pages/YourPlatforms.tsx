import { useState } from "react";
import { motion } from "framer-motion";
import {
    Search,
    Filter,
    ChevronDown,
    ArrowUpRight,
    Download,
    TrendingUp,
    TrendingDown,
    MoreHorizontal,
    ChevronRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// --- Portfolio Data & Components ---
const assets = [
    {
        id: 1,
        name: "TikTok",
        symbol: "TT",
        amount: "850k Followers",
        value: 850000,
        change: 5.42,
        allocation: 45,
        color: "bg-black",
    },
    {
        id: 2,
        name: "Instagram",
        symbol: "IG",
        amount: "420k Followers",
        value: 420000,
        change: -2.18,
        allocation: 25,
        color: "bg-waxy-pink",
    },
    {
        id: 3,
        name: "YouTube",
        symbol: "YT",
        amount: "250k Subscribers",
        value: 250000,
        change: 1.23,
        allocation: 15,
        color: "bg-waxy-terracotta",
    },
    {
        id: 4,
        name: "Twitter/X",
        symbol: "X",
        amount: "120k Followers",
        value: 120000,
        change: 0.87,
        allocation: 10,
        color: "bg-waxy-blue",
    },
    {
        id: 5,
        name: "LinkedIn",
        symbol: "LI",
        amount: "25k Connections",
        value: 25000,
        change: 0.32,
        allocation: 5,
        color: "bg-blue-700",
    },
];

const performanceMetrics = [
    { label: "Total Audience", value: "1.6M", change: "+45k", isPositive: true },
    { label: "New Followers", value: "+3.2k", change: "+2.12%", isPositive: true },
    { label: "Avg Engagement", value: "8.5%", change: "+0.4%", isPositive: true },
    { label: "Top Platform", value: "TikTok", change: "+5.4%", isPositive: true },
];

// --- Transactions Data & Components ---
const transactions = [
    { id: 1, name: "Summer Vibes Reel", category: "Lifestyle", amount: 12500, date: "Feb 3, 2026", status: "published", icon: "📹" },
    { id: 2, name: "Tech Review: iPhone 18", category: "Tech", amount: 45200, date: "Feb 3, 2026", status: "published", icon: "📱" },
    { id: 3, name: "Weekly OOTD", category: "Fashion", amount: 8500, date: "Feb 2, 2026", status: "published", icon: "👗" },
    { id: 4, name: "Morning Routine", category: "Wellness", amount: 1200, date: "Feb 2, 2026", status: "published", icon: "🧘" },
    { id: 5, name: "Viral Dance Challenge", category: "Dance", amount: 890000, date: "Feb 1, 2026", status: "published", icon: "💃" },
    { id: 6, name: "Q&A Session", category: "Community", amount: 0, date: "Feb 5, 2026", status: "scheduled", icon: "❓" },
    { id: 7, name: "Gym Workout", category: "Fitness", amount: 3200, date: "Jan 31, 2026", status: "published", icon: "🏋️" },
    { id: 8, name: "Brand Sponsorship", category: "Ad", amount: 15000, date: "Jan 30, 2026", status: "published", icon: "💼" },
];

const filters = ["All", "Published", "Scheduled", "Draft"];

const YourPlatforms = () => {
    const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);
    const [activeFilter, setActiveFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredTransactions = transactions.filter((tx) => {
        const matchesSearch = tx.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter =
            activeFilter === "All" ||
            (activeFilter === "Published" && tx.status === "published") ||
            (activeFilter === "Scheduled" && tx.status === "scheduled") ||
            (activeFilter === "Draft" && tx.status === "draft");
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="min-h-screen bg-white text-black">
            {/* Header */}
            <div className="px-6 md:px-12 pt-8 pb-6 border-b border-gray-100">
                <h1 className="font-airone text-4xl md:text-5xl font-bold lowercase tracking-tight">your platforms</h1>
                <p className="text-gray-500 mt-2">track performance and manage content</p>
            </div>

            <div className="px-6 md:px-12 py-8 space-y-8">
                {/* Performance Metrics */} 
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-4"
                >
                    {performanceMetrics.map((metric, index) => (
                        <motion.div
                            key={metric.label}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + index * 0.05 }}
                            className="bg-gray-50 border border-gray-100 rounded-2xl p-5"
                        >
                            <p className="text-sm text-gray-500 mb-1 lowercase font-medium">{metric.label}</p>
                            <p className="text-2xl font-airone font-bold">{metric.value}</p>
                            <div
                                className={cn(
                                    "flex items-center gap-1 mt-1 text-sm font-bold",
                                    metric.isPositive ? "text-[#2DD881]" : "text-waxy-pink"
                                )}
                            >
                                {metric.isPositive ? (
                                    <TrendingUp className="h-4 w-4" />
                                ) : (
                                    <TrendingDown className="h-4 w-4" />
                                )}
                                {metric.change}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Allocation Chart */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="bg-gray-50 border border-gray-100 rounded-2xl p-6"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-airone font-bold lowercase">audience distribution</h3>
                            <button className="text-gray-400 hover:text-black">
                                <MoreHorizontal className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Donut chart */}
                        <div className="relative w-48 h-48 mx-auto mb-6">
                            <svg viewBox="0 0 100 100" className="transform -rotate-90">
                                {assets.map((asset, index) => {
                                    const offset = assets
                                        .slice(0, index)
                                        .reduce((sum, a) => sum + a.allocation, 0);
                                    const circumference = 2 * Math.PI * 40;
                                    const strokeDasharray = `${(asset.allocation / 100) * circumference} ${circumference}`;
                                    const strokeDashoffset = -((offset / 100) * circumference);

                                    return (
                                        <circle
                                            key={asset.id}
                                            cx="50"
                                            cy="50"
                                            r="40"
                                            fill="none"
                                            strokeWidth="16"
                                            className={cn(
                                                asset.id === 1 && "stroke-black",
                                                asset.id === 2 && "stroke-[#FF4D9F]",
                                                asset.id === 3 && "stroke-[#C66B56]",
                                                asset.id === 4 && "stroke-[#7DD3F5]",
                                                asset.id === 5 && "stroke-blue-700"
                                            )}
                                            strokeDasharray={strokeDasharray}
                                            strokeDashoffset={strokeDashoffset}
                                            strokeLinecap="round"
                                        />
                                    );
                                })}
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <p className="text-2xl font-airone font-bold">
                                    {(totalValue / 1000).toFixed(0)}k
                                </p>
                                <p className="text-xs text-gray-500">Total Reach</p>
                            </div>
                        </div>

                        {/* Legend */}
                        <div className="space-y-2">
                            {assets.slice(0, 4).map((asset) => (
                                <div key={asset.id} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className={cn("h-3 w-3 rounded-full", asset.color)} />
                                        <span className="text-sm text-gray-500">{asset.symbol}</span>
                                    </div>
                                    <span className="text-sm font-bold">{asset.allocation}%</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Assets List */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        className="lg:col-span-2 bg-gray-50 border border-gray-100 rounded-2xl p-6"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-airone font-bold lowercase">your channels</h3>
                            <button className="flex items-center gap-1 text-sm font-bold text-gray-500 hover:text-black">
                                View All
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="space-y-3">
                            {assets.map((asset, index) => (
                                <motion.div
                                    key={asset.id}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + index * 0.05 }}
                                    className={cn(
                                        "flex items-center justify-between p-4 rounded-xl border-l-4 bg-white border border-gray-100 hover:bg-gray-50 transition-all cursor-pointer",
                                        asset.id === 1 && "border-l-black",
                                        asset.id === 2 && "border-l-[#FF4D9F]",
                                        asset.id === 3 && "border-l-[#C66B56]",
                                        asset.id === 4 && "border-l-[#7DD3F5]",
                                        asset.id === 5 && "border-l-blue-700"
                                    )}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center text-white font-bold text-sm", asset.color)}>
                                            {asset.symbol.slice(0, 2)}
                                        </div>
                                        <div>
                                            <p className="font-bold">{asset.name}</p>
                                            <p className="text-sm text-gray-500">{asset.amount}</p>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <p className="font-bold">{asset.value.toLocaleString()}</p>
                                        <div
                                            className={cn(
                                                "flex items-center justify-end gap-1 text-sm font-bold",
                                                asset.change > 0 ? "text-[#2DD881]" : "text-waxy-pink"
                                            )}
                                        >
                                            {asset.change > 0 ? (
                                                <ArrowUpRight className="h-3 w-3" />
                                            ) : (
                                                <TrendingDown className="h-3 w-3" />
                                            )}
                                            {asset.change > 0 ? "+" : ""}
                                            {asset.change}%
                                        </div>
                                    </div>

                                    <div className="hidden md:block w-24">
                                        <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden">
                                            <div
                                                className={cn("h-full rounded-full transition-all", asset.color)}
                                                style={{ width: `${asset.allocation}%` }}
                                            />
                                        </div>
                                        <p className="text-xs text-gray-400 mt-1 text-right">{asset.allocation}%</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Performance Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className="bg-waxy-lime text-black rounded-2xl p-6"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-airone font-bold lowercase">performance history</h3>
                        <div className="flex gap-2">
                            {["1W", "1M", "3M", "1Y", "All"].map((period, index) => (
                                <button
                                    key={period}
                                    className={cn(
                                        "px-3 py-1.5 text-xs font-bold rounded-full transition-colors",
                                        index === 2
                                            ? "bg-black text-white"
                                            : "bg-black/10 text-black/70 hover:bg-black/20"
                                    )}
                                >
                                    {period}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="h-48">
                        <svg className="w-full h-full" viewBox="0 0 800 192" preserveAspectRatio="none">
                            {[0, 1, 2, 3].map((i) => (
                                <line
                                    key={i}
                                    x1="0"
                                    y1={i * 64}
                                    x2="800"
                                    y2={i * 64}
                                    stroke="rgba(0,0,0,0.1)"
                                    strokeWidth="1"
                                />
                            ))}

                            <defs>
                                <linearGradient id="portfolioGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="rgba(0,0,0,0.2)" />
                                    <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                                </linearGradient>
                            </defs>

                            <path
                                d="M0,160 Q100,140 200,100 T400,80 T600,50 T800,30 L800,192 L0,192 Z"
                                fill="url(#portfolioGradient)"
                            />

                            <path
                                d="M0,160 Q100,140 200,100 T400,80 T600,50 T800,30"
                                fill="none"
                                stroke="black"
                                strokeWidth="3"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>
                </motion.div>

                <div className="border-t border-gray-100 pt-8">
                    {/* Content Schedule Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.5 }}
                        className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6"
                    >
                        <h2 className="font-airone text-2xl font-bold lowercase">content schedule</h2>
                        <Button className="bg-black text-white hover:bg-gray-800 rounded-full font-bold gap-2">
                            <Download className="h-4 w-4" />
                            Export
                        </Button>
                    </motion.div>

                    {/* Filters & Search */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.6 }}
                        className="flex flex-col md:flex-row gap-4 mb-6"
                    >
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <Input
                                placeholder="Search posts..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 bg-gray-50 border-gray-100 text-black placeholder:text-gray-400 focus:border-black focus:ring-black rounded-xl"
                            />
                        </div>

                        <div className="flex gap-2">
                            {filters.map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={cn(
                                        "px-4 py-2 text-sm font-bold rounded-full transition-colors",
                                        activeFilter === filter
                                            ? "bg-black text-white"
                                            : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-black"
                                    )}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>

                        <Button variant="outline" className="gap-2 border-gray-200 text-gray-600 hover:bg-gray-50 rounded-full">
                            <Filter className="h-4 w-4" />
                            More Filters
                            <ChevronDown className="h-4 w-4" />
                        </Button>
                    </motion.div>

                    {/* Transactions Table */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.7 }}
                        className="bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden"
                    >
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-100">
                                        <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider px-6 py-4">Content</th>
                                        <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider px-6 py-4">Category</th>
                                        <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider px-6 py-4">Date</th>
                                        <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider px-6 py-4">Status</th>
                                        <th className="text-right text-xs font-bold text-gray-400 uppercase tracking-wider px-6 py-4">Engagement</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredTransactions.map((tx, index) => (
                                        <motion.tr
                                            key={tx.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.7 + index * 0.03 }}
                                            className="hover:bg-white transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-lg">
                                                        {tx.icon}
                                                    </div>
                                                    <span className="font-bold">{tx.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-gray-500">{tx.category}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-gray-500">{tx.date}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={cn(
                                                        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold",
                                                        tx.status === "published" && "bg-waxy-lime text-black",
                                                        tx.status === "scheduled" && "bg-waxy-yellow text-black",
                                                        tx.status === "draft" && "bg-gray-200 text-gray-600"
                                                    )}
                                                >
                                                    {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    {tx.amount > 10000 ? (
                                                        <ArrowUpRight className="h-4 w-4 text-[#2DD881]" />
                                                    ) : (
                                                        <TrendingDown className="h-4 w-4 text-gray-400" />
                                                    )}
                                                    <span
                                                        className={cn(
                                                            "font-bold",
                                                            tx.amount > 10000 ? "text-[#2DD881]" : "text-gray-600"
                                                        )}
                                                    >
                                                        {(tx.amount / 1000).toFixed(1)}k
                                                    </span>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
                            <p className="text-sm text-gray-500">
                                Showing {filteredTransactions.length} of {transactions.length} posts
                            </p>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="border-gray-200 rounded-full font-bold">Previous</Button>
                                <Button variant="outline" size="sm" className="border-gray-200 rounded-full font-bold">Next</Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default YourPlatforms;
