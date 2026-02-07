import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

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
    color: "bg-pink-500",
  },
  {
    id: 3,
    name: "YouTube",
    symbol: "YT",
    amount: "250k Subscribers",
    value: 250000,
    change: 1.23,
    allocation: 15,
    color: "bg-red-500",
  },
  {
    id: 4,
    name: "Twitter/X",
    symbol: "X",
    amount: "120k Followers",
    value: 120000,
    change: 0.87,
    allocation: 10,
    color: "bg-blue-400",
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

const Portfolio = () => {
  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-foreground">Content Calendar</h2>
        <p className="text-muted-foreground">Track your content performance across platforms</p>
      </motion.div>

      {/* Performance Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {performanceMetrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className="glass-card p-5"
          >
            <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
            <p className="text-xl font-bold text-foreground">{metric.value}</p>
            <div
              className={cn(
                "flex items-center gap-1 mt-1 text-sm font-medium",
                metric.isPositive ? "text-success" : "text-destructive"
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
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-foreground">Audience Distribution</h3>
            <button className="text-muted-foreground hover:text-foreground">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>

          {/* Donut chart placeholder */}
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
                      asset.id === 2 && "stroke-pink-500",
                      asset.id === 3 && "stroke-red-500",
                      asset.id === 4 && "stroke-blue-400",
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
              <p className="text-2xl font-bold text-foreground">
                {(totalValue / 1000).toFixed(1)}k
              </p>
              <p className="text-xs text-muted-foreground">Total Reach</p>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-2">
            {assets.slice(0, 4).map((asset) => (
              <div key={asset.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={cn("h-3 w-3 rounded-full", asset.color)} />
                  <span className="text-sm text-muted-foreground">{asset.symbol}</span>
                </div>
                <span className="text-sm font-medium text-foreground">{asset.allocation}%</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Assets List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-2 glass-card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-foreground">Your Channels</h3>
            <button className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              View All
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-4">
            {assets.map((asset, index) => (
              <motion.div
                key={asset.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center text-white font-bold text-sm", asset.color)}>
                    {asset.symbol.slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{asset.name}</p>
                    <p className="text-sm text-muted-foreground">{asset.amount}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-medium text-foreground">
                    {asset.value.toLocaleString()}
                  </p>
                  <div
                    className={cn(
                      "flex items-center justify-end gap-1 text-sm",
                      asset.change > 0 ? "text-success" : "text-destructive"
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

                {/* Progress bar */}
                <div className="hidden md:block w-24">
                  <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                    <div
                      className={cn("h-full rounded-full transition-all", asset.color)}
                      style={{ width: `${asset.allocation}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 text-right">
                    {asset.allocation}%
                  </p>
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
        transition={{ duration: 0.5, delay: 0.4 }}
        className="glass-card p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-foreground">Performance History</h3>
          <div className="flex gap-2">
            {["1W", "1M", "3M", "1Y", "All"].map((period, index) => (
              <button
                key={period}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium rounded-lg transition-colors",
                  index === 2
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary/50 text-muted-foreground hover:text-foreground"
                )}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        {/* Chart placeholder */}
        <div className="h-48">
          <svg className="w-full h-full" viewBox="0 0 800 192" preserveAspectRatio="none">
            {[0, 1, 2, 3].map((i) => (
              <line
                key={i}
                x1="0"
                y1={i * 64}
                x2="800"
                y2={i * 64}
                className="chart-grid"
                strokeWidth="1"
              />
            ))}

            <defs>
              <linearGradient id="portfolioGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(152 60% 52%)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="hsl(152 60% 52%)" stopOpacity="0" />
              </linearGradient>
            </defs>

            <path
              d="M0,160 Q100,140 200,100 T400,80 T600,50 T800,30 L800,192 L0,192 Z"
              fill="url(#portfolioGradient)"
            />

            <path
              d="M0,160 Q100,140 200,100 T400,80 T600,50 T800,30"
              fill="none"
              stroke="hsl(152 60% 52%)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </motion.div>
    </div>
  );
};

export default Portfolio;
