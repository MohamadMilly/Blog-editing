import { Outlet } from "react-router";
import { Navbar } from "./components/Navbar";
import { SearchBar } from "./components/searchBar";

function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <Outlet />
    </>
  );
}

export default App;
