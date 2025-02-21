class customError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";
    this.sucess = false;
    this.isoperational = true;
    Error.captureStackTrace(this, customError);
  }
}
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";

  res.status(statusCode).json({
    status: "Error",
    status: err.status ?? "error",
    sucess: err.sucess || false,

    message: message /*err.message || "Something went wrong",*/,
  });
};

module.exports = { customError, errorHandler };
