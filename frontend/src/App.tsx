import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { ThemeProvider } from "@/components/theme-provider";
import CalendarPage from "@/pages/Calendar";
import Dashboard from "@/pages/Dashboard";
import Insights from "@/pages/Insights";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Onboarding from "@/pages/Onboarding";
import YourPlatforms from "@/pages/YourPlatforms"; // Import YourPlatforms
import Settings from "@/pages/Settings";
import Signup from "@/pages/Signup";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/onboarding" element={<Onboarding />} />

                        <Route element={<AppLayout />}>
                            <Route path="/calendar" element={<CalendarPage />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/insights" element={<Insights />} />
                            <Route path="/your-platforms" element={<YourPlatforms />} />
                            <Route path="/settings" element={<Settings />} />
                        </Route>

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </TooltipProvider>
        </ThemeProvider>
    </QueryClientProvider>
);

export default App;
