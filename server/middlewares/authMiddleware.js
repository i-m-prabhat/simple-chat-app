const jwt = require('jsonwebtoken');

module.exports = (req, res, next) =>
{
    try
    {
        const token = req.header('x-auth-token') || req.headers.authorization ||
            req.query.token || req.body.token || req.params.token ||
            req.headers['x-access-token'] || req.headers['x-signature'];
        if (!token) return res.status(400).send({
            status: false,
            message: 'Access denied. No token provided.'
        });
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error)
    {
        return res.status(400).send({
            status: false,
            message: error.message
        })
    }
}