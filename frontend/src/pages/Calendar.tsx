import CustomCalendar, { Task, DayCategories } from "@/components/CustomCalendar";
import { useState } from "react";
import { format } from "date-fns";

// Mock task data for February 2026
const mockTasks: Task[] = [
    // Day with only GOOD tasks
    { id: "1", title: "Instagram post viral 🎉", category: "good", date: "2026-02-07" },
    { id: "2", title: "10k new followers", category: "good", date: "2026-02-07" },

    // Day with only OKAY tasks
    { id: "3", title: "Moderate engagement", category: "okay", date: "2026-02-10" },

    // Day with only BAD tasks
    { id: "4", title: "Post underperformed", category: "bad", date: "2026-02-05" },
    { id: "5", title: "Lost followers", category: "bad", date: "2026-02-05" },

    // Day with GOOD + OKAY (green-yellow gradient)
    { id: "6", title: "Great reel views", category: "good", date: "2026-02-12" },
    { id: "7", title: "Average comments", category: "okay", date: "2026-02-12" },
    { id: "8", title: "Brand collab landed", category: "good", date: "2026-02-12" },

    // Day with OKAY + BAD (yellow-red gradient)
    { id: "9", title: "Some saves", category: "okay", date: "2026-02-15" },
    { id: "10", title: "Low reach", category: "bad", date: "2026-02-15" },

    // Day with GOOD + BAD (green-red gradient - rare!)
    { id: "11", title: "Story went viral", category: "good", date: "2026-02-18" },
    { id: "12", title: "Main post flopped", category: "bad", date: "2026-02-18" },

    // Day with ALL THREE (green-yellow-red gradient)
    { id: "13", title: "TikTok hit 1M", category: "good", date: "2026-02-20" },
    { id: "14", title: "YouTube steady", category: "okay", date: "2026-02-20" },
    { id: "15", title: "Twitter drama", category: "bad", date: "2026-02-20" },
    { id: "16", title: "Newsletter opened", category: "good", date: "2026-02-20" },

    // More varied days
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

const CalendarPage = () => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const dayCategories = generateDayCategories(mockTasks);

    // Get tasks for selected day
    const selectedDateKey = format(selectedDate, "yyyy-MM-dd");
    const selectedDayTasks = mockTasks.filter(task => task.date === selectedDateKey);

    return (
        <div className="space-y-6 h-[calc(100vh-10rem)] flex flex-col">
            <div className="flex items-center justify-between shrink-0">
                <h1 className="text-3xl font-display font-bold tracking-tight">Calendar</h1>
                <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-emerald-400 ring-1 ring-black/30 shadow-sm shadow-emerald-400/50" />
                        <span className="text-muted-foreground">Good</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-amber-400 ring-1 ring-black/30 shadow-sm shadow-amber-400/50" />
                        <span className="text-muted-foreground">Okay</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-orange-500 ring-1 ring-black/30 shadow-sm shadow-orange-500/50" />
                        <span className="text-muted-foreground">Bad</span>
                    </div>
                </div>
            </div>

            <div className="glass-card p-6 flex-1 flex flex-col overflow-hidden">
                <CustomCalendar
                    onDayClick={setSelectedDate}
                    dayCategories={dayCategories}
                    tasks={mockTasks}
                />
            </div>

            {/* Selected Day Details */}
            {selectedDayTasks.length > 0 && (
                <div className="glass-card p-4 shrink-0">
                    <h3 className="font-display font-semibold text-lg mb-3">
                        {format(selectedDate, "MMMM d, yyyy")}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {selectedDayTasks.map(task => (
                            <span
                                key={task.id}
                                className={`px-3 py-1.5 rounded-full text-sm font-medium ${task.category === "good"
                                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300 border border-emerald-400/50"
                                    : task.category === "okay"
                                        ? "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300 border border-amber-400/50"
                                        : "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300 border border-orange-400/50"
                                    }`}
                            >
                                {task.title}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CalendarPage;
