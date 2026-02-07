import { useState } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from "date-fns";
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

const CustomCalendar = ({ className, compact = false, dayCategories, tasks, onDayClick }: CustomCalendarProps) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

    // Get tasks for a specific day
    const getTasksForDay = (day: Date) => {
        if (!tasks) return [];
        const dateKey = format(day, "yyyy-MM-dd");
        return tasks.filter(task => task.date === dateKey);
    };

    const renderHeader = () => {
        return (
            <div className="flex items-center justify-between mb-4">
                <Button variant="ghost" size="icon" onClick={prevMonth} className="hover:bg-gray-100 rounded-full">
                    <ChevronLeft className="h-5 w-5" />
                </Button>
                <h2 className={cn("font-airone font-bold text-black lowercase", compact ? "text-lg" : "text-2xl")}>
                    {format(currentMonth, "MMMM yyyy")}
                </h2>
                <Button variant="ghost" size="icon" onClick={nextMonth} className="hover:bg-gray-100 rounded-full">
                    <ChevronRight className="h-5 w-5" />
                </Button>
            </div>
        );
    };

    const renderDays = () => {
        const days = [];
        const startDate = startOfWeek(currentMonth);
        for (let i = 0; i < 7; i++) {
            days.push(
                <div key={i} className="text-center font-medium text-gray-400 py-2 uppercase text-xs tracking-wider">
                    {format(addDays(startDate, i), "EEE")}
                </div>
            );
        }
        return <div className="grid grid-cols-7 mb-2 border-b border-gray-100 pb-2">{days}</div>;
    };

    const renderCells = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, "d");
                const currentDay = day;
                const isSelected = isSameDay(day, selectedDate);
                const isCurrentMonth = isSameMonth(day, monthStart);
                const isToday = isSameDay(day, new Date());

                // Get categories for this day
                const dateKey = format(day, "yyyy-MM-dd");
                const categories = dayCategories ? dayCategories[dateKey] : undefined;
                const dayTasks = getTasksForDay(day);
                const hasCategories = categories && (categories.good || categories.okay || categories.bad);

                days.push(
                    <div
                        key={day.toString()}
                        className={cn(
                            "relative border border-gray-100 transition-all duration-300 cursor-pointer flex flex-col items-start justify-start p-2 group rounded-xl",
                            compact ? "h-16 text-sm" : "h-28 text-base",
                            !isCurrentMonth ? "bg-gray-50 text-gray-300" : "bg-white text-black hover:bg-gray-50",
                            isSelected && "ring-2 ring-black ring-offset-2 z-10"
                        )}
                        onClick={() => {
                            setSelectedDate(currentDay);
                            onDayClick?.(currentDay);
                        }}
                    >
                        {/* Date number */}
                        <div className="flex items-center justify-between w-full">
                            <span className={cn(
                                "font-bold rounded-full w-7 h-7 flex items-center justify-center text-sm",
                                isToday && "bg-black text-white"
                            )}>
                                {formattedDate}
                            </span>
                            {/* Category indicator dots */}
                            {!compact && getCategoryDots(categories)}
                        </div>

                        {/* Tasks preview (non-compact mode) */}
                        {!compact && dayTasks.length > 0 && (
                            <div className="mt-2 w-full space-y-1 overflow-hidden">
                                {dayTasks.slice(0, 2).map((task) => (
                                    <div
                                        key={task.id}
                                        className={cn(
                                            "text-xs px-2 py-0.5 rounded-full truncate font-medium",
                                            task.category === "good" && "bg-[#2DD881] text-black",
                                            task.category === "okay" && "bg-[#FFE733] text-black",
                                            task.category === "bad" && "bg-red-500 text-white"
                                        )}
                                    >
                                        {task.title}
                                    </div>
                                ))}
                                {dayTasks.length > 2 && (
                                    <span className="text-xs text-gray-400 font-medium">+{dayTasks.length - 2} more</span>
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
                day = addDays(day, 1);
            }
            rows.push(
                <div key={day.toString()} className="grid grid-cols-7 gap-1.5">
                    {days}
                </div>
            );
            days = [];
        }
        return <div className="space-y-1.5 p-1">{rows}</div>;
    };

    return (
        <div className={cn("w-full h-full flex flex-col", className)}>
            {renderHeader()}
            {renderDays()}
            <div className="flex-1 overflow-auto">
                {renderCells()}
            </div>
        </div>
    );
};

export default CustomCalendar;
