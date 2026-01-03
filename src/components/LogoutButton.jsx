import { useAuth } from "../contexts/authContext";
import { EventButton } from "./EventButton";
import { LogOut } from "lucide-react";
export function LogoutButton() {
  const { logout } = useAuth();
  return (
    <EventButton
      event={logout}
      className={"group-hover:underline flex items-center gap-x-2 text-sm"}
    >
      <LogOut size={18} />
      Logout
    </EventButton>
  );
}
