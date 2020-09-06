export default {
  products(items, page, itemsPerPage) {
    const offset = (page - 1) * itemsPerPage;
    return items.slice(offset, offset + itemsPerPage);
  },
  itemsAmount(items) {
    return items.length;
  },
};
