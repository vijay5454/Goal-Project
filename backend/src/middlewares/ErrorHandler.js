const ErrorHandler = (err, req, res, next) => {
  console.log("Entered Error Handler");
  if (
    err.message.search("duplicate key error") !== -1 ||
    err.message.search("validation failed") !== -1 ||
    err.message.search("Invalid request") !== -1 ||
    err.message === "Cannot able to create user"
  ) {
    res.status(400);
    res.json({
      message: `Bad request: ${err.message}`,
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
  } else if (err.message.search("Not authorized") !== -1) {
    res.status(401);
    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
  } else {
    res.status(404);
    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
  }
};

module.exports = {
  ErrorHandler,
};
