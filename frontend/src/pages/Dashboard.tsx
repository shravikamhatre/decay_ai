import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Eye,
  EyeOff,
  MoreHorizontal,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const recentTransactions = [
  {
    id: 1,
    name: "Netflix Subscription",
    category: "Entertainment",
    amount: -15.99,
    date: "Today",
    icon: "🎬",
  },
  {
    id: 2,
    name: "Salary Deposit",
    category: "Income",
    amount: 5420.0,
    date: "Today",
    icon: "💰",
  },
  {
    id: 3,
    name: "Grocery Store",
    category: "Shopping",
    amount: -128.45,
    date: "Yesterday",
    icon: "🛒",
  },
  {
    id: 4,
    name: "Uber Ride",
    category: "Transport",
    amount: -24.5,
    date: "Yesterday",
    icon: "🚗",
  },
  {
    id: 5,
    name: "Investment Return",
    category: "Investment",
    amount: 892.3,
    date: "Feb 1",
    icon: "📈",
  },
];

const quickStats = [
  { label: "Income", value: "$12,420", change: "+12.5%", isPositive: true },
  { label: "Expenses", value: "$3,280", change: "-8.2%", isPositive: true },
  { label: "Savings", value: "$9,140", change: "+24.3%", isPositive: true },
];

const Dashboard = () => {
  const [showBalance, setShowBalance] = useState(true);

  return (
    <div className="space-y-6">
      {/* Welcome & Balance Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2 glass-card p-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-muted-foreground text-sm">Total Balance</p>
                <div className="flex items-center gap-3 mt-1">
                  <h2 className="text-4xl font-bold text-foreground">
                    {showBalance ? "$34,280.56" : "••••••"}
                  </h2>
                  <button
                    onClick={() => setShowBalance(!showBalance)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showBalance ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-success/20 px-3 py-1.5">
                <TrendingUp className="h-4 w-4 text-success" />
                <span className="text-sm font-medium text-success">+18.2%</span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              {quickStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  className="rounded-xl bg-secondary/50 p-4"
                >
                  <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-lg font-semibold text-foreground">{stat.value}</p>
                  <div className={cn(
                    "flex items-center gap-1 mt-1 text-xs font-medium",
                    stat.isPositive ? "text-success" : "text-destructive"
                  )}>
                    {stat.isPositive ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    {stat.change}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* AI Insights Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">AI Insight</h3>
              <p className="text-xs text-muted-foreground">Updated just now</p>
            </div>
          </div>
          
          <p className="text-sm text-foreground mb-4">
            Your spending on dining increased by <span className="text-primary font-medium">23%</span> this month. 
            Consider setting a budget to save an extra <span className="text-success font-medium">$340</span>.
          </p>

          <div className="flex flex-wrap gap-2">
            <span className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary">Dining</span>
            <span className="text-xs px-3 py-1.5 rounded-full bg-secondary text-muted-foreground">Budget</span>
          </div>

          <button className="w-full mt-4 flex items-center justify-center gap-2 rounded-xl bg-primary/10 py-2.5 text-sm font-medium text-primary hover:bg-primary/20 transition-colors">
            View All Insights
            <ChevronRight className="h-4 w-4" />
          </button>
        </motion.div>
      </div>

      {/* Chart & Transactions */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chart Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2 glass-card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-foreground">Portfolio Performance</h3>
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

          {/* Chart visualization placeholder */}
          <div className="h-64 relative">
            <svg className="w-full h-full" viewBox="0 0 800 256" preserveAspectRatio="none">
              {/* Grid lines */}
              {[0, 1, 2, 3, 4].map((i) => (
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
              
              {/* Area gradient */}
              <defs>
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="hsl(43 96% 56%)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="hsl(43 96% 56%)" stopOpacity="0" />
                </linearGradient>
              </defs>
              
              {/* Area fill */}
              <path
                d="M0,200 Q100,180 200,120 T400,100 T600,80 T800,40 L800,256 L0,256 Z"
                fill="url(#areaGradient)"
              />
              
              {/* Line */}
              <path
                d="M0,200 Q100,180 200,120 T400,100 T600,80 T800,40"
                fill="none"
                stroke="hsl(43 96% 56%)"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-foreground">Recent Transactions</h3>
            <button className="text-muted-foreground hover:text-foreground">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-4">
            {recentTransactions.map((tx, index) => (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="flex items-center gap-3"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-lg">
                  {tx.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{tx.name}</p>
                  <p className="text-xs text-muted-foreground">{tx.date}</p>
                </div>
                <p className={cn(
                  "text-sm font-medium",
                  tx.amount > 0 ? "text-success" : "text-foreground"
                )}>
                  {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount).toFixed(2)}
                </p>
              </motion.div>
            ))}
          </div>

          <button className="w-full mt-4 flex items-center justify-center gap-2 rounded-xl border border-border py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
            View All
            <ChevronRight className="h-4 w-4" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
