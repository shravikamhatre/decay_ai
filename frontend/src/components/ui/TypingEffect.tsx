import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface TypingEffectProps {
    text: string;
    className?: string;
    cursorClassName?: string;
    speed?: number;
    startDelay?: number;
}

const TypingEffect = ({
    text,
    className,
    cursorClassName,
    speed = 50,
    startDelay = 0,
}: TypingEffectProps) => {
    const [displayedText, setDisplayedText] = useState("");
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.5 });
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        if (isInView && !hasStarted) {
            const startTimeout = setTimeout(() => {
                setHasStarted(true);
            }, startDelay);
            return () => clearTimeout(startTimeout);
        }
    }, [isInView, hasStarted, startDelay]);

    useEffect(() => {
        if (hasStarted) {
            let index = 0;
            const interval = setInterval(() => {
                if (index <= text.length) {
                    setDisplayedText(text.slice(0, index));
                    index++;
                } else {
                    clearInterval(interval);
                }
            }, speed);
            return () => clearInterval(interval);
        }
    }, [hasStarted, text, speed]);

    return (
        <span ref={containerRef} className={cn("inline-block", className)}>
            {displayedText}
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                className={cn(
                    "inline-block w-[0.1em] h-[1em] translate-y-[0.1em] bg-current ml-1",
                    cursorClassName
                )}
            />
        </span>
    );
};

export default TypingEffect;
