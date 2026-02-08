import { useState } from "react";
import { format, addDays, isSameDay, differenceInDays, startOfDay } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Category types for day status
export type DayCategory = "good" | "okay" | "bad";

export interface Task {
    id: string;
    title: string;
    category: DayCategory;
    date: string; // format: yyyy-MM-dd
    // Optional decay metadata for trend tasks
    decayScore?: number;
    daysUntilDecay?: number;
    trendScore?: number;
}

export interface DayCategories {
    good: boolean;
    okay: boolean;
    bad: boolean;
}

interface CustomCalendarProps {
    className?: string;
    compact?: boolean;
    dayCategories?: Record<string, DayCategories>; // Multiple categories per day
    tasks?: Task[];
    onDayClick?: (day: Date) => void;
    onTaskClick?: (task: Task) => void;
    onTaskDrop?: (taskId: string, newDate: Date) => void;
}

// Get category indicator dots - the decay theme colors
const getCategoryDots = (categories: DayCategories | undefined) => {
    if (!categories) return null;
    const { good, okay, bad } = categories;

    return (
        <div className="flex gap-1 mt-1">
            {good && <span className="w-2.5 h-2.5 rounded-full bg-[#2DD881] shadow-sm" />}
            {okay && <span className="w-2.5 h-2.5 rounded-full bg-[#FFE733] shadow-sm" />}
            {bad && <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-sm" />}
        </div>
    );
};

const CustomCalendar = ({ className, compact = false, dayCategories, tasks, onDayClick, onTaskClick, onTaskDrop }: CustomCalendarProps) => {
    const today = new Date();
    // weekOffset: 0 means current week starting from today, -1 means previous week, 1 means next week
    const [weekOffset, setWeekOffset] = useState(0);
    const [selectedDate, setSelectedDate] = useState(today);
    const [draggedTask, setDraggedTask] = useState<Task | null>(null);
    const [dragOverDate, setDragOverDate] = useState<string | null>(null);

    // Drag handlers
    const handleDragStart = (e: React.DragEvent, task: Task) => {
        e.stopPropagation();
        setDraggedTask(task);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', task.id);
    };

    const handleDragEnd = () => {
        setDraggedTask(null);
        setDragOverDate(null);
    };

    const handleDragOver = (e: React.DragEvent, dateKey: string) => {
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect = 'move';
        setDragOverDate(dateKey);
    };

    const handleDragLeave = () => {
        setDragOverDate(null);
    };

    const handleDrop = (e: React.DragEvent, day: Date) => {
        e.preventDefault();
        e.stopPropagation();
        if (draggedTask && onTaskDrop) {
            onTaskDrop(draggedTask.id, day);
        }
        setDraggedTask(null);
        setDragOverDate(null);
    };

    // Calculate the start of the current week view (today + weekOffset * 7 days)
    const weekStartDate = addDays(today, weekOffset * 7);

    const nextWeek = () => setWeekOffset(weekOffset + 1);
    const prevWeek = () => setWeekOffset(weekOffset - 1);
    const goToToday = () => setWeekOffset(0);

    // Get tasks for a specific day
    const getTasksForDay = (day: Date) => {
        if (!tasks) return [];
        const dateKey = format(day, "yyyy-MM-dd");
        return tasks.filter(task => task.date === dateKey);
    };

    // Constants for decay prediction
    const MAX_TREND_LIFESPAN_DAYS = 14;
    const todayStart = startOfDay(today);

    // Predict what category a task would have if placed on a given day
    const predictCategoryForDay = (task: Task, day: Date): DayCategory => {
        if (!task.decayScore && !task.daysUntilDecay) {
            // If no decay info, return current category
            return task.category;
        }

        const daysFromNow = differenceInDays(day, todayStart);
        const daysUntilDecay = task.daysUntilDecay ||
            Math.max(1, Math.round(MAX_TREND_LIFESPAN_DAYS * (1 - (task.decayScore || 0.5))));

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

    // Get border color class based on predicted category
    const getDragPreviewBorderClass = (day: Date): string => {
        if (!draggedTask) return "";
        const predictedCategory = predictCategoryForDay(draggedTask, day);
        switch (predictedCategory) {
            case "good":
                return "border-[#2DD881] border-2";
            case "okay":
                return "border-[#FFE733] border-2";
            case "bad":
                return "border-red-500 border-2";
            default:
                return "";
        }
    };

    // Generate the 7 days of the current week view
    const getWeekDays = () => {
        const days: Date[] = [];
        for (let i = 0; i < 7; i++) {
            days.push(addDays(weekStartDate, i));
        }
        return days;
    };

    const weekDays = getWeekDays();
    const weekEndDate = weekDays[6];

    const renderHeader = () => {
        // Format header to show the week range
        const startMonth = format(weekStartDate, "MMM");
        const endMonth = format(weekEndDate, "MMM");
        const startYear = format(weekStartDate, "yyyy");
        const endYear = format(weekEndDate, "yyyy");

        let headerText;
        if (startYear !== endYear) {
            headerText = `${format(weekStartDate, "MMM d, yyyy")} - ${format(weekEndDate, "MMM d, yyyy")}`;
        } else if (startMonth !== endMonth) {
            headerText = `${format(weekStartDate, "MMM d")} - ${format(weekEndDate, "MMM d, yyyy")}`;
        } else {
            headerText = `${format(weekStartDate, "MMM d")} - ${format(weekEndDate, "d, yyyy")}`;
        }

        return (
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={prevWeek} className="hover:bg-gray-100 rounded-full">
                        <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={nextWeek} className="hover:bg-gray-100 rounded-full">
                        <ChevronRight className="h-5 w-5" />
                    </Button>
                    {weekOffset !== 0 && (
                        <Button variant="outline" size="sm" onClick={goToToday} className="ml-2 text-xs">
                            Today
                        </Button>
                    )}
                </div>
                <h2 className={cn("font-airone font-bold text-white lowercase", compact ? "text-lg" : "text-2xl")}>
                    {headerText}
                </h2>
            </div>
        );
    };

    const renderDaysHeader = () => {
        return (
            <div className="grid grid-cols-7 mb-2 border-b border-gray-700/50 pb-2">
                {weekDays.map((day, i) => (
                    <div key={i} className="text-center font-medium text-gray-400 py-2 uppercase text-xs tracking-wider">
                        {format(day, "EEE")}
                    </div>
                ))}
            </div>
        );
    };

    const renderCells = () => {
        return (
            <div className="grid grid-cols-7 gap-1.5 p-1 flex-1">
                {weekDays.map((day) => {
                    const formattedDate = format(day, "d");
                    const monthLabel = format(day, "MMM");
                    const isSelected = isSameDay(day, selectedDate);
                    const isToday = isSameDay(day, today);

                    // Get categories for this day
                    const dateKey = format(day, "yyyy-MM-dd");
                    const categories = dayCategories ? dayCategories[dateKey] : undefined;
                    const dayTasks = getTasksForDay(day);
                    const hasCategories = categories && (categories.good || categories.okay || categories.bad);

                    return (
                        <div
                            key={day.toString()}
                            className={cn(
                                "relative transition-all duration-300 cursor-pointer flex flex-col items-start justify-start p-2 group rounded-xl",
                                compact ? "h-20 text-sm" : "min-h-[180px] text-base",
                                "bg-zinc-800/50 text-white hover:bg-zinc-700/50",
                                isSelected && "ring-2 ring-white ring-offset-2 ring-offset-zinc-900 z-10",
                                // Default border when not dragging
                                !draggedTask && (isToday ? "border-2 border-waxy-lime" : "border border-zinc-700/50"),
                                // Show category-colored borders while dragging
                                draggedTask && getDragPreviewBorderClass(day),
                                // Highlight the specific cell being dragged over
                                dragOverDate === dateKey && "bg-opacity-30 scale-[1.02]",
                                draggedTask && predictCategoryForDay(draggedTask, day) === "good" && dragOverDate === dateKey && "bg-[#2DD881]/20",
                                draggedTask && predictCategoryForDay(draggedTask, day) === "okay" && dragOverDate === dateKey && "bg-[#FFE733]/20",
                                draggedTask && predictCategoryForDay(draggedTask, day) === "bad" && dragOverDate === dateKey && "bg-red-500/20"
                            )}
                            onClick={() => {
                                setSelectedDate(day);
                                onDayClick?.(day);
                            }}
                            onDragOver={(e) => handleDragOver(e, dateKey)}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDrop(e, day)}
                        >
                            {/* Date number */}
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-1">
                                    <span className={cn(
                                        "font-bold rounded-full w-7 h-7 flex items-center justify-center text-sm",
                                        isToday && "bg-waxy-lime text-black"
                                    )}>
                                        {formattedDate}
                                    </span>
                                    <span className="text-xs text-gray-500">{monthLabel}</span>
                                </div>
                                {/* Category indicator dots */}
                                {!compact && getCategoryDots(categories)}
                            </div>

                            {/* Tasks preview (non-compact mode) */}
                            {!compact && dayTasks.length > 0 && (
                                <div className="mt-2 w-full space-y-1 overflow-hidden flex-1">
                                    {dayTasks.slice(0, 3).map((task) => (
                                        <div
                                            key={task.id}
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, task)}
                                            onDragEnd={handleDragEnd}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onTaskClick?.(task);
                                            }}
                                            className={cn(
                                                "text-xs px-2 py-1 rounded-lg truncate font-medium hover:opacity-80 transition-opacity cursor-grab active:cursor-grabbing",
                                                task.category === "good" && "bg-[#2DD881] text-black",
                                                task.category === "okay" && "bg-[#FFE733] text-black",
                                                task.category === "bad" && "bg-red-500 text-white",
                                                draggedTask?.id === task.id && "opacity-50"
                                            )}
                                        >
                                            {task.title}
                                        </div>
                                    ))}
                                    {dayTasks.length > 3 && (
                                        <span className="text-xs text-gray-400 font-medium">+{dayTasks.length - 3} more</span>
                                    )}
                                </div>
                            )}

                            {/* Compact mode: show dot indicator only */}
                            {compact && hasCategories && (
                                <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
                                    {getCategoryDots(categories)}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className={cn("w-full h-full flex flex-col", className)}>
            {renderHeader()}
            {renderDaysHeader()}
            <div className="flex-1 overflow-auto">
                {renderCells()}
            </div>
        </div>
    );
};

export default CustomCalendar;
