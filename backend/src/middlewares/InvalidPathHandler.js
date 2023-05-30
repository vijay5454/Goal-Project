const InvalidPathHandler = (req, res, next) => {
  console.log("Entered Invalid path");
  res.status(404).json({
    message: "Route not Found",
  });
};

module.exports = {
  InvalidPathHandler,
};
