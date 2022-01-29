const isObjectEmpty = (obj: object) => {
  for (let i in obj) return false;
  return true;
};
export default isObjectEmpty;
