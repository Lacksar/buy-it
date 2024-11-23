import { useRouter } from "next/router";
import React, { useState } from "react";
import Link from "next/link"; // Import Link from Next.js

const SearchBox = (props) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const { category } = props;

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value) {
      await fetchSearchResults(value);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const fetchSearchResults = async (searchQuery) => {
    try {
      const response = await fetch(
        `/api/products/searchproduct?query=${searchQuery}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }
      const results = await response.json();
      setSuggestions(results.data || []);
    } catch (error) {
      console.error(error.message);
      setSuggestions([]);
    }
  };

  const handleSearch = () => {
    if (query) {
      router.push(`/search?query=${query}`); // Navigate to search page with the query
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(); // Trigger search on Enter
    }
  };

  return (
    <div className="flex mt-4 md:mt-0 items-center space-x-0">
      <div className="relative group flex-shrink-0">
        {/* Category Dropdown */}
        <button
          id="dropdown-button"
          type="button"
          className="z-10 w-30 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
        >
          All Categories
          <svg
            className="w-2.5 h-2.5 ms-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        <div
          id="dropdown"
          className="absolute mt-0 z-10 hidden group-hover:block group-focus-within:block bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdown-button"
          >
            {Array.isArray(category) && category.length > 0 ? (
              category.map((x, index) => (
                <li
                  key={index}
                  onClick={() => {
                    router.push(`/products/${x}`);
                  }}
                >
                  <button
                    type="button"
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    {x.toUpperCase()}
                  </button>
                </li>
              ))
            ) : (
              <li>No categories available</li>
            )}
          </ul>
        </div>
      </div>

      <div className="relative w-full md:mr-20">
        <input
          type="search"
          id="search-dropdown"
          value={query}
          onChange={handleSearchChange} // Handles input change
          onKeyDown={handleKeyDown} // Trigger search on Enter key press
          className="block p-2.5 w-50 md:w-60 lg:w-80 z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 resize-x"
          placeholder="Search..."
          required
          onFocus={() => query && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 3000)}
        />
        <div className="absolute top-full left-0 z-10 w-full">
          {showSuggestions && suggestions.length > 0 && (
            <ul className="bg-white border border-gray-300 rounded-lg shadow dark:bg-gray-700 dark:border-gray-600">
              {suggestions.slice(0, 5).map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() =>
                    setTimeout(() => setShowSuggestions(false), 1000)
                  }
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <Link href={`/product/${suggestion.slug}`} passHref>
                    <div className="flex items-center">
                      <img src={suggestion.image} className="h-20 mr-4" />
                      <span>{suggestion.title}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          type="submit"
          className="absolute top-0 right-0 px-4 text-sm font-medium h-full text-white bg-blue-500 bg-gradient-to-r from-blue-500 to-blue-900 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleSearch} // Trigger search on button click
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
