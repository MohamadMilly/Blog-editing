import "./App.css";
import { Navbar } from "./components/Navbar";
import { SearchBar } from "./components/searchBar";

function App() {
  return (
    <main>
      <header>
        <Navbar />
        <SearchBar />
      </header>

      <h1>Welcome to Dashboard</h1>
    </main>
  );
}

export default App;
