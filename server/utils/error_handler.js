function handleError(res) {
  return (error) => {
    res.status(500).json(error && error.message);
  };
}

module.exports = {
  handleError
};