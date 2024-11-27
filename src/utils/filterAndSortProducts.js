export const filterAndSortProducts = ({
  products,
  query,
  selectedCategories,
  filterByUser,
  sortBy,
  sortingOrder,
}) => {
  let filtered = products.filter(product => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.categoryId);
    const matchesUser = !filterByUser || product.userName === filterByUser.name;

    return matchesSearch && matchesCategory && matchesUser;
  });

  if (sortBy) {
    filtered = filtered.sort((a, b) => {
      if (sortBy === 'id') {
        return a.id - b.id;
      }

      if (typeof a[sortBy] === 'string') {
        return a[sortBy].localeCompare(b[sortBy]);
      }

      return a[sortBy] - b[sortBy];
    });

    if (sortingOrder === 'desc') {
      filtered = filtered.reverse();
    }
  }

  return filtered;
};
