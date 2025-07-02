export const paginate = (items, page = 1, limit = 10, genre) => {
  let filteredItems = items;
  if (genre) {
    filteredItems = items.filter(item => item.genre && item.genre.toLowerCase() === genre.toLowerCase());
  }
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);

  const startIndex = (pageNum - 1) * limitNum;
  const endIndex = startIndex + limitNum;

  const paginatedItems = filteredItems.slice(startIndex, endIndex);

  return {
    total: filteredItems.length,
    page: pageNum,
    limit: limitNum,
    results: paginatedItems,
  };
};
  