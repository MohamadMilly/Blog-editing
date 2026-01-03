import { LogoutButton } from "./LogoutButton";
import { Settings } from "lucide-react";
export function SettingsSection() {
  return (
    <div className="mt-2">
      <h2 className="font-medium text-gray-300 mb-2 flex items-center gap-x-2">
        <Settings size={18} />
        <span>Settings</span>
      </h2>
      <div>
        <h3 className="font-medium text-gray-300 text-sm ml-2 mb-2">Account</h3>
        <div className="group flex items-center px-4 py-2 bg-gray-500/10 rounded hover:bg-gray-500/20 mb-2">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
