const jwt = require('jsonwebtoken');

module.exports = (req, res, next) =>
{
    try
    {
        const token = req.header('x-auth-token') || req.headers.authorization;
        if (!token) return res.send({
            status: false,
            message: 'Access denied. No token provided.'
        });
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error)
    {
        return res.send({
            status: false,
            message: error.message
        })
    }
}