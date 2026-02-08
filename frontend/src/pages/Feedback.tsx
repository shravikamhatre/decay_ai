import { useState } from "react";
import { motion } from "framer-motion";
import { Smile, Zap, Lightbulb, BookOpen, Layers, X, Check, ThumbsUp, ThumbsDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const moreOptions = [
    { id: "funny", label: "Funny", icon: Smile, color: "waxy-yellow" },
    { id: "smart", label: "Smart", icon: Zap, color: "waxy-lime" },
    { id: "informative", label: "Informative", icon: Lightbulb, color: "waxy-blue" },
    { id: "educational", label: "Educational", icon: BookOpen, color: "waxy-pink" },
];

const lessOptions = [
    { id: "complex", label: "Complex Jargon", icon: Layers, color: "zinc-500" },
    { id: "generic", label: "Generic Advice", icon: X, color: "zinc-500" },
    { id: "clickbait", label: "Clickbait", icon: ThumbsDown, color: "zinc-500" },
];

const getOptionStyles = (color: string, isSelected: boolean) => {
    if (!isSelected) return "bg-zinc-900/50 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-white";

    switch (color) {
        case "waxy-yellow":
            return "bg-waxy-yellow/20 text-waxy-yellow border-waxy-yellow shadow-[0_0_15px_rgba(253,224,71,0.3)]";
        case "waxy-lime":
            return "bg-waxy-lime/20 text-waxy-lime border-waxy-lime shadow-[0_0_15px_rgba(132,204,22,0.3)]";
        case "waxy-blue":
            return "bg-waxy-blue/20 text-waxy-blue border-waxy-blue shadow-[0_0_15px_rgba(59,130,246,0.3)]";
        case "waxy-pink":
            return "bg-waxy-pink/20 text-waxy-pink border-waxy-pink shadow-[0_0_15px_rgba(244,114,182,0.3)]";
        case "waxy-terracotta":
            return "bg-waxy-terracotta/20 text-waxy-terracotta border-waxy-terracotta shadow-[0_0_15px_rgba(249,115,22,0.3)]";
        default:
            return "bg-zinc-800 text-white border-zinc-700";
    }
};

const getIconStyles = (color: string, isSelected: boolean) => {
    if (!isSelected) return "bg-black text-zinc-500";

    switch (color) {
        case "waxy-yellow": return "bg-waxy-yellow/20 text-waxy-yellow";
        case "waxy-lime": return "bg-waxy-lime/20 text-waxy-lime";
        case "waxy-blue": return "bg-waxy-blue/20 text-waxy-blue";
        case "waxy-pink": return "bg-waxy-pink/20 text-waxy-pink";
        case "waxy-terracotta": return "bg-waxy-terracotta/20 text-waxy-terracotta";
        default: return "bg-zinc-700 text-white";
    }
};

const getCheckColor = (color: string) => {
    switch (color) {
        case "waxy-yellow": return "text-waxy-yellow";
        case "waxy-lime": return "text-waxy-lime";
        case "waxy-blue": return "text-waxy-blue";
        case "waxy-pink": return "text-waxy-pink";
        case "waxy-terracotta": return "text-waxy-terracotta";
        default: return "text-white";
    }
};

const Feedback = () => {
    const [selectedMore, setSelectedMore] = useState<string[]>([]);
    const [selectedLess, setSelectedLess] = useState<string[]>([]);

    const toggleSelection = (id: string, type: "more" | "less") => {
        if (type === "more") {
            setSelectedMore(prev =>
                prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
            );
        } else {
            setSelectedLess(prev =>
                prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
            );
        }
    };

    const handleSubmit = () => {
        toast.success("Feedback submitted! We'll tailor your content accordingly.");
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <div className="px-6 md:px-12 pt-8 pb-6 border-b border-zinc-800">
                <h1 className="font-airone text-4xl md:text-5xl font-bold lowercase tracking-tight">feedback</h1>
                <p className="text-zinc-400 mt-2">help us tailor your growth strategy</p>
            </div>

            <div className="px-6 md:px-12 py-8 max-w-4xl mx-auto space-y-12">

                {/* More of Section */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2.5 bg-waxy-lime/20 rounded-full">
                            <ThumbsUp className="w-6 h-6 text-waxy-lime" />
                        </div>
                        <h2 className="font-airone text-3xl font-bold lowercase">i want my content to be more...</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {moreOptions.map((option) => (
                            <motion.button
                                key={option.id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => toggleSelection(option.id, "more")}
                                className={cn(
                                    "flex items-center gap-4 p-5 rounded-2xl border text-left transition-all",
                                    getOptionStyles(option.color, selectedMore.includes(option.id))
                                )}
                            >
                                <div className={cn(
                                    "h-10 w-10 rounded-xl flex items-center justify-center transition-colors",
                                    getIconStyles(option.color, selectedMore.includes(option.id))
                                )}>
                                    <option.icon className="h-5 w-5" />
                                </div>
                                <span className={cn(
                                    "text-lg font-bold",
                                    selectedMore.includes(option.id) ? "text-white" : "text-zinc-400"
                                )}>
                                    {option.label}
                                </span>
                                {selectedMore.includes(option.id) && (
                                    <Check className={cn("ml-auto h-5 w-5", getCheckColor(option.color))} />
                                )}
                            </motion.button>
                        ))}
                    </div>
                </section>

                {/* Less of Section */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2.5 bg-waxy-terracotta/20 rounded-full">
                            <ThumbsDown className="w-6 h-6 text-waxy-terracotta" />
                        </div>
                        <h2 className="font-airone text-3xl font-bold lowercase">i want less of...</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {lessOptions.map((option) => (
                            <motion.button
                                key={option.id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => toggleSelection(option.id, "less")}
                                className={cn(
                                    "flex items-center gap-4 p-5 rounded-2xl border text-left transition-all",
                                    getOptionStyles(option.color, selectedLess.includes(option.id))
                                )}
                            >
                                <div className={cn(
                                    "h-10 w-10 rounded-xl flex items-center justify-center transition-colors",
                                    getIconStyles(option.color, selectedLess.includes(option.id))
                                )}>
                                    <option.icon className="h-5 w-5" />
                                </div>
                                <span className={cn(
                                    "text-lg font-bold",
                                    selectedLess.includes(option.id) ? "text-white" : "text-zinc-400"
                                )}>
                                    {option.label}
                                </span>
                                {selectedLess.includes(option.id) && (
                                    <Check className={cn("ml-auto h-5 w-5", getCheckColor(option.color))} />
                                )}
                            </motion.button>
                        ))}
                    </div>
                </section>

                <div className="pt-6">
                    <Button
                        onClick={handleSubmit}
                        className="w-full md:w-auto px-8 py-6 rounded-full bg-white text-black font-bold text-lg hover:bg-zinc-200 transition-colors"
                    >
                        Save Preferences
                    </Button>
                </div>
            </div>
        </div>
    );
};
export default Feedback;
