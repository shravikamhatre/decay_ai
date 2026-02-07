import { useState } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CustomCalendarProps {
    className?: string;
    compact?: boolean; // Prop to adjust layout for smaller containers (e.g., widget)
    dayStatus?: Record<string, "green" | "yellow" | "red">; // For future customization
    onDayClick?: (day: Date) => void;
}

const CustomCalendar = ({ className, compact = false, dayStatus, onDayClick }: CustomCalendarProps) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

    const renderHeader = () => {
        return (
            <div className="flex items-center justify-between mb-4">
                <Button variant="ghost" size="icon" onClick={prevMonth}>
                    <ChevronLeft className="h-5 w-5" />
                </Button>
                <h2 className={cn("font-bold text-gray-800", compact ? "text-lg" : "text-2xl")}>
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
        return <div className="grid grid-cols-7 mb-2 border-b pb-2">{days}</div>;
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

                // Determine day status color if provided
                const dateKey = format(day, "yyyy-MM-dd");
                const status = dayStatus ? dayStatus[dateKey] : undefined;
                let statusClass = "";
                if (status === "green") statusClass = "bg-green-100 text-green-800 border-green-200";
                if (status === "yellow") statusClass = "bg-yellow-100 text-yellow-800 border-yellow-200";
                if (status === "red") statusClass = "bg-red-100 text-red-800 border-red-200";

                days.push(
                    <div
                        key={day.toString()}
                        className={cn(
                            "relative border transition-all duration-200 cursor-pointer flex flex-col items-start justify-start p-2 group",
                            compact ? "h-16 text-sm" : "h-32 text-base", // Height adjustment
                            !isCurrentMonth ? "bg-secondary/30 text-muted-foreground" : "bg-card text-card-foreground hover:bg-accent/50",
                            isSelected && "ring-2 ring-primary ring-offset-2 z-10",
                            statusClass
                        )}
                        onClick={() => {
                            setSelectedDate(currentDay);
                            onDayClick?.(currentDay);
                        }}
                    >
                        <span className={cn(
                            "font-medium rounded-full w-7 h-7 flex items-center justify-center",
                            isSameDay(day, new Date()) && "bg-primary text-primary-foreground"
                        )}>
                            {formattedDate}
                        </span>

                        {/* Placeholder for future content/events */}
                        {!compact && status && (
                            <div className="mt-2 w-full">
                                <span className="text-xs font-semibold px-2 py-0.5 rounded-full capitalize bg-white/50 border border-black/5">
                                    {status}
                                </span>
                            </div>
                        )}
                    </div>
                );
                day = addDays(day, 1);
            }
            rows.push(
                <div key={day.toString()} className="grid grid-cols-7 gap-1">
                    {days}
                </div>
            );
            days = [];
        }
        return <div className="space-y-1">{rows}</div>;
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
