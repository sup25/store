import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { geProductsByTag } from "@/app/utils";
import { emptyState } from "../emptyState";
import { useDebounce } from "use-debounce";
import { CgSpinner } from "react-icons/cg";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [hasSearched, setHasSearched] = useState(false);
  const router = useRouter();

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setHasSearched(false);
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      setLoading(true);
      const fetchSuggestions = async () => {
        try {
          const products = await geProductsByTag(debouncedSearchTerm);
          setSuggestions(products);
          setHasSearched(true);
        } catch (err) {
          console.error("Error fetching suggestions:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchSuggestions();
    } else {
      setSuggestions([]);
      setHasSearched(false);
    }
  }, [debouncedSearchTerm]);

  const handleSuggestionClick = () => {
    const tagString = encodeURIComponent(searchTerm.trim());
    router.push(`/products?tag=${tagString}`);
  };

  return (
    <div className="w-full relative">
      <input
        className="py-2 px-2 font-others w-full max-w-[450px] border-2 outline-none hover:border-secondary transition duration-300 ease-in-out"
        placeholder="Search for products"
        value={searchTerm}
        onChange={handleInputChange}
      />

      {loading ? (
        <div className="absolute top-full py-1 w-full max-w-[450px] left-0 right-0 bg-white border-2 border-t-0 shadow-lg z-10 flex items-center justify-center">
          <CgSpinner className="animate-spin text-gray-500" size={24} />
        </div>
      ) : hasSearched && suggestions.length === 0 ? (
        <div className="absolute font-others top-full w-full max-w-[450px] left-0 right-0 bg-white border-2 border-t-0 shadow-lg z-10">
          <div className="p-2">{emptyState()}</div>
        </div>
      ) : suggestions.length > 0 ? (
        <div className="absolute top-full w-full max-w-[450px] left-0 right-0 bg-white border-2 border-t-0 shadow-lg z-10">
          {suggestions.map((product) => (
            <div
              key={product.id}
              className="p-2 font-others text-black cursor-pointer hover:bg-gray-100"
              onClick={() => handleSuggestionClick(product)}
            >
              {product.title}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Search;
