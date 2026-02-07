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
    ChevronLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// Options Data
const useCases = [
    { id: "agency", label: "Company/Agency", description: "Managing content for brands or clients", icon: Building2 },
    { id: "creator", label: "Personal Creator", description: "Growing my own social media presence", icon: User },
    { id: "brand", label: "Influencer/Brand", description: "Building my personal brand", icon: Target },
    { id: "manager", label: "Social Media Manager", description: "Professional content strategy", icon: BarChart3 },
];

const niches = [
    "Fashion & Beauty", "Travel & Adventure", "Food & Cooking", "Fitness & Health",
    "Tech & Gadgets", "Comedy & Entertainment", "Dance & Music", "DIY & Crafts",
    "Business & Finance", "Gaming & Esports", "Art & Design", "Education & Learning"
];

const contentFormats = [
    { id: "memes", label: "Memes & Image Posts", icon: "🎭" },
    { id: "short-video", label: "Short-form Video", icon: "🎬" },
    { id: "stories", label: "Storytime & Narratives", icon: "📖" },
    { id: "dance", label: "Dance & Lip Sync", icon: "🎵" },
    { id: "creative", label: "Creative & Aesthetic", icon: "🎨" },
    { id: "educational", label: "Educational Content", icon: "📚" },
    { id: "text", label: "Text-based Posts", icon: "💬" },
    { id: "challenges", label: "Challenges & Trends", icon: "🎪" },
    { id: "audio", label: "Audio-focused Content", icon: "🎙️" },
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
        // Save to localStorage/Backend here
        localStorage.setItem("onboarding_completed", "true");
        localStorage.setItem("user_preferences", JSON.stringify(formData));
        navigate("/dashboard");
    };

    // Validation
    const isStepValid = () => {
        switch (step) {
            case 1: return formData.name.length >= 2;
            case 2: return !!formData.useCase;
            case 3: return formData.niches.length > 0 && formData.niches.length <= 5;
            case 4: return formData.formats.length > 0;
            default: return false;
        }
    };

    const toggleSelection = (field: 'niches' | 'formats', value: string) => {
        setFormData(prev => {
            const current = prev[field];
            const exists = current.includes(value);

            if (field === 'niches') {
                if (exists) return { ...prev, [field]: current.filter(item => item !== value) };
                if (current.length >= 5) return prev; // Max 5 limit
                return { ...prev, [field]: [...current, value] };
            }

            // For formats (no limit specified, but good to keep logic separate if needed)
            if (exists) return { ...prev, [field]: current.filter(item => item !== value) };
            return { ...prev, [field]: [...current, value] };
        });
    };

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
            {/* Progress Bar */}
            <div className="w-full max-w-xl mb-8">
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>Step {step} of {totalSteps}</span>
                    <span>{Math.round((step / totalSteps) * 100)}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-primary"
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
                        className="glass-card p-8"
                    >
                        {/* Step 1: Profile Setup */}
                        {step === 1 && (
                            <div className="space-y-6">
                                <div className="text-center">
                                    <h1 className="text-2xl font-bold text-foreground mb-2">Let's set up your profile</h1>
                                    <p className="text-muted-foreground">Tell us who you are</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            placeholder="Enter your name or brand name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="bg-secondary/50"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Use Case */}
                        {step === 2 && (
                            <div className="space-y-6">
                                <div className="text-center">
                                    <h1 className="text-2xl font-bold text-foreground mb-2">How will you use Shelf Life?</h1>
                                    <p className="text-muted-foreground">This helps us customize your experience</p>
                                </div>

                                <div className="grid gap-3">
                                    {useCases.map((useCase) => (
                                        <button
                                            key={useCase.id}
                                            onClick={() => setFormData({ ...formData, useCase: useCase.id })}
                                            className={cn(
                                                "flex items-center gap-4 p-4 rounded-xl border transition-all text-left group",
                                                formData.useCase === useCase.id
                                                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                                                    : "border-border bg-secondary/20 hover:border-primary/50 hover:bg-secondary/40"
                                            )}
                                        >
                                            <div className={cn(
                                                "h-10 w-10 rounded-lg flex items-center justify-center transition-colors",
                                                formData.useCase === useCase.id ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground group-hover:bg-secondary/80"
                                            )}>
                                                <useCase.icon className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-foreground">{useCase.label}</p>
                                                <p className="text-sm text-muted-foreground">{useCase.description}</p>
                                            </div>
                                            {formData.useCase === useCase.id && (
                                                <Check className="h-5 w-5 text-primary ml-auto" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Step 3: Niche Selection */}
                        {step === 3 && (
                            <div className="space-y-6">
                                <div className="text-center">
                                    <h1 className="text-2xl font-bold text-foreground mb-2">What type of content do you create?</h1>
                                    <p className="text-muted-foreground">Select between 1 and 5 categories</p>
                                </div>

                                <div className="flex flex-wrap gap-2 justify-center">
                                    {niches.map((niche) => (
                                        <button
                                            key={niche}
                                            onClick={() => toggleSelection('niches', niche)}
                                            className={cn(
                                                "px-4 py-2 rounded-full text-sm font-medium transition-all border",
                                                formData.niches.includes(niche)
                                                    ? "bg-primary text-primary-foreground border-primary"
                                                    : "bg-secondary/30 text-muted-foreground border-transparent hover:bg-secondary/60 hover:text-foreground"
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
                            <div className="space-y-6">
                                <div className="text-center">
                                    <h1 className="text-2xl font-bold text-foreground mb-2">What formats do you focus on?</h1>
                                    <p className="text-muted-foreground">We'll prioritize trends for these formats</p>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {contentFormats.map((format) => (
                                        <button
                                            key={format.id}
                                            onClick={() => toggleSelection('formats', format.id)}
                                            className={cn(
                                                "p-3 rounded-xl border text-left transition-all flex flex-col gap-2",
                                                formData.formats.includes(format.id)
                                                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                                                    : "border-border bg-secondary/20 hover:border-primary/50"
                                            )}
                                        >
                                            <span className="text-2xl">{format.icon}</span>
                                            <span className={cn(
                                                "text-sm font-medium",
                                                formData.formats.includes(format.id) ? "text-primary" : "text-muted-foreground"
                                            )}>
                                                {format.label}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex items-center gap-3 mt-8 pt-6 border-t border-border/50">
                            {step > 1 && (
                                <Button
                                    variant="ghost"
                                    onClick={handleBack}
                                    className="text-muted-foreground hover:text-foreground"
                                >
                                    <ChevronLeft className="h-4 w-4 mr-2" />
                                    Back
                                </Button>
                            )}
                            <Button
                                onClick={step === totalSteps ? handleComplete : handleNext}
                                disabled={!isStepValid()}
                                className={cn(
                                    "ml-auto min-w-[120px]",
                                    step === totalSteps
                                        ? "bg-primary hover:bg-primary/90"
                                        : "bg-primary hover:bg-primary/90"
                                )}
                            >
                                {step === totalSteps ? (
                                    <>
                                        Complete Setup
                                        <Check className="h-4 w-4 ml-2" />
                                    </>
                                ) : (
                                    <>
                                        Next
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
