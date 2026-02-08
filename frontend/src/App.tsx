import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import CalendarPage from "@/pages/Calendar";
import Feedback from "@/pages/Feedback";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Onboarding from "@/pages/Onboarding";
import Settings from "@/pages/Settings";
import Signup from "@/pages/Signup";
import NotFound from "@/pages/NotFound";
import TrendAnalysis from "@/pages/TrendAnalysis";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
            <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
                <TooltipProvider>
                    <Toaster />
                    <Sonner />
                    <BrowserRouter>
                        <Routes>
                            {/* Public routes */}
                            <Route path="/" element={<Landing />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />

                            {/* Protected routes */}
                            <Route path="/onboarding" element={
                                <ProtectedRoute>
                                    <Onboarding />
                                </ProtectedRoute>
                            } />

                            <Route element={
                                <ProtectedRoute>
                                    <AppLayout />
                                </ProtectedRoute>
                            }>
                                <Route path="/calendar" element={<CalendarPage />} />
                                <Route path="/feedback" element={<Feedback />} />
                                <Route path="/settings" element={<Settings />} />
                                <Route path="/trend-analysis" element={<TrendAnalysis />} />
                            </Route>

                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </BrowserRouter>
                </TooltipProvider>
            </ThemeProvider>
        </AuthProvider>
    </QueryClientProvider>
);

export default App;

