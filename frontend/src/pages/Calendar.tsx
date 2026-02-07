import CustomCalendar, { Task, DayCategories } from "@/components/CustomCalendar";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { CheckCircle2, AlertTriangle, XCircle, Loader2, TrendingUp, Music } from "lucide-react";
import { getTrends, ContentItem, getUrgencyLabel, AVAILABLE_NICHES } from "@/lib/contentService";

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
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedNiche, setSelectedNiche] = useState("Food");
    const [topTrends, setTopTrends] = useState<ContentItem[]>([]);

    // Fetch trends when niche changes
    useEffect(() => {
        const fetchTrends = async () => {
            setIsLoading(true);
            const data = await getTrends(selectedNiche);

            if (data && data.schedule) {
                // Convert schedule items to calendar tasks
                const calendarTasks: Task[] = data.schedule.map(item => ({
                    id: item.id,
                    title: item.title,
                    category: item.category,
                    date: item.date,
                }));
                setTasks(calendarTasks);
                setTopTrends(data.schedule.filter(item => item.type === "trend" && item.category === "good"));
            }
            setIsLoading(false);
        };

        fetchTrends();
    }, [selectedNiche]);

    const dayCategories = generateDayCategories(tasks);
    const selectedDateKey = format(selectedDate, "yyyy-MM-dd");
    const selectedDayTasks = tasks.filter(task => task.date === selectedDateKey);

    return (
        <div className="min-h-screen bg-white text-black">
            {/* Header */}
            <div className="px-6 md:px-12 pt-8 pb-6 border-b border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="font-airone text-4xl md:text-5xl font-bold lowercase tracking-tight">content calendar</h1>
                        <p className="text-gray-500 mt-2">ai-powered content recommendations for {selectedNiche.toLowerCase()}</p>
                    </div>

                    {/* Niche Selector */}
                    <div className="flex items-center gap-4">
                        <select
                            value={selectedNiche}
                            onChange={(e) => setSelectedNiche(e.target.value)}
                            className="px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-black"
                        >
                            {AVAILABLE_NICHES.map(niche => (
                                <option key={niche} value={niche}>{niche}</option>
                            ))}
                        </select>

                        {/* Legend */}
                        <div className="flex items-center gap-4 text-sm">
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
                                <span className="text-gray-500">avoid</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-6 md:px-12 py-8">
                {isLoading ? (
                    <div className="flex items-center justify-center h-64">
                        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                        <span className="ml-3 text-gray-500">Loading {selectedNiche.toLowerCase()} trends...</span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Calendar */}
                        <div className="lg:col-span-2 bg-gray-50 rounded-3xl p-6 border border-gray-100">
                            <CustomCalendar
                                onDayClick={setSelectedDate}
                                dayCategories={dayCategories}
                                tasks={tasks}
                            />
                        </div>

                        {/* Selected Day Panel */}
                        <div className="space-y-6">
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
                                                <span className="text-sm">{task.title}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center h-32 border-2 border-dashed border-gray-200 rounded-2xl">
                                        <p className="text-gray-400">no content scheduled</p>
                                    </div>
                                )}
                            </div>

                            {/* Top Trends Card */}
                            <div className="bg-waxy-lime rounded-3xl p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <TrendingUp className="w-5 h-5" />
                                    <h3 className="font-airone text-lg font-bold lowercase">top trends this week</h3>
                                </div>
                                <div className="space-y-2">
                                    {topTrends.slice(0, 3).map((trend, i) => (
                                        <div key={trend.id} className="flex items-center justify-between text-sm">
                                            <span className="font-medium truncate max-w-[180px]">{i + 1}. {trend.title.split(" - ")[0]}</span>
                                            <span className="text-black/60 text-xs">score: {trend.score.toFixed(1)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default CalendarPage;
