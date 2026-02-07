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
      className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/5 bg-black/20 backdrop-blur-2xl px-6 supports-[backdrop-filter]:bg-black/10"
    >
      {/* Left section (previously Right) - Profile, Notifs, Balance */}
      <div className="flex items-center gap-4">
        {/* Profile */}
        <button className="flex items-center gap-3 rounded-xl bg-zinc-900/50 border border-white/5 py-1.5 pl-1.5 pr-3 transition-colors hover:bg-zinc-800 hover:border-white/10">
          <Avatar className="h-8 w-8 border border-white/10">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
            <AvatarFallback className="bg-zinc-800 text-white">JD</AvatarFallback>
          </Avatar>
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-white">John Doe</p>
            <p className="text-xs text-zinc-400">Pro Creator</p>
          </div>
          <ChevronDown className="h-4 w-4 text-zinc-400" />
        </button>

        {/* Notifications */}
        <button className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900/50 border border-white/5 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white hover:border-white/10">
          <Bell className="h-5 w-5" />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-waxy-terracotta text-[10px] font-bold text-white shadow-sm">
            3
          </span>
        </button>

        {/* Balance indicator */}
        <div className="hidden lg:flex items-center gap-2 rounded-xl bg-zinc-900/50 border border-white/5 px-4 py-2 hover:bg-zinc-800 transition-colors">
          <span className="text-sm text-zinc-400">Engagement:</span>
          <span className="text-sm font-bold text-waxy-lime">98.5%</span>
        </div>
      </div>

      {/* Center section - Search */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 group-focus-within:text-white transition-colors" />
          <Input
            placeholder="Search posts, trends, creators..."
            className="w-80 bg-zinc-900/50 border-white/5 pl-10 text-white placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-white/20 focus-visible:border-white/10 transition-all"
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
