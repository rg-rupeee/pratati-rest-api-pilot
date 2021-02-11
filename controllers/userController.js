// export getAllUsers function
exports.getAllUsers = (req, res) => {
  
  // sending the response
  
  res.status(200).json({
    status: "success",
    data: {
      message: "successfully got the response",
    },
  });
};
