import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  onLogout: () => Promise<void>;
}

function DashboardHeader({ onLogout }: DashboardHeaderProps) {
  return (
    <header className="border-b bg-gunmetal">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-xl font-bold text-silver">AI Capsule</h1>

          <p className="text-sm text-silver">
            Your private AI prompt library
          </p>
        </div>

        <Button type="button" className=" cursor-pointer p-5 bg-blue-slate hover:bg-blue-slate/80" onClick={onLogout}>
          Logout
        </Button>
      </div>
    </header>
  );
}

export default DashboardHeader;
