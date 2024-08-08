import debounce from "lodash.debounce";
const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const handleInputChange = (event) => {
    const { value } = event.target;
    const lowerCaseValue = value.toLowerCase();
    setSearchTerm(lowerCaseValue);
    debouncedSearch(lowerCaseValue);
  };

  const debouncedSearch = debounce((value) => {
    setSearchTerm(value);
  }, 300);

  return (
    <div className="py-5 w-fit ">
      <input
        type="text"
        placeholder="Search by SKU..."
        value={searchTerm}
        onChange={handleInputChange}
        className="p-2 text-black border border-primary w-full"
      />
    </div>
  );
};

export default SearchBar;
