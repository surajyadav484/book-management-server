const getPageNumberAndSize = (pageNumber, pageSize) => {
  const page = parseInt(pageNumber) || 1;
  const size = parseInt(pageSize) || 10;
  const skipCount = (page - 1) * size;

  return { skipCount, size };
};

module.exports = { getPageNumberAndSize };
