// Create token and saving that in cookies
const sendToken = (user, status, res) => {
  const token = user.getJwtToken();

  // Options for cookies
  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  return res.status(status).cookie('token', token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
