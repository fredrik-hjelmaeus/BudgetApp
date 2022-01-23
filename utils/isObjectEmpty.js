const isObjectEmpty = (obj) => {
  for (let i in obj) return false;
  return true;
};

module.exports = isObjectEmpty;
