import { useState } from "react";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };
  return (
    <form method="get">
      <div>
        <input
          type="search"
          name="query"
          onChange={handleQueryChange}
          value={query}
          aria-label="Search my posts input"
        />
      </div>
    </form>
  );
}
