import ProductList from "@/components/ProductList";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SearchPage = () => {
  const router = useRouter();
  const { query } = router.query; // Extract query parameter
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) return;

    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
          `/api/products/searchproduct?query=${query}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch search results");
        }
        const data = await response.json();
        setSearchResults(data.data || []);
      } catch (error) {
        console.error("Error fetching search results:", error.message);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semi-bold mb-4 mt-5">
        Search Results for: {query}
      </h1>
      {loading ? (
        <p>Loading...</p>
      ) : searchResults.length > 0 ? (
        <ProductList products={searchResults} />
      ) : (
        <p>No results found for your query.</p>
      )}
    </div>
  );
};

export default SearchPage;
