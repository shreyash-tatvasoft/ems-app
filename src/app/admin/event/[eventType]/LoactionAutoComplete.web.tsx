import { AUTOCOMPLETE_API } from "@/utils/constant";
import React, { useState, useEffect } from "react";

interface Suggestion {
  display_name: string;
  lat: string;
  lon: string;
}

const AddressAutocomplete: React.FC = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Debounce logic inside component
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!debouncedQuery.trim()) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await fetch(
          `${AUTOCOMPLETE_API(debouncedQuery)}`
        );
        const data = await res.json();
        setSuggestions(data);
        setShowDropdown(true);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    fetchSuggestions();
  }, [debouncedQuery]);

  const handleSelect = (fullLocation : Suggestion) => {
    setQuery(fullLocation.display_name);
    setShowDropdown(false);
    console.log("first", fullLocation)
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        // className={`
        //     block w-full rounded-md px-4 py-2 text-md h-12
        //     placeholder-gray-400 border transition-all
        //     ${errorKey
        //       ? "border-red-500 focus:border-red-500 focus:ring-red-500"
        //       : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"}
        //     focus:outline-none focus:ring-1
        //   `}
        placeholder="Search address..."
      />
      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((s, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(s)}
            >
              {s.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddressAutocomplete;
