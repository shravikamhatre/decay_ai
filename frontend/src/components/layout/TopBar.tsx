import { motion } from "framer-motion";
import { Bell, Search, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

interface TopBarProps {
  title?: string;
}

const TopBar = () => {
  return (
    <motion.header
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 backdrop-blur-xl px-6"
    >
      {/* Left section (previously Right) - Profile, Notifs, Balance */}
      <div className="flex items-center gap-4">
        {/* Profile */}
        <button className="flex items-center gap-3 rounded-xl bg-secondary/50 py-1.5 pl-1.5 pr-3 transition-colors hover:bg-secondary">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
            <AvatarFallback className="bg-primary text-primary-foreground">JD</AvatarFallback>
          </Avatar>
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-foreground">John Doe</p>
            <p className="text-xs text-muted-foreground">Pro Creator</p>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>

        {/* Notifications */}
        <button className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/50 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
          <Bell className="h-5 w-5" />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[10px] font-medium text-black">
            3
          </span>
        </button>

        {/* Balance indicator */}
        <div className="hidden lg:flex items-center gap-2 rounded-xl bg-secondary/50 px-4 py-2">
          <span className="text-sm text-muted-foreground">Engagement:</span>
          <span className="text-sm font-bold text-primary">98.5%</span>
        </div>
      </div>

      {/* Center section - Search */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search posts, trends, creators..."
            className="w-80 bg-secondary/50 border-0 pl-10 focus-visible:ring-1 focus-visible:ring-primary"
          />
        </div>
      </div>

      {/* Right section - spacer to balance layout if needed, or just empty for Menu */}
      <div className="flex items-center gap-6">
        {/* Placeholder for future right-side elements, keeping empty for Menu transparency */}
      </div>
    </motion.header>
  );
};

export default TopBar;
