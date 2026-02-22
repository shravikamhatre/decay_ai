import CustomCalendar, {
  Task,
  DayCategories,
  DayCategory,
} from "@/components/CustomCalendar";
import { useState } from "react";
import { format, startOfDay, addDays, differenceInDays } from "date-fns";
import {
  Calendar as CalendarIcon,
  XCircle,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Feedback from "@/pages/Feedback";

// Trend data embedded from genai/daily_Food.json (top 10 good trends)
const foodTrendsData = {
  niche: "Food",
  top_trends_good: [
    {
      name: "old money edit - street food hunt",
      base: "old money edit",
      score: 29.536,
      signals: {
        velocity_pct: 246.443,
        engagement_pct: 0.83,
        appearance_pct: 0.333,
        saturation_pct: 4.857,
        novelty: 0.565,
        decay_score: 0.68,
      },
    },
    {
      name: "soft life edit - cooking",
      base: "soft life edit",
      score: 18.422,
      signals: {
        velocity_pct: 152.822,
        engagement_pct: 4.284,
        appearance_pct: 0.111,
        saturation_pct: 8.519,
        novelty: 0.146,
        decay_score: 0.912,
      },
    },
    {
      name: "things nobody tells you about as a creator - street food hunt",
      base: "things nobody tells you about as a creator",
      score: 5.155,
      signals: {
        velocity_pct: 23.851,
        engagement_pct: -0.771,
        appearance_pct: 0.0,
        saturation_pct: 6.364,
        novelty: 0.269,
        decay_score: 0.022,
      },
    },
    {
      name: "get ready with me vlog - cooking",
      base: "get ready with me vlog",
      score: 4.026,
      signals: {
        velocity_pct: 8.983,
        engagement_pct: 2.8,
        appearance_pct: 14.0,
        saturation_pct: 4.568,
        novelty: 0.0,
        decay_score: 0.285,
      },
    },
    {
      name: "routine reel vlog - street food hunt",
      base: "routine reel vlog",
      score: 3.679,
      signals: {
        velocity_pct: 11.214,
        engagement_pct: -0.132,
        appearance_pct: 1.8,
        saturation_pct: 2.162,
        novelty: 0.124,
        decay_score: 0.068,
      },
    },
    {
      name: "#facelesscontent #growth - street food hunt",
      base: "#facelesscontent #growth",
      score: 3.495,
      signals: {
        velocity_pct: 16.628,
        engagement_pct: 0.097,
        appearance_pct: 0.273,
        saturation_pct: 3.079,
        novelty: 0.753,
        decay_score: 0.476,
      },
    },
    {
      name: "old money aesthetic - cooking",
      base: "old money aesthetic",
      score: 3.471,
      signals: {
        velocity_pct: 28.877,
        engagement_pct: 9.958,
        appearance_pct: 0.0,
        saturation_pct: 4.007,
        novelty: 0.466,
        decay_score: 0.868,
      },
    },
    {
      name: "this changed everything for me before traveling - street food hunt",
      base: "this changed everything for me before traveling",
      score: 2.866,
      signals: {
        velocity_pct: 11.076,
        engagement_pct: 0.031,
        appearance_pct: 5.0,
        saturation_pct: 4.308,
        novelty: 0.352,
        decay_score: 0.028,
      },
    },
    {
      name: "old money aesthetic - recipe prep",
      base: "old money aesthetic",
      score: 2.807,
      signals: {
        velocity_pct: 0.053,
        engagement_pct: 0.507,
        appearance_pct: 16.0,
        saturation_pct: 0.106,
        novelty: 0.0,
        decay_score: 0.068,
      },
    },
    {
      name: "old money edit - recipe prep",
      base: "old money edit",
      score: 2.73,
      signals: {
        velocity_pct: 8.174,
        engagement_pct: 1.51,
        appearance_pct: 2.333,
        saturation_pct: 5.018,
        novelty: 0.0,
        decay_score: 0.067,
      },
    },
  ],
};

// Trend interface based on the JSON structure
interface TrendSignals {
  velocity_pct: number;
  engagement_pct: number;
  appearance_pct: number;
  saturation_pct: number;
  novelty: number;
  decay_score: number;
}

interface Trend {
  name: string;
  base: string;
  score: number;
  signals: TrendSignals;
}

interface FoodTrendsData {
  niche: string;
  top_trends_good: Trend[];
}

/**
 * Predicts the number of days before a trend falls off based on its decay score.
 * decay_score ranges from 0 to 1, where:
 * - 0 = very slow decay (trend lasts longer, ~14+ days)
 * - 1 = very fast decay (trend dies quickly, ~1-2 days)
 *
 * Formula: daysUntilDecay = MAX_DAYS * (1 - decay_score)
 * Where MAX_DAYS is the maximum lifespan of any trend (e.g., 14 days)
 */
const MAX_TREND_LIFESPAN_DAYS = 14;

const predictDaysUntilDecay = (decayScore: number): number => {
  // Clamp decay score between 0 and 1
  const clampedScore = Math.max(0, Math.min(1, decayScore));
  // Calculate days remaining: lower decay = more days
  const days = Math.round(MAX_TREND_LIFESPAN_DAYS * (1 - clampedScore));
  // Minimum 1 day
  return Math.max(1, days);
};

/**
 * Determines the category for a trend on a specific day.
 * - "good": Posting on this day is optimal (within first 50% of trend's lifespan)
 * - "okay": Trend is still alive but waning (50-80% of lifespan)
 * - "bad": Trend will likely be dead by this day (>80% of lifespan or expired)
 */
const getCategoryForDay = (
  daysFromNow: number,
  daysUntilDecay: number,
): DayCategory => {
  if (daysFromNow > daysUntilDecay) {
    return "bad"; // Trend will be dead by this day
  }
  const percentageUsed = daysFromNow / daysUntilDecay;
  if (percentageUsed <= 0.5) {
    return "good"; // Within first 50% - optimal time to post
  } else if (percentageUsed <= 0.8) {
    return "okay"; // 50-80% - still viable but trending down
  } else {
    return "bad"; // 80%+ - risky, trend almost dead
  }
};

// Get the top 10 trends from the data
const trendsData = foodTrendsData as FoodTrendsData;
const top10Trends = trendsData.top_trends_good.slice(0, 10);

// Generate initial tasks by assigning each trend to today (day 0)
// User can drag them to different days to see viability
const today = startOfDay(new Date());

const generateInitialTasks = (): Task[] => {
  return top10Trends.map((trend, index) => {
    const daysUntilDecay = predictDaysUntilDecay(trend.signals.decay_score);
    // Spread trends across the next 14 days initially
    const assignedDay = index % 14;
    const taskDate = addDays(today, assignedDay);
    const category = getCategoryForDay(assignedDay, daysUntilDecay);

    return {
      id: `trend-${index}`,
      title: trend.name,
      category,
      date: format(taskDate, "yyyy-MM-dd"),
      // Store extra data for display
      decayScore: trend.signals.decay_score,
      daysUntilDecay,
      trendScore: trend.score,
    } as Task & {
      decayScore: number;
      daysUntilDecay: number;
      trendScore: number;
    };
  });
};

const initialTasks = generateInitialTasks();

const generateDayCategories = (
  tasks: Task[],
): Record<string, DayCategories> => {
  const categories: Record<string, DayCategories> = {};
  tasks.forEach((task) => {
    if (!categories[task.date]) {
      categories[task.date] = { good: false, okay: false, bad: false };
    }
    categories[task.date][task.category] = true;
  });
  return categories;
};

// Extended Task type with trend metadata
interface TrendTask extends Task {
  decayScore?: number;
  daysUntilDecay?: number;
  trendScore?: number;
}

const CalendarPage = () => {
  const [tasks, setTasks] = useState<TrendTask[]>(initialTasks);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTask, setSelectedTask] = useState<TrendTask | null>(null);
  const [rescheduleDate, setRescheduleDate] = useState<Date | undefined>(
    undefined,
  );
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const navigate = useNavigate();

  const dayCategories = generateDayCategories(tasks);
  const selectedDateKey = format(selectedDate, "yyyy-MM-dd");
  const selectedDayTasks = tasks.filter(
    (task) => task.date === selectedDateKey,
  );

  // Recalculate categories when a task is moved
  const recalculateTaskCategory = (
    task: TrendTask,
    newDate: Date,
  ): DayCategory => {
    const daysFromNow = differenceInDays(newDate, today);
    const daysUntilDecay =
      task.daysUntilDecay || predictDaysUntilDecay(task.decayScore || 0.5);
    return getCategoryForDay(daysFromNow, daysUntilDecay);
  };

  // Handle drag and drop task reassignment
  const handleTaskDrop = (taskId: string, newDate: Date) => {
    const newDateStr = format(newDate, "yyyy-MM-dd");
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const newCategory = recalculateTaskCategory(t, newDate);
          return { ...t, date: newDateStr, category: newCategory };
        }
        return t;
      }),
    );
    toast.success(`Trend moved to ${format(newDate, "MMM d")}`);
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task as TrendTask);
    setRescheduleDate(new Date(task.date));
  };

  const handleFeedback = () => {
    navigate("/feedback");
  };

  // Handle removing a trend from the calendar
  const handleRemoveTrend = () => {
    if (!selectedTask) return;
    setTasks((prev) => prev.filter((t) => t.id !== selectedTask.id));
    setSelectedTask(null);
    toast.success("Trend removed from schedule");
  };

  // Handle finding an alternative trend that won't decay on the scheduled day
  const handleRefreshTrend = () => {
    if (!selectedTask) return;

    const scheduledDate = new Date(selectedTask.date);
    const daysFromNow = differenceInDays(scheduledDate, today);

    // Count how many times each trend appears in the schedule (excluding current task)
    const trendCounts: Record<string, number> = {};
    tasks.forEach((t) => {
      if (t.id !== selectedTask.id) {
        trendCounts[t.title] = (trendCounts[t.title] || 0) + 1;
      }
    });

    // Get all trends except:
    // 1. The currently selected one
    // 2. Trends that already appear twice (max repeat = 2 total)
    const availableTrends = trendsData.top_trends_good.filter(
      (trend) =>
        trend.name !== selectedTask.title && (trendCounts[trend.name] || 0) < 2,
    );

    // Find trends that won't decay on the scheduled day
    // Decay is calculated from TODAY, so daysFromNow is how many days until the scheduled post
    const viableTrends = availableTrends.filter((trend) => {
      const trendDaysUntilDecay = predictDaysUntilDecay(
        trend.signals.decay_score,
      );
      // Trend is viable if it will still be alive on the scheduled day
      return daysFromNow <= trendDaysUntilDecay;
    });

    // If no viable trends, allow any trend but warn the user
    const trendsToChooseFrom =
      viableTrends.length > 0 ? viableTrends : availableTrends;

    if (trendsToChooseFrom.length === 0) {
      toast.error("No alternative trends available");
      return;
    }

    // Pick a random trend from the available ones
    const randomTrend =
      trendsToChooseFrom[Math.floor(Math.random() * trendsToChooseFrom.length)];
    const newDaysUntilDecay = predictDaysUntilDecay(
      randomTrend.signals.decay_score,
    );
    const newCategory = getCategoryForDay(daysFromNow, newDaysUntilDecay);

    // Update the task with the new trend
    const updatedTask: TrendTask = {
      ...selectedTask,
      title: randomTrend.name,
      category: newCategory,
      decayScore: randomTrend.signals.decay_score,
      daysUntilDecay: newDaysUntilDecay,
      trendScore: randomTrend.score,
    };

    setTasks((prev) =>
      prev.map((t) => (t.id === selectedTask.id ? updatedTask : t)),
    );
    setSelectedTask(updatedTask);

    if (viableTrends.length === 0) {
      toast.warning(`Switched to: ${randomTrend.name} (may decay by then)`);
    } else {
      toast.success(`Switched to: ${randomTrend.name}`);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Header */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 pt-6 sm:pt-8 pb-4 sm:pb-6 border-b border-zinc-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="font-airone text-3xl sm:text-4xl md:text-5xl font-bold lowercase tracking-tight">
              calendar
            </h1>
            <p className="text-zinc-400 mt-2 text-sm sm:text-base">
              track content performance over time
            </p>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-waxy-lime" />
              <span className="text-gray-500">trending</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-waxy-yellow" />
              <span className="text-gray-500">stable</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-gray-500">declining</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-4 sm:py-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 w-full">
          {/* Calendar */}
          <div className="md:col-span-2 bg-zinc-900/50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-zinc-800/50 backdrop-blur-sm relative overflow-hidden w-full">
            <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none">
              <div className="w-32 h-32 bg-waxy-lime rounded-full blur-[80px]" />
            </div>
            <CustomCalendar
              onDayClick={(date) => {
                setSelectedDate(date);
                setSelectedTask(null); // Reset task view on date change
              }}
              onTaskClick={handleTaskClick}
              onTaskDrop={handleTaskDrop}
              dayCategories={dayCategories}
              tasks={tasks}
            />
          </div>

          {/* Side Panel (Dynamic Content) */}
          <div className="bg-waxy-yellow/10 border border-waxy-yellow/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 relative overflow-hidden flex flex-col w-full md:min-h-full">
            <div className="absolute bottom-0 left-0 p-4 opacity-10 pointer-events-none">
              <div className="w-24 h-24 bg-waxy-yellow rounded-full blur-[60px]" />
            </div>

            {selectedTask ? (
              // Task Details View
              <div className="space-y-4 sm:space-y-6 relative z-10 animate-in fade-in slide-in-from-right-4 duration-300">
                <Button
                  variant="ghost"
                  onClick={() => setSelectedTask(null)}
                  className="p-0 h-auto text-zinc-500 hover:text-white hover:bg-transparent -ml-2 mb-2 text-sm sm:text-base"
                >
                  ← Back to {format(selectedDate, "MMM d")}
                </Button>

                <div className="space-y-2">
                  <h3 className="font-airone text-lg sm:text-2xl font-bold lowercase text-waxy-yellow leading-tight">
                    {selectedTask.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-400">
                    <CalendarIcon className="w-4 h-4" />
                    <span>
                      {format(new Date(selectedTask.date), "MMMM d, yyyy")}
                    </span>
                  </div>
                  <span
                    className={cn(
                      "inline-block px-2 py-1 rounded text-xs font-bold uppercase tracking-wider",
                      selectedTask.category === "good"
                        ? "bg-waxy-lime/20 text-waxy-lime"
                        : selectedTask.category === "okay"
                          ? "bg-waxy-yellow/20 text-waxy-yellow"
                          : "bg-red-500/20 text-red-400",
                    )}
                  >
                    {selectedTask.category === "good"
                      ? "Hot - Post Now!"
                      : selectedTask.category === "okay"
                        ? "Still Viable"
                        : "Trend Dying"}
                  </span>
                </div>

                {/* Trend Metrics */}
                <div className="space-y-3 bg-zinc-800/50 rounded-xl p-3 sm:p-4">
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                    Trend Analysis
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xl sm:text-2xl font-bold text-waxy-lime">
                        {selectedTask.daysUntilDecay || "?"}
                      </p>
                      <p className="text-xs text-zinc-400">days until decay</p>
                    </div>
                    <div>
                      <p className="text-xl sm:text-2xl font-bold text-white">
                        {selectedTask.trendScore?.toFixed(1) || "?"}
                      </p>
                      <p className="text-xs text-zinc-400">trend score</p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-zinc-700/50">
                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-400">Decay Rate</span>
                      <span className="text-white font-medium">
                        {selectedTask.decayScore !== undefined
                          ? `${(selectedTask.decayScore * 100).toFixed(0)}%`
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Manage Actions */}
                <div className="space-y-3">
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                    Manage
                  </p>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal border-zinc-700 hover:bg-zinc-800 bg-transparent text-zinc-300 text-sm sm:text-base",
                          !rescheduleDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-3 h-4 w-4 shrink-0" />
                        <span className="truncate">
                          {rescheduleDate ? (
                            format(rescheduleDate, "PPP")
                          ) : (
                            <span>Reschedule to...</span>
                          )}
                        </span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0 bg-zinc-900 border-zinc-800"
                      align="end"
                    >
                      <Calendar
                        mode="single"
                        selected={rescheduleDate}
                        onSelect={(date) => {
                          setRescheduleDate(date);
                          if (date && selectedTask) {
                            const newDateStr = format(date, "yyyy-MM-dd");
                            const newCategory = recalculateTaskCategory(
                              selectedTask,
                              date,
                            );
                            setTasks((prev) =>
                              prev.map((t) =>
                                t.id === selectedTask.id
                                  ? {
                                    ...t,
                                    date: newDateStr,
                                    category: newCategory,
                                  }
                                  : t,
                              ),
                            );
                            setSelectedTask((prev) =>
                              prev
                                ? {
                                  ...prev,
                                  date: newDateStr,
                                  category: newCategory,
                                }
                                : null,
                            );
                            toast.success(
                              `Rescheduled to ${format(date, "MMM d")}`,
                            );
                          }
                        }}
                        initialFocus
                        className="p-3 pointer-events-auto"
                        classNames={{
                          day_selected:
                            "bg-white text-black hover:bg-white hover:text-black focus:bg-white focus:text-black",
                          day_today: "bg-zinc-800 text-white",
                        }}
                      />
                    </PopoverContent>
                  </Popover>

                  <Button
                    onClick={handleRefreshTrend}
                    variant="outline"
                    className="w-full justify-start border-zinc-700 hover:bg-zinc-800 hover:text-white bg-transparent text-zinc-300 text-sm sm:text-base"
                  >
                    <RefreshCw className="w-4 h-4 mr-3 shrink-0" />
                    <span className="truncate">Find Alternative Trend</span>
                  </Button>

                  <Button
                    onClick={() => navigate("/feedback")}
                    className="w-full justify-start bg-waxy-yellow hover:bg-waxy-yellow/90 text-black font-medium text-sm sm:text-base"
                  >
                    <MessageSquare className="w-4 h-4 mr-3 shrink-0" />
                    <span className="truncate">Share Feedback</span>
                  </Button>
                </div>
              </div>
            ) : (
              // Day Task List View
              <div className="relative z-10 animate-in fade-in slide-in-from-left-4 duration-300">
                <h3 className="font-airone text-lg sm:text-xl font-bold lowercase mb-4 text-waxy-yellow">
                  {format(selectedDate, "MMMM d, yyyy")}
                </h3>

                {selectedDayTasks.length > 0 ? (
                  <div className="space-y-3">
                    {selectedDayTasks.map((task) => (
                      <div
                        key={task.id}
                        onClick={() => handleTaskClick(task)}
                        className={`px-3 sm:px-4 py-2 sm:py-3 rounded-2xl font-medium flex items-start gap-2 sm:gap-3 cursor-pointer hover:opacity-90 transition-opacity text-sm sm:text-base ${task.category === "good"
                            ? "bg-waxy-lime text-black"
                            : task.category === "okay"
                              ? "bg-waxy-yellow text-black"
                              : "bg-red-500 text-white"
                          }`}
                      >
                        {task.category === "good" && (
                          <CheckCircle2 className="w-4 sm:w-5 h-4 sm:h-5 shrink-0 mt-0.5" />
                        )}
                        {task.category === "okay" && (
                          <AlertTriangle className="w-4 sm:w-5 h-4 sm:h-5 shrink-0 mt-0.5" />
                        )}
                        {task.category === "bad" && (
                          <XCircle className="w-4 sm:w-5 h-4 sm:h-5 shrink-0 mt-0.5" />
                        )}
                        <span className="truncate">{task.title}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-32 sm:h-48 border-2 border-dashed border-zinc-700/50 rounded-2xl">
                    <p className="text-zinc-500 text-center px-4 text-xs sm:text-sm">
                      No content scheduled for this day
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Feedback Dialog */}
        <Dialog open={showFeedbackDialog} onOpenChange={setShowFeedbackDialog}>
          <DialogContent className="max-w-2xl bg-zinc-900 border-zinc-800">
            <DialogHeader>
              <DialogTitle className="text-white">
                Share Your Feedback
              </DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <Feedback />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CalendarPage;
