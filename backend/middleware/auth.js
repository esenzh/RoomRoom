const sessionChecker = (req, res, next) => {
    if (!req.session.user) {
        res.send({flag: 'unauthenticated'})
    } else {
        next();
    }
};

module.exports = sessionChecker;
