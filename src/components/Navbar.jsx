import {
  House,
  PlusCircle,
  Menu,
  SearchCheck,
  SearchSlash,
} from "lucide-react";
import { NavLink } from "react-router";
import { useUser } from "../contexts/userContext";
import { Toolbar } from "./Toolbar";
export function Navbar() {
  const { user } = useUser();
  const profile = user?.profile;
  const avatar = profile?.avatar || "/avatar_placeholder.jpg";
  const baseLinkStyle =
    "flex items-center gap-x-2 px-2 py-1.5 rounded  transition-all duration-300";
  const linkClass = ({ isPending, isActive }) => {
    if (isActive) {
      return `${baseLinkStyle} bg-white text-sm text-pink-700`;
    }
    if (isPending) {
      return baseLinkStyle;
    }
    return `${baseLinkStyle} bg-pink-700/90 text-sm hover:bg-pink-600/90`;
  };
  return (
    <>
      <nav className="sticky top-0 right-0 left-0 px-4 py-1.5 flex justify-between items-center bg-gray-800/30 text-white backdrop-blur-2xl border-b-2 border-b-gray-700/20">
        <div className="md:flex items-center gap-x-4 hidden">
          <NavLink
            to="https://blog-consumption.vercel.app/"
            className={linkClass}
          >
            <House size={20} />
            <span>Home</span>
          </NavLink>
          <NavLink to="/dashboard/posts/new" className={linkClass}>
            <PlusCircle size={20} />
            <span>New post</span>
          </NavLink>
        </div>

        <div className="flex items-center gap-x-4">
          <NavLink to="https://blog-consumption.vercel.app/me/profile">
            <img
              className="w-14 h-14 object-cover rounded-full border-pink-600/70 border-2"
              src={avatar}
              alt="user's avatar"
            />
          </NavLink>
          <Toolbar />
        </div>
        <button
          command="show-modal"
          commandfor="drawer"
          className="md:hidden rounded-md bg-pink-700/20 px-2.5 py-1.5 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-pink-600/20"
        >
          <Menu />
        </button>
      </nav>
      <el-dialog>
        <dialog
          id="drawer"
          aria-labelledby="drawer-title"
          className="fixed inset-0 size-auto max-h-none max-w-none overflow-hidden bg-transparent not-open:hidden backdrop:bg-transparent"
        >
          <el-dialog-backdrop className="absolute inset-0 bg-gray-900/50 transition-opacity duration-500 ease-in-out data-closed:opacity-0"></el-dialog-backdrop>

          <div
            tabIndex="0"
            className="absolute inset-0 pl-10 focus:outline-none sm:pl-16"
          >
            <el-dialog-panel className="group/dialog-panel relative ml-auto block size-full max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700">
              <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 duration-500 ease-in-out group-data-closed/dialog-panel:opacity-0 sm:-ml-10 sm:pr-4">
                <button
                  type="button"
                  command="close"
                  commandfor="drawer"
                  className="relative rounded-md text-gray-400 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  <span className="absolute -inset-2.5"></span>
                  <span className="sr-only">Close panel</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    data-slot="icon"
                    aria-hidden="true"
                    className="size-6"
                  >
                    <path
                      d="M6 18 18 6M6 6l12 12"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              <div className="relative flex h-full flex-col overflow-y-auto bg-gray-800 py-6 shadow-xl after:absolute after:inset-y-0 after:left-0 after:w-px after:bg-white/10">
                <div className="px-4 sm:px-6">
                  <h2
                    id="drawer-title"
                    className="text-lg font-semibold text-white border-b-2 border-pink-700"
                  >
                    Blog
                  </h2>
                </div>
                <div className="relative mt-6 flex-1 px-4 sm:px-6 text-gray-200">
                  <div className="group flex items-center px-4 py-2 bg-gray-500/10 rounded hover:bg-gray-500/20 mb-2">
                    <a
                      className="group-hover:underline flex items-center gap-x-2"
                      href="https://blog-consumption.vercel.app/"
                    >
                      <House size={18} />
                      <span className="text-sm">Home</span>
                    </a>
                  </div>
                  <div className="mt-2">
                    <h2 className="font-medium text-gray-300 mb-2">
                      Posts control
                    </h2>
                    <div className="group flex items-center px-4 py-2 bg-gray-500/10 rounded hover:bg-gray-500/20">
                      <button className="group-hover:underline flex items-center gap-x-2">
                        <SearchCheck size={18} />
                        <span className="text-sm">Publish all</span>
                      </button>
                    </div>
                    <div className="group flex items-center px-4 py-2 bg-gray-500/10 rounded hover:bg-gray-500/20 mt-1">
                      <button className="group-hover:underline flex items-center gap-x-2">
                        <SearchSlash size={18} />
                        <span className="text-sm">Unpublish all</span>
                      </button>
                    </div>
                  </div>
                  <div className="mt-2">
                    <h2 className="font-medium text-gray-300 mb-2">Create</h2>

                    <NavLink
                      to="/dashboard/posts/new"
                      className={({ isActive }) => {
                        if (isActive) {
                          return "group-hover:underline flex items-center gap-x-2 px-4 py-2 bg-white/85 text-pink-700 rounded ";
                        }
                        return "group-hover:underline flex items-center gap-x-2 px-4 py-2 bg-gray-500/10 rounded hover:bg-gray-500/20 hover:underline";
                      }}
                    >
                      <PlusCircle size={18} />
                      <span className="text-sm">New post</span>
                    </NavLink>
                  </div>
                </div>
              </div>
            </el-dialog-panel>
          </div>
        </dialog>
      </el-dialog>
    </>
  );
}
