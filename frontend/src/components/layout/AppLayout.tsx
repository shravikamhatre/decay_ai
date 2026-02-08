import { Outlet } from "react-router-dom";
// import Sidebar from "./Sidebar"; // Removed Sidebar
import TopBar from "./TopBar";
import StaggeredMenu from "@/components/ui/StaggeredMenu";

interface AppLayoutProps {
  title?: string;
}

const menuItems = [
  { label: 'Calendar', ariaLabel: 'View content calendar', link: '/calendar' },
  { label: 'Trending Insights', ariaLabel: 'View trend insights', link: '/trend-analysis' },
  { label: 'Settings', ariaLabel: 'Go to settings', link: '/settings' }
];

const socialItems = [
  { label: 'Twitter', link: 'https://twitter.com' },
  { label: 'GitHub', link: 'https://github.com' },
  { label: 'LinkedIn', link: 'https://linkedin.com' }
];

const AppLayout = ({ title }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-black text-white relative">
      <StaggeredMenu
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials
        displayItemNumbering={true}
        menuButtonColor="#ffffff"
        openMenuButtonColor="#ffffff"
        changeMenuColorOnOpen={true}
        colors={['#f4f4f5', '#e4e4e7']} // Zinc-100, Zinc-200 for light mode layers
        logoUrl="" // Removing default logo to fit theme
        accentColor="#22c55e" // Keep green accent or change if needed
        isFixed={true}
        className="z-50"
      />
      {/* <Sidebar /> Removed Sidebar component */}
      <div className="w-full"> {/* Removed ml-64 */}
        <TopBar />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;

