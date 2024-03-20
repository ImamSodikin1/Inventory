import SideNavigation from "../components/sidenavigation/SideNavigation";
import Dashboard from "../components/dash/Dashboard";

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <div className="flex">
        <SideNavigation />
      </div>
      <div className="flex-grow">
        <Dashboard />
        {/* table */}
      </div>
    </div>
  );
}
