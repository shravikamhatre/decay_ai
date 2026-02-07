import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Sparkles,
  PieChart,
  Settings,
  LogOut,
  Sun,
  Moon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: ArrowLeftRight, label: "Scheduled Posts", path: "/scheduled-posts" },
  { icon: Sparkles, label: "Trend Insights", path: "/insights" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col bg-sidebar border-r border-sidebar-border"
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 px-6 border-b border-sidebar-border">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
          <Sun className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="text-lg font-bold text-foreground tracking-tight">Shelf Life</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          const colors = ['bg-orange-500', 'bg-blue-500', 'bg-gray-400', 'bg-green-500', 'bg-yellow-500'];
          const textColors = ['text-orange-500', 'text-blue-500', 'text-gray-400', 'text-green-500', 'text-yellow-500'];
          const bgColors = ['bg-orange-500/10', 'bg-blue-500/10', 'bg-gray-400/10', 'bg-green-500/10', 'bg-yellow-500/10'];

          return (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <NavLink
                to={item.path}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                  isActive
                    ? `${bgColors[index]} ${textColors[index]}`
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon className={cn("h-5 w-5", isActive && textColors[index])} />
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className={`ml-auto h-2 w-2 rounded-full ${colors[index]}`}
                  />
                )}
              </NavLink>
            </motion.div>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="border-t border-sidebar-border p-3">
        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
          <LogOut className="h-5 w-5" />
          Log Out
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
