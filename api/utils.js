function requireUser(req, res, next) {
    if (!req.user) {
      return res.status(401).json({
        name: "MissingUserError",
        message: "You must be logged in to perform this action"
      });
    }
  
    next();
  }
  
  module.exports = { requireUser };
  