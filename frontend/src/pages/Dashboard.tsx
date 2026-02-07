import { motion } from "framer-motion";
import { Calendar, TrendingUp, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 lg:grid-rows-2 gap-6 h-[calc(100vh-12rem)]">
        {/* Calendar Widget Section - Top Left */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="col-span-1 glass-card p-6 flex flex-col relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2" />

          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-lg font-semibold">Calendar</h2>
          </div>

          <div className="flex-1 flex flex-col justify-center items-center text-center p-4 border-2 border-dashed border-muted rounded-lg bg-secondary/20">
            <p className="text-muted-foreground mb-4">View upcoming events and schedules</p>
            <Link to="/calendar" className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
              Open Calendar <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* For You Section - Tall 2 Cells (Right) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="col-span-1 lg:row-span-2 glass-card p-6 flex flex-col relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2" />

          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Sparkles className="w-5 h-5 text-purple-500" />
            </div>
            <h2 className="text-lg font-semibold">For You</h2>
          </div>

          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-muted rounded-lg bg-secondary/20">
            <p className="text-muted-foreground text-sm">Personalized Content Placeholder</p>
          </div>
        </motion.div>

        {/* Trend Analysis Section - Bottom Left */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="col-span-1 glass-card p-6 flex flex-col relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2" />

          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <TrendingUp className="w-5 h-5 text-blue-500" />
            </div>
            <h2 className="text-lg font-semibold">Trend Analysis</h2>
          </div>

          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-muted rounded-lg bg-secondary/20">
            <p className="text-muted-foreground text-sm">Trend Analysis Widget Placeholder</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
