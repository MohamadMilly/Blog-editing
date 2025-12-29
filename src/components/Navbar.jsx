import { House, PlusCircle } from "lucide-react";
import { NavLink } from "react-router";
import { useUser } from "../contexts/userContext";
export function Navbar() {
  const { user } = useUser();
  const profile = user?.profile;
  const avatar = profile?.avatar || "/avatar_placeholder.jpg";
  const linkClass = ({ isPending, isActive }) => {
    if (isPending) {
      return;
    }
    if (isActive) {
      return;
    }
    return;
  };
  return (
    <nav>
      <NavLink
        to="https://blog-consumption-bvwkghscj-mohamadmillys-projects.vercel.app/"
        className={linkClass}
      >
        <House size={20} />
        <span>Home</span>
      </NavLink>
      <NavLink to="/posts/new" className={linkClass}>
        <PlusCircle size={20} />
        <span>New post</span>
      </NavLink>
      <NavLink to="https://blog-consumption.vercel.app/me/profile">
        <img src={avatar} alt="user's avatar" />
      </NavLink>
    </nav>
  );
}
