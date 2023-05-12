// Create token and saving that in cookies
const sendToken = (data, status, res, name) => {
  const token = data.getJwtToken();

  // Options for cookies
  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
  };

  return res
    .status(status)
    .cookie('token-' + name, token, options)
    .json({
      success: true,
      data,
      token,
    });
};

module.exports = sendToken;
