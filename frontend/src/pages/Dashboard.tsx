import { motion } from "framer-motion";
import { Calendar as CalendarIcon, TrendingUp, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import CustomCalendar, { Task, DayCategories } from "@/components/CustomCalendar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Mock task data
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
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <div className="px-6 md:px-12 pt-8 pb-6 border-b border-gray-100">
        <h1 className="font-airone text-4xl md:text-5xl font-bold lowercase tracking-tight">dashboard</h1>
        <p className="text-gray-500 mt-2">track your content performance</p>
      </div>

      <div className="px-6 md:px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[calc(100vh-12rem)]">

          {/* Calendar Widget */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="lg:row-span-2 bg-gray-50 rounded-3xl p-6 flex flex-col relative overflow-hidden border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-black rounded-full">
                <CalendarIcon className="w-5 h-5 text-white" />
              </div>
              <h2 className="font-airone text-xl font-bold lowercase">calendar</h2>
            </div>

            <div
              className="flex-1 flex flex-col items-center justify-start overflow-hidden w-full cursor-pointer hover:bg-gray-100 transition-all duration-300 rounded-2xl p-2"
              onClick={() => navigate("/calendar")}
            >
              <CustomCalendar
                compact
                className="w-full h-full pointer-events-none"
                onDayClick={() => navigate("/calendar")}
                dayCategories={dayCategories}
                tasks={mockTasks}
              />
            </div>

            <div className="mt-4 w-full">
              <Button asChild className="w-full bg-black text-white hover:bg-gray-800 rounded-full font-bold">
                <Link to="/calendar">
                  View Full Calendar <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* For You Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
            className="bg-waxy-lime text-black rounded-3xl p-6 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-black/10 rounded-full">
                <Sparkles className="w-5 h-5 text-black" />
              </div>
              <h2 className="font-airone text-xl font-bold lowercase">for you</h2>
            </div>

            <div className="flex-1 flex items-center justify-center border-2 border-dashed border-black/20 rounded-2xl bg-black/5">
              <p className="text-black/60 font-medium">personalized content coming soon</p>
            </div>
          </motion.div>

          {/* Trend Analysis Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="bg-waxy-yellow text-black rounded-3xl p-6 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-black/10 rounded-full">
                <TrendingUp className="w-5 h-5 text-black" />
              </div>
              <h2 className="font-airone text-xl font-bold lowercase">trend analysis</h2>
            </div>

            <div className="flex-1 flex items-center justify-center border-2 border-dashed border-black/20 rounded-2xl bg-black/5">
              <p className="text-black/60 font-medium">trend analytics coming soon</p>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
