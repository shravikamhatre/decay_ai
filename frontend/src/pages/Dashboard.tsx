import { motion } from "framer-motion";
import { Calendar as CalendarIcon, TrendingUp, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import CustomCalendar, { Task, DayCategories } from "@/components/CustomCalendar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MagneticButton } from "@/components/ui/magnetic-button";

// Mock task data - same as Calendar page
const mockTasks: Task[] = [
  { id: "1", title: "Instagram post viral 🎉", category: "good", date: "2026-02-07" },
  { id: "2", title: "10k new followers", category: "good", date: "2026-02-07" },
  { id: "3", title: "Moderate engagement", category: "okay", date: "2026-02-10" },
  { id: "4", title: "Post underperformed", category: "bad", date: "2026-02-05" },
  { id: "5", title: "Lost followers", category: "bad", date: "2026-02-05" },
  { id: "6", title: "Great reel views", category: "good", date: "2026-02-12" },
  { id: "7", title: "Average comments", category: "okay", date: "2026-02-12" },
  { id: "8", title: "Brand collab landed", category: "good", date: "2026-02-12" },
  { id: "9", title: "Some saves", category: "okay", date: "2026-02-15" },
  { id: "10", title: "Low reach", category: "bad", date: "2026-02-15" },
  { id: "11", title: "Story went viral", category: "good", date: "2026-02-18" },
  { id: "12", title: "Main post flopped", category: "bad", date: "2026-02-18" },
  { id: "13", title: "TikTok hit 1M", category: "good", date: "2026-02-20" },
  { id: "14", title: "YouTube steady", category: "okay", date: "2026-02-20" },
  { id: "15", title: "Twitter drama", category: "bad", date: "2026-02-20" },
  { id: "16", title: "Newsletter opened", category: "good", date: "2026-02-20" },
  { id: "17", title: "Collab post success", category: "good", date: "2026-02-22" },
  { id: "18", title: "Scheduled content", category: "okay", date: "2026-02-25" },
  { id: "19", title: "Algorithm change", category: "bad", date: "2026-02-28" },
  { id: "20", title: "Trending hashtag", category: "good", date: "2026-02-28" },
  { id: "21", title: "Engagement drop", category: "bad", date: "2026-02-28" },
];

// Generate dayCategories from tasks
const generateDayCategories = (tasks: Task[]): Record<string, DayCategories> => {
  const categories: Record<string, DayCategories> = {};
  tasks.forEach(task => {
    if (!categories[task.date]) {
      categories[task.date] = { good: false, okay: false, bad: false };
    }
    categories[task.date][task.category] = true;
  });
  return categories;
};

const dayCategories = generateDayCategories(mockTasks);

const Dashboard = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-display font-bold tracking-tight">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 lg:grid-rows-2 gap-6 h-[calc(100vh-12rem)]">
        {/* Calendar Widget Section - Left column, 2 rows tall */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="col-span-1 lg:row-span-2 glass-card p-5 flex flex-col relative overflow-hidden group"
        >
          {/* Warm decorative blob */}
          <div className="absolute top-0 right-0 w-40 h-40 warm-blob warm-blob-amber -translate-y-1/2 translate-x-1/2 opacity-40" />

          <div className="flex items-center gap-3 mb-3 z-10 relative">
            <div className="p-2.5 bg-primary/10 rounded-xl">
              <CalendarIcon className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-lg font-display font-semibold">calendar</h2>
          </div>

          <div
            className="flex-1 flex flex-col items-center justify-start overflow-hidden z-10 relative w-full cursor-pointer hover:bg-secondary/20 transition-all duration-300 rounded-xl"
            onClick={() => navigate("/calendar")}
          >
            <CustomCalendar
              compact
              className="w-full h-full pointer-events-none"
              onDayClick={() => navigate("/calendar")}
              dayCategories={dayCategories}
              tasks={mockTasks}
            />
            <div className="mt-3 w-full flex justify-center shrink-0">
              <Button asChild className="w-full" variant="outline" size="sm">
                <Link to="/calendar">
                  View Calendar <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* For You Section - Top Right, 1 row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          className="col-span-1 glass-card p-6 flex flex-col relative overflow-hidden"
        >
          {/* Warm decorative blob */}
          <div className="absolute top-0 right-0 w-48 h-48 warm-blob warm-blob-orange -translate-y-1/2 translate-x-1/2 opacity-30" />

          <div className="flex items-center gap-3 mb-5">
            <div className="p-2.5 bg-primary/10 rounded-xl">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-lg font-display font-semibold">For You</h2>
          </div>

          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-border rounded-xl bg-secondary/20">
            <p className="text-muted-foreground text-sm">Personalized Content Coming Soon</p>
          </div>
        </motion.div>

        {/* Trend Analysis Section - Bottom Right, 1 row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          className="col-span-1 glass-card p-6 flex flex-col relative overflow-hidden"
        >
          {/* Warm decorative blob */}
          <div className="absolute bottom-0 left-0 w-36 h-36 warm-blob warm-blob-amber translate-y-1/2 -translate-x-1/2 opacity-40" />

          <div className="flex items-center gap-3 mb-5">
            <div className="p-2.5 bg-primary/10 rounded-xl">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-lg font-display font-semibold">Trend Analysis</h2>
          </div>

          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-border rounded-xl bg-secondary/20">
            <p className="text-muted-foreground text-sm">Trend Analytics Coming Soon</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
