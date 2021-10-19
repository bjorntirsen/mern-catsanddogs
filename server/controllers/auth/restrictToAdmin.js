// Must have protect before it in stack
const restrictToAdmin = async (req, res, next) => {
  try {
    if (!req.user.adminUser) {
      return res
        .status(403)
        .json("You do not have permission to perform this action");
    }
    next();
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports = restrictToAdmin;
