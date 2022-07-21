const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    //   take the token from the header
    const token = req.headers.authorization.split(" ")[1]; //split by space and take the second value
    // decode the token passing the same random_token_secret
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET"); //put in the same string you passed in to decode the token
    // console.log("decodedToken", decodedToken);
    const userId = decodedToken.userId; //the token is an object containing the userId

    // create an auth obj in the request object and store the userId in the object
    req.auth = { userId };

    // if the userId is different from the userId in the token
    if (req.body.userId && req.body.userId !== userId) {
      throw "Invalid user Id";
    } else {
      // if all goes well, pass carry on to the next middleware
      next();
    }
  } catch (error) {
    res.status(401).json({
      error: "Invalid request",
    });
  }
};
