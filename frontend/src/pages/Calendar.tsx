import CustomCalendar, { Task, DayCategories } from "@/components/CustomCalendar";
import { useState } from "react";
import { format } from "date-fns";
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

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

const CalendarPage = () => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const dayCategories = generateDayCategories(mockTasks);

    const selectedDateKey = format(selectedDate, "yyyy-MM-dd");
    const selectedDayTasks = mockTasks.filter(task => task.date === selectedDateKey);

    return (
        <div className="min-h-screen bg-white text-black">
            {/* Header */}
            <div className="px-6 md:px-12 pt-8 pb-6 border-b border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="font-airone text-4xl md:text-5xl font-bold lowercase tracking-tight">calendar</h1>
                        <p className="text-gray-500 mt-2">track content performance over time</p>
                    </div>

                    {/* Legend */}
                    <div className="flex items-center gap-6 text-sm">
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

            <div className="px-6 md:px-12 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Calendar */}
                    <div className="lg:col-span-2 bg-gray-50 rounded-3xl p-6 border border-gray-100">
                        <CustomCalendar
                            onDayClick={setSelectedDate}
                            dayCategories={dayCategories}
                            tasks={mockTasks}
                        />
                    </div>

                    {/* Selected Day Panel */}
                    <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6">
                        <h3 className="font-airone text-xl font-bold lowercase mb-4">
                            {format(selectedDate, "MMMM d, yyyy")}
                        </h3>

                        {selectedDayTasks.length > 0 ? (
                            <div className="space-y-3">
                                {selectedDayTasks.map(task => (
                                    <div
                                        key={task.id}
                                        className={`px-4 py-3 rounded-2xl font-medium flex items-start gap-3 ${task.category === "good"
                                            ? "bg-waxy-lime text-black"
                                            : task.category === "okay"
                                                ? "bg-waxy-yellow text-black"
                                                : "bg-red-500 text-white"
                                            }`}
                                    >
                                        {task.category === "good" && <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />}
                                        {task.category === "okay" && <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />}
                                        {task.category === "bad" && <XCircle className="w-5 h-5 shrink-0 mt-0.5" />}
                                        <span>{task.title}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-32 border-2 border-dashed border-gray-200 rounded-2xl">
                                <p className="text-gray-400">no content tracked</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CalendarPage;
