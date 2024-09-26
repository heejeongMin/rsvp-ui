const convertToLocalDateTime = (dateTime: string) => {
  return new Date(dateTime).toLocaleString();
};

export default convertToLocalDateTime;
