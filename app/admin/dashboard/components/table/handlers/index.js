export const handleSort = (sortConfig, setSortConfig, key) => {
  let direction = "ascending";
  if (sortConfig.key === key && sortConfig.direction === "ascending") {
    direction = "descending";
  }
  setSortConfig({ key, direction });
};

export const handlePageChange = (setCurrentPage, pageNumber) => {
  setCurrentPage(pageNumber);
};

export const handleSearch = (
  data,
  searchTerm,
  setFilteredData,
  setCurrentPage,
  setIsLoading
) => {
  setIsLoading(true);
  const filtered = data.filter((item) => {
    if (item && item.SKU) {
      return item.SKU.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return false;
  });
  setTimeout(() => {
    setFilteredData(filtered);
    setCurrentPage(1);
    setIsLoading(false);
  }, 500);
};

export const handleEdit = (item) => {
  console.log("Edit item:", item);
};


export const handleDelete = (itemId, setData, setIsLoading) => {
  setIsLoading(true);
  setTimeout(() => {
    setData((prevData) => prevData.filter((item) => item.ID !== itemId));
    setIsLoading(false);
    console.log(`Item with ID ${itemId} deleted.`);
  }, 500);
};
