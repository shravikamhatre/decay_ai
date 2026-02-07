import CustomCalendar from "@/components/CustomCalendar";
import { useState } from "react";

const CalendarPage = () => {
    const [date, setDate] = useState<Date>(new Date());

    return (
        <div className="space-y-6 h-[calc(100vh-10rem)] flex flex-col">
            <div className="flex items-center justify-between shrink-0">
                <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
            </div>

            <div className="glass-card p-6 flex-1 flex flex-col overflow-hidden">
                <CustomCalendar
                    onDayClick={setDate}
                    // Example status for demonstration
                    dayStatus={{
                        "2024-02-15": "green",
                        "2024-02-20": "yellow",
                        "2024-02-25": "red"
                    }}
                />
            </div>
        </div>
    );
};

export default CalendarPage;
