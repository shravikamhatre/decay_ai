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

// Generate gradient class based on active categories
const getGlowGradientStyle = (categories: DayCategories | undefined, compact: boolean) => {
    if (!categories) return {};

    const { good, okay, bad } = categories;
    const activeColors: string[] = [];

    // Order: green (good) -> yellow (okay) -> red (bad) - MORE INTENSE COLORS
    if (good) activeColors.push("rgba(22, 163, 74, 0.9)");  // green-600 more saturated
    if (okay) activeColors.push("rgba(202, 138, 4, 0.9)");   // yellow-600 more saturated
    if (bad) activeColors.push("rgba(220, 38, 38, 0.9)");    // red-600 more saturated

    if (activeColors.length === 0) return {};

    // Create gradient string
    let gradient: string;
    if (activeColors.length === 1) {
        gradient = activeColors[0];
    } else if (activeColors.length === 2) {
        gradient = `linear-gradient(135deg, ${activeColors[0]} 0%, ${activeColors[1]} 100%)`;
    } else {
        gradient = `linear-gradient(135deg, ${activeColors[0]} 0%, ${activeColors[1]} 50%, ${activeColors[2]} 100%)`;
    }

    // Box shadow for glow effect - MORE INTENSE
    const glowShadows = activeColors.map((color, i) => {
        const spread = compact ? 10 : 16;
        return `0 0 ${spread + i * 6}px ${color.replace("0.9", "0.7")}`;
    }).join(", ");

    return {
        background: gradient,
        boxShadow: glowShadows,
    };
};

// Get category indicator dots - using StaggeredMenu-inspired colors
const getCategoryDots = (categories: DayCategories | undefined) => {
    if (!categories) return null;
    const { good, okay, bad } = categories;

    return (
        <div className="flex gap-1 mt-1">
            {good && <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 ring-1 ring-black/30 shadow-sm shadow-emerald-400/50" />}
            {okay && <span className="w-2.5 h-2.5 rounded-full bg-amber-400 ring-1 ring-black/30 shadow-sm shadow-amber-400/50" />}
            {bad && <span className="w-2.5 h-2.5 rounded-full bg-orange-500 ring-1 ring-black/30 shadow-sm shadow-orange-500/50" />}
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
                <Button variant="ghost" size="icon" onClick={prevMonth}>
                    <ChevronLeft className="h-5 w-5" />
                </Button>
                <h2 className={cn("font-display font-bold text-foreground", compact ? "text-lg" : "text-2xl")}>
                    {format(currentMonth, "MMMM yyyy")}
                </h2>
                <Button variant="ghost" size="icon" onClick={nextMonth}>
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
                <div key={i} className="text-center font-medium text-muted-foreground py-2 uppercase text-xs tracking-wider">
                    {format(addDays(startDate, i), "EEE")}
                </div>
            );
        }
        return <div className="grid grid-cols-7 mb-2 border-b border-border pb-2">{days}</div>;
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
                            "relative border border-border/50 transition-all duration-300 cursor-pointer flex flex-col items-start justify-start p-2 group rounded-lg",
                            compact ? "h-16 text-sm" : "h-28 text-base",
                            !isCurrentMonth ? "bg-secondary/20 text-muted-foreground opacity-50" : "bg-card text-card-foreground hover:bg-accent/30",
                            isSelected && "ring-2 ring-primary ring-offset-2 ring-offset-background z-10"
                        )}
                        onClick={() => {
                            setSelectedDate(currentDay);
                            onDayClick?.(currentDay);
                        }}
                    >
                        {/* Date number */}
                        <div className="flex items-center justify-between w-full">
                            <span className={cn(
                                "font-semibold rounded-full w-7 h-7 flex items-center justify-center text-sm",
                                isToday && "bg-primary text-primary-foreground shadow-warm"
                            )}>
                                {formattedDate}
                            </span>
                            {/* Category indicator dots */}
                            {!compact && getCategoryDots(categories)}
                        </div>

                        {/* Tasks preview (non-compact mode) - StaggeredMenu-inspired pastel colors */}
                        {!compact && dayTasks.length > 0 && (
                            <div className="mt-2 w-full space-y-1 overflow-hidden">
                                {dayTasks.slice(0, 2).map((task) => (
                                    <div
                                        key={task.id}
                                        className={cn(
                                            "text-xs px-2 py-0.5 rounded truncate font-medium",
                                            task.category === "good" && "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300 border border-emerald-300/50",
                                            task.category === "okay" && "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300 border border-amber-300/50",
                                            task.category === "bad" && "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300 border border-orange-300/50"
                                        )}
                                    >
                                        {task.title}
                                    </div>
                                ))}
                                {dayTasks.length > 2 && (
                                    <span className="text-xs text-muted-foreground font-medium">+{dayTasks.length - 2} more</span>
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
