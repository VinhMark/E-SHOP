// Create token and saving that in cookie
const sendShopToken = (shop, statusCode, res) => {
  const token = shop.getJwtToken();

  // Options for cookies
  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    Secure: true,
  };

  res.status(statusCode).cookie('seller_token', token, options).json({
    success: true,
    shop,
    token,
  });
};

module.exports = sendShopToken;
