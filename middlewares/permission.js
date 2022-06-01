module.exports = (...roles) => {
  return (req, res, next) => {
    const role = req.user.data.role;

    console.log(role, roles);

    if (!roles.includes(role)) {
      return res.status(405).json({
        status: 'error',
        message: 'Forbidden',
      });
    }

    return next();
  };
};
