import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FlipPillProps {
    children: React.ReactNode;
    className?: string;
}

const FlipPill = ({ children, className }: FlipPillProps) => {
    return (
        <div style={{ perspective: "1000px" }} className="inline-block">
            <motion.div
                initial={{ rotateX: 0 }}
                whileHover={{ rotateX: 360 }}
                transition={{
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1] // Custom ease for smooth finish
                }}
                className={cn(
                    "cursor-pointer inline-flex items-center justify-center select-none",
                    className
                )}
                style={{ transformStyle: "preserve-3d" }}
            >
                {children}
            </motion.div>
        </div>
    );
};

export default FlipPill;
