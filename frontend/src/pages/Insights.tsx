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
  { name: "Engagement Analysis", icon: PieChart, count: 5 },
  { name: "Growth Hacks", icon: TrendingUp, count: 3 },
  { name: "Shadowban Alerts", icon: Shield, count: 2 },
  { name: "Trending Now", icon: Zap, count: 4 },
];

const Insights = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card p-6 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/20 animate-pulse-glow">
              <Sparkles className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Trend Insights</h2>
              <p className="text-muted-foreground">
                Personalized strategies powered by AI trend analysis
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-muted-foreground">Last updated:</span>
            <span className="text-foreground font-medium">Just now</span>
            <span className="flex h-2 w-2 rounded-full bg-success animate-pulse" />
          </div>
        </div>
      </motion.div>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {categories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className="glass-card p-4 hover-lift cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <category.icon className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                {category.count} new
              </span>
            </div>
            <p className="text-sm font-medium text-foreground">{category.name}</p>
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
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            className={cn(
              "glass-card p-6 border-l-4 hover-lift cursor-pointer",
              insight.type === "opportunity" && "border-l-primary",
              insight.type === "warning" && "border-l-yellow-500",
              insight.type === "success" && "border-l-success",
              insight.type === "prediction" && "border-l-blue-500"
            )}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-xl",
                    insight.type === "opportunity" && "bg-primary/20 text-primary",
                    insight.type === "warning" && "bg-yellow-500/20 text-yellow-500",
                    insight.type === "success" && "bg-success/20 text-success",
                    insight.type === "prediction" && "bg-blue-500/20 text-blue-500"
                  )}
                >
                  <insight.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{insight.title}</h3>
                  <span
                    className={cn(
                      "text-xs font-medium uppercase",
                      insight.priority === "high" && "text-destructive",
                      insight.priority === "medium" && "text-primary",
                      insight.priority === "low" && "text-muted-foreground"
                    )}
                  >
                    {insight.priority} priority
                  </span>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-4">{insight.description}</p>

            <div className="flex items-center justify-between">
              <span
                className={cn(
                  "text-sm font-semibold",
                  insight.impact.startsWith("+") && "text-success",
                  insight.impact.startsWith("-") && "text-destructive",
                  !insight.impact.startsWith("+") &&
                  !insight.impact.startsWith("-") &&
                  "text-primary"
                )}
              >
                {insight.impact}
              </span>
              <button className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
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
          transition={{ duration: 0.5, delay: 0.5 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="h-5 w-5 text-success" />
            <h3 className="font-semibold text-foreground">Potential Reach</h3>
          </div>
          <p className="text-3xl font-bold text-success mb-2">+450k</p>
          <p className="text-sm text-muted-foreground">
            Following all AI recommendations could boost your reach by this amount
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">Account Health</h3>
          </div>
          <p className="text-3xl font-bold text-primary mb-2">98/100</p>
          <p className="text-sm text-muted-foreground">
            Your account has a healthy standing. No shadowban risks detected.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Target className="h-5 w-5 text-blue-500" />
            <h3 className="font-semibold text-foreground">Content Quota</h3>
          </div>
          <p className="text-3xl font-bold text-foreground mb-2">12/15</p>
          <p className="text-sm text-muted-foreground">
            You're on track with your content posting schedule this week
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Insights;
