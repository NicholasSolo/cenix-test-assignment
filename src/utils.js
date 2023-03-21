const getPaginationPageArray = ({ pagination, array }) => {
  const { page, perPage } = pagination;
  let outputArray = [];

  const start = (page - 1) * perPage;
  const end = start + perPage;

  outputArray = array.slice(start, end);

  return outputArray;
};

export { getPaginationPageArray };
