import { motion } from "framer-motion";
import { Bell, ChevronDown, TrendingUp, MessageSquare, Heart, UserPlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

// Sample notifications data
const notifications = [
  {
    id: 1,
    type: "trend",
    icon: TrendingUp,
    title: "Trending Alert",
    message: "\"old money edit\" is going viral! Post now for maximum reach.",
    time: "2m ago",
    unread: true,
  },
  {
    id: 2,
    type: "engagement",
    icon: Heart,
    title: "Engagement Spike",
    message: "Your recent post gained 2.4k likes in the last hour!",
    time: "15m ago",
    unread: true,
  },
  {
    id: 3,
    type: "comment",
    icon: MessageSquare,
    title: "New Comments",
    message: "12 new comments on your cooking tutorial.",
    time: "1h ago",
    unread: true,
  },
  {
    id: 4,
    type: "follower",
    icon: UserPlus,
    title: "New Followers",
    message: "You gained 156 new followers today!",
    time: "3h ago",
    unread: false,
  },
];

const TopBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [notifOpen, setNotifOpen] = useState(false);
  const [readNotifs, setReadNotifs] = useState<number[]>([]);

  const unreadCount = notifications.filter(n => n.unread && !readNotifs.includes(n.id)).length;

  // Handle profile click - navigate based on current route
  const handleProfileClick = () => {
    const currentPath = location.pathname;
    if (currentPath === "/settings") {
      navigate("/calendar");
    } else {
      navigate("/settings");
    }
  };

  // Mark notification as read when clicked
  const handleNotifClick = (id: number) => {
    setReadNotifs(prev => [...prev, id]);
  };

  return (
    <motion.header
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/5 bg-black/20 backdrop-blur-2xl px-6 supports-[backdrop-filter]:bg-black/10"
    >
      {/* Left section - Profile, Notifs, Balance */}
      <div className="flex items-center gap-4">
        {/* Profile - Click to toggle between settings and calendar */}
        <button
          onClick={handleProfileClick}
          className="flex items-center gap-3 rounded-xl bg-zinc-900/50 border border-white/5 py-1.5 pl-1.5 pr-3 transition-colors hover:bg-zinc-800 hover:border-white/10"
        >
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

        {/* Notifications Popover */}
        <Popover open={notifOpen} onOpenChange={setNotifOpen}>
          <PopoverTrigger asChild>
            <button className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900/50 border border-white/5 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white hover:border-white/10">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-waxy-terracotta text-[10px] font-bold text-white shadow-sm animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent
            className="w-80 p-0 bg-zinc-900 border-zinc-800 shadow-2xl"
            align="start"
            sideOffset={8}
          >
            <div className="p-4 border-b border-zinc-800">
              <h3 className="font-semibold text-white">Notifications</h3>
              <p className="text-xs text-zinc-500">{unreadCount} unread</p>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.map((notif) => {
                const Icon = notif.icon;
                const isUnread = notif.unread && !readNotifs.includes(notif.id);
                return (
                  <button
                    key={notif.id}
                    onClick={() => handleNotifClick(notif.id)}
                    className={`w-full flex items-start gap-3 p-4 text-left transition-colors hover:bg-zinc-800/50 border-b border-zinc-800/50 last:border-0 ${isUnread ? "bg-zinc-800/30" : ""
                      }`}
                  >
                    <div className={`flex-shrink-0 p-2 rounded-lg ${notif.type === "trend" ? "bg-waxy-lime/20 text-waxy-lime" :
                        notif.type === "engagement" ? "bg-red-500/20 text-red-400" :
                          notif.type === "comment" ? "bg-blue-500/20 text-blue-400" :
                            "bg-purple-500/20 text-purple-400"
                      }`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-white truncate">{notif.title}</p>
                        {isUnread && (
                          <span className="w-2 h-2 rounded-full bg-waxy-lime flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-zinc-400 line-clamp-2">{notif.message}</p>
                      <p className="text-xs text-zinc-600 mt-1">{notif.time}</p>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="p-3 border-t border-zinc-800">
              <button className="w-full text-center text-sm text-waxy-lime hover:text-waxy-lime/80 transition-colors">
                View all notifications
              </button>
            </div>
          </PopoverContent>
        </Popover>

        {/* Balance indicator */}
        <div className="hidden lg:flex items-center gap-2 rounded-xl bg-zinc-900/50 border border-white/5 px-4 py-2 hover:bg-zinc-800 transition-colors">
          <span className="text-sm text-zinc-400">Engagement:</span>
          <span className="text-sm font-bold text-waxy-lime">98.5%</span>
        </div>
      </div>

      {/* Right section - spacer to balance layout if needed */}
      <div className="flex items-center gap-6">
        {/* Empty for Menu transparency */}
      </div>
    </motion.header>
  );
};

export default TopBar;
