import CustomCalendar, { Task, DayCategories } from "@/components/CustomCalendar";
import { useState } from "react";
import { format } from "date-fns";
import { CheckCircle2, AlertTriangle, XCircle, Calendar as CalendarIcon, RefreshCw, ThumbsUp, ThumbsDown, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

// Mock task data
const initialTasks: Task[] = [
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

const suggestions = [
    "Behind the scenes reel",
    "Industry trend analysis",
    "User generated content highlight",
    "Q&A session live",
    "Product teaser carousel",
    "Flash sale announcement"
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
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [rescheduleDate, setRescheduleDate] = useState<Date | undefined>(undefined);
    const navigate = useNavigate();

    const dayCategories = generateDayCategories(tasks);
    const selectedDateKey = format(selectedDate, "yyyy-MM-dd");
    const selectedDayTasks = tasks.filter(task => task.date === selectedDateKey);

    const handleTaskClick = (task: Task) => {
        setSelectedTask(task);
        setRescheduleDate(new Date(task.date));
    };

    const handleFeedback = () => {
        navigate("/feedback");
    };



    const handleReplace = () => {
        if (!selectedTask) return;
        const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];

        setTasks(prev => prev.map(t => t.id === selectedTask.id ? { ...t, title: randomSuggestion } : t));
        setSelectedTask(prev => prev ? { ...prev, title: randomSuggestion } : null);
        toast.success("Topic replaced with suggestion!");
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <div className="px-6 md:px-12 pt-8 pb-6 border-b border-zinc-800">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="font-airone text-4xl md:text-5xl font-bold lowercase tracking-tight">calendar</h1>
                        <p className="text-zinc-400 mt-2">track content performance over time</p>
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
                    <div className="lg:col-span-2 bg-zinc-900/50 rounded-3xl p-6 border border-zinc-800/50 backdrop-blur-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none">
                            <div className="w-32 h-32 bg-waxy-lime rounded-full blur-[80px]" />
                        </div>
                        <CustomCalendar
                            onDayClick={(date) => {
                                setSelectedDate(date);
                                setSelectedTask(null); // Reset task view on date change
                            }}
                            onTaskClick={handleTaskClick}
                            dayCategories={dayCategories}
                            tasks={tasks}
                        />
                    </div>

                    {/* Side Panel (Dynamic Content) */}
                    <div className="bg-waxy-yellow/10 border border-waxy-yellow/20 rounded-3xl p-6 relative overflow-hidden flex flex-col h-full">
                        <div className="absolute bottom-0 left-0 p-4 opacity-10 pointer-events-none">
                            <div className="w-24 h-24 bg-waxy-yellow rounded-full blur-[60px]" />
                        </div>

                        {selectedTask ? (
                            // Task Details View
                            <div className="space-y-6 relative z-10 animate-in fade-in slide-in-from-right-4 duration-300">
                                <Button
                                    variant="ghost"
                                    onClick={() => setSelectedTask(null)}
                                    className="p-0 h-auto text-zinc-500 hover:text-white hover:bg-transparent -ml-2 mb-2"
                                >
                                    ← Back to {format(selectedDate, "MMM d")}
                                </Button>

                                <div className="space-y-2">
                                    <h3 className="font-airone text-2xl font-bold lowercase text-waxy-yellow leading-tight">
                                        {selectedTask.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                                        <CalendarIcon className="w-4 h-4" />
                                        <span>{format(new Date(selectedTask.date), "MMMM d, yyyy")}</span>
                                    </div>
                                    <span className={cn(
                                        "inline-block px-2 py-1 rounded text-xs font-bold uppercase tracking-wider",
                                        selectedTask.category === "good" ? "bg-waxy-lime/20 text-waxy-lime" :
                                            selectedTask.category === "okay" ? "bg-waxy-yellow/20 text-waxy-yellow" :
                                                "bg-red-500/20 text-red-400"
                                    )}>
                                        {selectedTask.category} Performance
                                    </span>
                                </div>

                                {/* Feedback */}
                                <div className="space-y-2">
                                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Feedback</p>
                                    <Button
                                        onClick={handleFeedback}
                                        className="w-full py-4 bg-white text-black hover:bg-zinc-200 font-bold"
                                    >
                                        <ThumbsUp className="w-4 h-4 mr-2" />
                                        Give Feedback
                                    </Button>
                                </div>

                                {/* Manage Actions */}
                                <div className="space-y-3">
                                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Manage</p>

                                    <Button
                                        onClick={handleReplace}
                                        variant="outline"
                                        className="w-full justify-start border-zinc-700 hover:bg-zinc-800 hover:text-white bg-transparent text-zinc-300"
                                    >
                                        <RefreshCw className="w-4 h-4 mr-3" />
                                        Replace with suggestion
                                    </Button>

                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    "w-full justify-start text-left font-normal border-zinc-700 hover:bg-zinc-800 bg-transparent text-zinc-300",
                                                    !rescheduleDate && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-3 h-4 w-4" />
                                                {rescheduleDate ? format(rescheduleDate, "PPP") : <span>Reschedule to...</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0 bg-zinc-900 border-zinc-800" align="end">
                                            <Calendar
                                                mode="single"
                                                selected={rescheduleDate}
                                                onSelect={(date) => {
                                                    setRescheduleDate(date);
                                                    if (date && selectedTask) {
                                                        const newDateStr = format(date, "yyyy-MM-dd");
                                                        setTasks(prev => prev.map(t => t.id === selectedTask.id ? { ...t, date: newDateStr } : t));
                                                        setSelectedTask(prev => prev ? { ...prev, date: newDateStr } : null);
                                                        toast.success(`Rescheduled to ${format(date, "MMM d")}`);
                                                    }
                                                }}
                                                initialFocus
                                                className="p-3 pointer-events-auto"
                                                classNames={{
                                                    day_selected: "bg-white text-black hover:bg-white hover:text-black focus:bg-white focus:text-black",
                                                    day_today: "bg-zinc-800 text-white",
                                                }}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                        ) : (
                            // Day Task List View
                            <div className="relative z-10 animate-in fade-in slide-in-from-left-4 duration-300">
                                <h3 className="font-airone text-xl font-bold lowercase mb-4 text-waxy-yellow">
                                    {format(selectedDate, "MMMM d, yyyy")}
                                </h3>

                                {selectedDayTasks.length > 0 ? (
                                    <div className="space-y-3">
                                        {selectedDayTasks.map(task => (
                                            <div
                                                key={task.id}
                                                onClick={() => handleTaskClick(task)}
                                                className={`px-4 py-3 rounded-2xl font-medium flex items-start gap-3 cursor-pointer hover:opacity-90 transition-opacity ${task.category === "good"
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
                                    <div className="flex items-center justify-center h-48 border-2 border-dashed border-zinc-700/50 rounded-2xl">
                                        <p className="text-zinc-500 text-center px-4">No content scheduled for this day</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalendarPage;
