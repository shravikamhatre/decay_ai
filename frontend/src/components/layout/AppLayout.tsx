import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import FloatingAIAssistant from "@/components/ai/FloatingAIAssistant";
import StaggeredMenu from "@/components/ui/StaggeredMenu";

interface AppLayoutProps {
  title?: string;
}

const menuItems = [
  { label: 'Dashboard', ariaLabel: 'Go to dashboard', link: '/dashboard' },
  { label: 'Scheduled Posts', ariaLabel: 'View scheduled posts', link: '/transactions' },
  { label: 'Trend Insights', ariaLabel: 'View trend insights', link: '/insights' },
  { label: 'Content Calendar', ariaLabel: 'View content calendar', link: '/portfolio' },
  { label: 'Settings', ariaLabel: 'Go to settings', link: '/settings' }
];

const socialItems = [
  { label: 'Twitter', link: 'https://twitter.com' },
  { label: 'GitHub', link: 'https://github.com' },
  { label: 'LinkedIn', link: 'https://linkedin.com' }
];

const AppLayout = ({ title }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-background relative">
      <StaggeredMenu
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials
        displayItemNumbering={true}
        menuButtonColor="#000000"
        openMenuButtonColor="#000000"
        changeMenuColorOnOpen={true}
        colors={['#f4f4f5', '#e4e4e7']} // Zinc-100, Zinc-200 for light mode layers
        logoUrl="" // Removing default logo to fit theme
        accentColor="#22c55e" // Keep green accent or change if needed
        isFixed={true}
        className="z-50"
      />
      <Sidebar />
      <div className="ml-64">
        <TopBar />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
      <FloatingAIAssistant />
    </div>
  );
};

export default AppLayout;
