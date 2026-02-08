module.exports = (roles = []) => {
  const allowed = Array.isArray(roles) ? roles : [roles];

  return (req, res, next) => {
    if (!req.user) {
      res.status(401);
      return next(new Error("Unauthorized"));
    }
    if (!allowed.includes(req.user.role)) {
      res.status(403);
      return next(new Error("Forbidden: insufficient role"));
    }
    next();
  };
};
