import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const TopBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  // Get user initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Handle profile click - navigate based on current route
  const handleProfileClick = () => {
    const currentPath = location.pathname;
    if (currentPath === "/settings") {
      navigate("/calendar");
    } else {
      navigate("/settings");
    }
  };

  const userName = user?.name || "User";
  const userInitials = getInitials(userName);

  return (
    <motion.header
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/5 bg-black/20 backdrop-blur-2xl px-6 supports-[backdrop-filter]:bg-black/10"
    >
      {/* Left section - Profile, Balance */}
      <div className="flex items-center gap-4">
        {/* Profile - Click to toggle between settings and calendar */}
        <button
          onClick={handleProfileClick}
          className="flex items-center gap-3 rounded-xl bg-zinc-900/50 border border-white/5 py-1.5 pl-1.5 pr-3 transition-colors hover:bg-zinc-800 hover:border-white/10"
        >
          <Avatar className="h-8 w-8 border border-white/10">
            <AvatarImage src="" />
            <AvatarFallback className="bg-zinc-800 text-white">{userInitials}</AvatarFallback>
          </Avatar>
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-white">{userName}</p>
            <p className="text-xs text-zinc-400">Pro Creator</p>
          </div>
          <ChevronDown className="h-4 w-4 text-zinc-400" />
        </button>
      </div>

      {/* Right section - spacer to balance layout if needed */}
      <div className="flex items-center gap-6">
        {/* Empty for Menu transparency */}
      </div>
    </motion.header>
  );
};

export default TopBar;

