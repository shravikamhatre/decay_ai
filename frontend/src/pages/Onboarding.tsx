import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
    User,
    Building2,
    Users,
    Check,
    ChevronRight,
    ChevronLeft,
    Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { updatePreferences } from "@/lib/api";

const useCases = [
    { id: "personal", label: "Personal Brand", icon: User, description: "For creators & influencers" },
    { id: "business", label: "Business", icon: Building2, description: "For companies & startups" },
    { id: "agency", label: "Agency", icon: Users, description: "Managing multiple accounts" },
];

const niches = [
    "Fashion & Beauty", "Travel & Adventure", "Food & Cooking", "Fitness & Health",
    "Tech & Gadgets", "Comedy & Entertainment", "Dance & Music", "DIY & Crafts",
    "Business & Finance", "Gaming & Esports", "Art & Design", "Education & Learning"
];

const contentFormats = [
    { id: "reels", label: "Reels / TikTok", icon: "📱" },
    { id: "carousel", label: "Carousels", icon: "🖼️" },
    { id: "stories", label: "Stories", icon: "⭕" },
    { id: "text", label: "Text / Threads", icon: "📝" },
];

const Onboarding = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        useCase: "",
        niches: [] as string[],
        formats: [] as string[],
    });

    const totalSteps = 4;

    const handleNext = () => {
        if (step < totalSteps) setStep(step + 1);
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleComplete = async () => {
        setIsLoading(true);
        setError("");

        try {
            const email = localStorage.getItem("user_email") || "";

            const result = await updatePreferences({
                email,
                name: formData.name,
                useCase: formData.useCase,
                niches: formData.niches,
                formats: formData.formats,
            });

            if (result.success) {
                localStorage.setItem("onboarding_completed", "true");
                localStorage.setItem("user_preferences", JSON.stringify(formData));
                navigate("/dashboard");
            } else {
                // Still navigate even if API fails - preferences saved locally
                localStorage.setItem("onboarding_completed", "true");
                localStorage.setItem("user_preferences", JSON.stringify(formData));
                navigate("/dashboard");
            }
        } catch (err) {
            // Still navigate even if API fails - preferences saved locally
            localStorage.setItem("onboarding_completed", "true");
            localStorage.setItem("user_preferences", JSON.stringify(formData));
            navigate("/dashboard");
        } finally {
            setIsLoading(false);
        }
    };

    const isStepValid = () => {
        if (step === 1) return formData.name.length > 0;
        if (step === 2) return formData.useCase.length > 0;
        if (step === 3) return formData.niches.length > 0;
        if (step === 4) return formData.formats.length > 0;
        return false;
    };

    const toggleSelection = (field: "niches" | "formats", value: string) => {
        setFormData(prev => {
            const current = prev[field];
            const exists = current.includes(value);

            if (field === "niches") {
                if (exists) return { ...prev, [field]: current.filter(item => item !== value) };
                if (current.length >= 5) return prev;
                return { ...prev, [field]: [...current, value] };
            }

            if (exists) return { ...prev, [field]: current.filter(item => item !== value) };
            return { ...prev, [field]: [...current, value] };
        });
    };

    // Color helpers for steps
    const getStepColor = (currentStep: number) => {
        switch (currentStep) {
            case 1: return "bg-waxy-lime";
            case 2: return "bg-waxy-yellow";
            case 3: return "bg-waxy-terracotta";
            case 4: return "bg-waxy-pink";
            default: return "bg-black";
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 font-sans selection:bg-waxy-lime selection:text-black">
            {/* Progress Bar */}
            <div className="w-full max-w-xl mb-12">
                <div className="flex justify-between text-sm font-bold text-gray-400 mb-2">
                    <span>Step {step} of {totalSteps}</span>
                    <span className="text-black">{Math.round((step / totalSteps) * 100)}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                        className={cn("h-full", getStepColor(step))}
                        initial={{ width: 0 }}
                        animate={{ width: `${(step / totalSteps) * 100}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="w-full max-w-xl mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
                    {error}
                </div>
            )}

            <div className="w-full max-w-xl">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Step 1: Profile Setup */}
                        {step === 1 && (
                            <div className="space-y-8 text-center">
                                <div>
                                    <h1 className="font-airone text-4xl font-bold text-black mb-2">Let's set up your profile</h1>
                                    <p className="text-gray-500">Tell us who you are so we can personalize the magic.</p>
                                </div>

                                <div className="space-y-4 text-left">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-base font-bold">What should we call you?</Label>
                                        <Input
                                            id="name"
                                            placeholder="Enter your name or brand name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="h-14 bg-gray-50 border-gray-200 focus:border-black focus:ring-0 rounded-xl text-lg transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Use Case */}
                        {step === 2 && (
                            <div className="space-y-8 text-center">
                                <div>
                                    <h1 className="font-airone text-4xl font-bold text-black mb-2">How will you use the decay?</h1>
                                    <p className="text-gray-500">This helps us customize your experience.</p>
                                </div>

                                <div className="grid gap-3">
                                    {useCases.map((useCase) => (
                                        <button
                                            key={useCase.id}
                                            onClick={() => setFormData({ ...formData, useCase: useCase.id })}
                                            className={cn(
                                                "flex items-center gap-4 p-5 rounded-2xl border transition-all text-left group hover:scale-[1.02]",
                                                formData.useCase === useCase.id
                                                    ? "border-black bg-waxy-yellow text-black shadow-waxy"
                                                    : "border-gray-100 bg-white hover:border-gray-300 hover:shadow-sm"
                                            )}
                                        >
                                            <div className={cn(
                                                "h-12 w-12 rounded-xl flex items-center justify-center transition-colors text-xl border",
                                                formData.useCase === useCase.id
                                                    ? "bg-black text-white border-black"
                                                    : "bg-gray-50 text-gray-500 border-gray-100 group-hover:bg-white"
                                            )}>
                                                <useCase.icon className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-lg">{useCase.label}</p>
                                                <p className="text-sm opacity-80">{useCase.description}</p>
                                            </div>
                                            {formData.useCase === useCase.id && (
                                                <Check className="h-6 w-6 ml-auto" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Step 3: Niche Selection */}
                        {step === 3 && (
                            <div className="space-y-8 text-center">
                                <div>
                                    <h1 className="font-airone text-4xl font-bold text-black mb-2">What type of content?</h1>
                                    <p className="text-gray-500">Select between 1 and 5 categories.</p>
                                </div>

                                <div className="flex flex-wrap gap-3 justify-center">
                                    {niches.map((niche) => (
                                        <button
                                            key={niche}
                                            onClick={() => toggleSelection('niches', niche)}
                                            className={cn(
                                                "px-6 py-3 rounded-full text-sm font-bold transition-all border shadow-sm hover:scale-105",
                                                formData.niches.includes(niche)
                                                    ? "bg-waxy-terracotta text-white border-waxy-terracotta shadow-waxy"
                                                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:text-black"
                                            )}
                                        >
                                            {niche}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Step 4: Content Format */}
                        {step === 4 && (
                            <div className="space-y-8 text-center">
                                <div>
                                    <h1 className="font-airone text-4xl font-bold text-black mb-2">Your go-to formats?</h1>
                                    <p className="text-gray-500">We'll prioritize trends for these formats.</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {contentFormats.map((format) => (
                                        <button
                                            key={format.id}
                                            onClick={() => toggleSelection('formats', format.id)}
                                            className={cn(
                                                "p-6 rounded-2xl border text-left transition-all flex flex-col gap-3 hover:scale-[1.02]",
                                                formData.formats.includes(format.id)
                                                    ? "border-black bg-waxy-pink text-white shadow-waxy"
                                                    : "border-gray-100 bg-white hover:border-gray-300 hover:shadow-sm"
                                            )}
                                        >
                                            <span className="text-3xl">{format.icon}</span>
                                            <span className={cn("text-base font-bold")}>
                                                {format.label}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex items-center gap-3 mt-12 pt-6 border-t border-gray-100">
                            {step > 1 && (
                                <Button
                                    variant="ghost"
                                    onClick={handleBack}
                                    disabled={isLoading}
                                    className="text-gray-500 hover:text-black font-semibold"
                                >
                                    <ChevronLeft className="h-4 w-4 mr-2" />
                                    Back
                                </Button>
                            )}
                            <Button
                                onClick={step === totalSteps ? handleComplete : handleNext}
                                disabled={!isStepValid() || isLoading}
                                className={cn(
                                    "ml-auto h-12 px-8 font-bold rounded-full transition-all shadow-md",
                                    "bg-black text-white hover:bg-gray-800"
                                )}
                            >
                                {isLoading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : step === totalSteps ? (
                                    <>
                                        Complete Setup
                                        <Check className="h-4 w-4 ml-2" />
                                    </>
                                ) : (
                                    <>
                                        Next Step
                                        <ChevronRight className="h-4 w-4 ml-2" />
                                    </>
                                )}
                            </Button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Onboarding;
