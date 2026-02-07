import { motion } from "framer-motion";
import {
  Sparkles,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  PieChart,
  Target,
  Shield,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const insights = [
  {
    id: 1,
    type: "opportunity",
    icon: Lightbulb,
    title: "Viral Opportunity",
    description:
      "Based on your niche, consider posting a 'Day in the Life' reel. Current trend data suggests potential 300% reach increase.",
    impact: "+15k views",
    priority: "high",
  },
  {
    id: 2,
    type: "warning",
    icon: AlertTriangle,
    title: "Engagement Drop",
    description:
      "Your story engagement decreased by 45% this week compared to your 3-month average. Consider adding interactive stickers.",
    impact: "-5% engagement",
    priority: "medium",
  },
  {
    id: 3,
    type: "success",
    icon: TrendingUp,
    title: "Follower Goal Progress",
    description:
      "Great job! You're on track to reach your 100k follower milestone 2 weeks ahead of schedule.",
    impact: "128% of target",
    priority: "low",
  },
  {
    id: 4,
    type: "prediction",
    icon: Target,
    title: "Reach Prediction",
    description:
      "Based on posting patterns, your next carousel is estimated to reach 18k-21k non-followers. Use trending audio to boost.",
    impact: "Reach up to 21k",
    priority: "medium",
  },
];

const categories = [
  { name: "Engagement Analysis", icon: PieChart, count: 5, color: "bg-waxy-lime" },
  { name: "Growth Hacks", icon: TrendingUp, count: 3, color: "bg-waxy-yellow" },
  { name: "Shadowban Alerts", icon: Shield, count: 2, color: "bg-waxy-pink" },
  { name: "Trending Now", icon: Zap, count: 4, color: "bg-waxy-blue" },
];

const Insights = () => {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <div className="px-6 md:px-12 pt-8 pb-6 border-b border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-airone text-4xl md:text-5xl font-bold lowercase tracking-tight">insights</h1>
            <p className="text-gray-500 mt-2">personalized strategies powered by AI</p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-gray-400">Last updated:</span>
            <span className="text-black font-medium">Just now</span>
            <span className="flex h-2 w-2 rounded-full bg-waxy-lime animate-pulse" />
          </div>
        </div>
      </div>

      <div className="px-6 md:px-12 py-8 space-y-8">
        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className={cn(
                "p-5 rounded-2xl cursor-pointer transition-transform hover:scale-[1.02] text-black",
                category.color
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/10">
                  <category.icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold bg-black/20 px-2 py-1 rounded-full">
                  {category.count} new
                </span>
              </div>
              <p className="text-sm font-bold lowercase">{category.name}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Insights Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {insights.map((insight, index) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              className={cn(
                "bg-gray-50 text-black p-6 rounded-2xl border-l-4 cursor-pointer transition-transform hover:scale-[1.01] border border-gray-100",
                insight.type === "opportunity" && "border-l-waxy-lime",
                insight.type === "warning" && "border-l-waxy-yellow",
                insight.type === "success" && "border-l-waxy-lime",
                insight.type === "prediction" && "border-l-waxy-blue"
              )}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-xl",
                      insight.type === "opportunity" && "bg-waxy-lime",
                      insight.type === "warning" && "bg-waxy-yellow",
                      insight.type === "success" && "bg-waxy-lime",
                      insight.type === "prediction" && "bg-waxy-blue"
                    )}
                  >
                    <insight.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-black">{insight.title}</h3>
                    <span
                      className={cn(
                        "text-xs font-bold uppercase",
                        insight.priority === "high" && "text-waxy-pink",
                        insight.priority === "medium" && "text-gray-500",
                        insight.priority === "low" && "text-gray-400"
                      )}
                    >
                      {insight.priority} priority
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4">{insight.description}</p>

              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    "text-sm font-bold",
                    insight.impact.startsWith("+") && "text-[#2DD881]",
                    insight.impact.startsWith("-") && "text-waxy-pink",
                    !insight.impact.startsWith("+") &&
                    !insight.impact.startsWith("-") &&
                    "text-black"
                  )}
                >
                  {insight.impact}
                </span>
                <button className="flex items-center gap-1 text-sm font-bold text-black hover:underline">
                  Take Action
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="bg-waxy-lime text-black p-6 rounded-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="h-5 w-5" />
              <h3 className="font-bold lowercase">potential reach</h3>
            </div>
            <p className="text-4xl font-airone font-bold mb-2">+450k</p>
            <p className="text-sm text-black/70">
              Following all AI recommendations could boost your reach by this amount
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="bg-waxy-yellow text-black p-6 rounded-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-5 w-5" />
              <h3 className="font-bold lowercase">account health</h3>
            </div>
            <p className="text-4xl font-airone font-bold mb-2">98/100</p>
            <p className="text-sm text-black/70">
              Your account has a healthy standing. No shadowban risks detected.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.7 }}
            className="bg-waxy-blue text-black p-6 rounded-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <Target className="h-5 w-5" />
              <h3 className="font-bold lowercase">content quota</h3>
            </div>
            <p className="text-4xl font-airone font-bold mb-2">12/15</p>
            <p className="text-sm text-black/70">
              You're on track with your content posting schedule this week
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
