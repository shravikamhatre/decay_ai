import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
    User,
    Building2,
    Users,
    Target,
    BarChart3,
    Check,
    ChevronRight,
    ChevronLeft,
    Smartphone,
    Layers,
    CircleDot,
    AlignLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

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
    { id: "reels", label: "Reels / TikTok", icon: Smartphone },
    { id: "carousel", label: "Carousels", icon: Layers },
    { id: "stories", label: "Stories", icon: CircleDot },
    { id: "text", label: "Text / Threads", icon: AlignLeft },
];

const Onboarding = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
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

    const handleComplete = () => {
        localStorage.setItem("onboarding_completed", "true");
        localStorage.setItem("user_preferences", JSON.stringify(formData));
        navigate("/calendar");
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
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 font-sans selection:bg-waxy-lime selection:text-black">
            {/* Progress Bar */}
            <div className="w-full max-w-xl mb-12">
                <div className="flex justify-between text-sm font-bold text-zinc-500 mb-2">
                    <span>Step {step} of {totalSteps}</span>
                    <span className="text-white">{Math.round((step / totalSteps) * 100)}%</span>
                </div>
                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                        className={cn("h-full", getStepColor(step))}
                        initial={{ width: 0 }}
                        animate={{ width: `${(step / totalSteps) * 100}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
            </div>

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
                                    <h1 className="font-airone text-4xl font-bold text-white mb-2">Let's set up your profile</h1>
                                    <p className="text-zinc-400">Tell us who you are so we can personalize the magic.</p>
                                </div>

                                <div className="space-y-4 text-left">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-base font-bold text-white">What should we call you?</Label>
                                        <Input
                                            id="name"
                                            placeholder="Enter your name or brand name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="h-14 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-white focus:ring-0 rounded-xl text-lg transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Use Case */}
                        {step === 2 && (
                            <div className="space-y-8 text-center">
                                <div>
                                    <h1 className="font-airone text-4xl font-bold text-white mb-2">How will you use the decay?</h1>
                                    <p className="text-zinc-400">This helps us customize your experience.</p>
                                </div>

                                <div className="grid gap-3">
                                    {useCases.map((useCase) => (
                                        <button
                                            key={useCase.id}
                                            onClick={() => setFormData({ ...formData, useCase: useCase.id })}
                                            className={cn(
                                                "flex items-center gap-4 p-5 rounded-2xl border transition-all text-left group hover:scale-[1.02]",
                                                formData.useCase === useCase.id
                                                    ? "border-waxy-yellow bg-waxy-yellow/10 text-waxy-yellow shadow-[0_0_20px_rgba(253,224,71,0.3)]"
                                                    : "border-zinc-800 bg-zinc-900/50 text-white hover:border-zinc-600 hover:shadow-sm"
                                            )}
                                        >
                                            <div className={cn(
                                                "h-12 w-12 rounded-xl flex items-center justify-center transition-colors text-xl border",
                                                formData.useCase === useCase.id
                                                    ? "bg-waxy-yellow/20 text-waxy-yellow border-waxy-yellow"
                                                    : "bg-zinc-900 text-zinc-500 border-zinc-800 group-hover:bg-zinc-800 group-hover:text-white"
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
                                    <h1 className="font-airone text-4xl font-bold text-white mb-2">What type of content?</h1>
                                    <p className="text-zinc-400">Select between 1 and 5 categories.</p>
                                </div>

                                <div className="flex flex-wrap gap-3 justify-center">
                                    {niches.map((niche) => (
                                        <button
                                            key={niche}
                                            onClick={() => toggleSelection('niches', niche)}
                                            className={cn(
                                                "px-6 py-3 rounded-full text-sm font-bold transition-all border shadow-sm hover:scale-105",
                                                formData.niches.includes(niche)
                                                    ? "bg-waxy-terracotta/20 text-waxy-terracotta border-waxy-terracotta shadow-[0_0_15px_rgba(198,107,86,0.3)]"
                                                    : "bg-zinc-900/50 text-zinc-400 border-zinc-800 hover:border-zinc-500 hover:text-white"
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
                                    <h1 className="font-airone text-4xl font-bold text-white mb-2">Your go-to formats?</h1>
                                    <p className="text-zinc-400">We'll prioritize trends for these formats.</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {contentFormats.map((format) => (
                                        <button
                                            key={format.id}
                                            onClick={() => toggleSelection('formats', format.id)}
                                            className={cn(
                                                "p-6 rounded-2xl border text-left transition-all flex flex-col gap-3 hover:scale-[1.02]",
                                                formData.formats.includes(format.id)
                                                    ? "border-waxy-pink bg-waxy-pink/10 text-waxy-pink shadow-[0_0_20px_rgba(255,77,159,0.3)]"
                                                    : "border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700 hover:text-white"
                                            )}
                                        >
                                            <span className="text-zinc-500 group-hover:text-white transition-colors">
                                                <format.icon className="h-8 w-8" />
                                            </span>
                                            <span className={cn("text-base font-bold")}>
                                                {format.label}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex items-center gap-3 mt-12 pt-6 border-t border-zinc-800">
                            {step > 1 && (
                                <Button
                                    variant="ghost"
                                    onClick={handleBack}
                                    className="text-zinc-500 hover:text-white font-semibold"
                                >
                                    <ChevronLeft className="h-4 w-4 mr-2" />
                                    Back
                                </Button>
                            )}
                            <Button
                                onClick={step === totalSteps ? handleComplete : handleNext}
                                disabled={!isStepValid()}
                                className={cn(
                                    "ml-auto h-12 px-8 font-bold rounded-full transition-all shadow-md",
                                    step === totalSteps
                                        ? "bg-white text-black hover:bg-zinc-200"
                                        : "bg-white text-black hover:bg-zinc-200"
                                )}
                            >
                                {step === totalSteps ? (
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
