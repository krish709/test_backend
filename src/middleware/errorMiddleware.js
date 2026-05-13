const errorHandler = (
  err,
  req,
  res,
  next
) => {

  return res.status(
    err.statusCode || 500
  ).json({

    success: false,

    message:
      err.message || "Internal Server Error",

    // error: {
    //   statusCode: err.statusCode || 500,
    // },

  });

};

module.exports = errorHandler;