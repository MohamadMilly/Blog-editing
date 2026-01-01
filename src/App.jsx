import { Outlet } from "react-router";
import { Navbar } from "./components/Navbar";

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
