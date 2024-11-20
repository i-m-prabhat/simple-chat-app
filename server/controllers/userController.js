const router = require('express').Router();
const User = require('../model/user');
const authMiddleware = require('../middlewares/authMiddleware');


router.get('/get-logged-user', authMiddleware, async (req, res) =>
{
    try
    {
        const user = await User.findById(req.user._id).select('-password');
        return res.send({
            status: true,
            message: "Get User Details Successfully!",
            user: user
        });
    }
    catch (err)
    {
        return res.send({
            status: false,
            message: err.message
        })
    }
});


router.get('/get-all-users', authMiddleware, async (req, res) =>
{
    try
    {
        const user = await User.find({ _id: { $ne: req.user._id } }).select('-password');
        return res.send({
            status: true,
            message: "Get Users Details Successfully!",
            user: user
        });
    }
    catch (err)
    {
        return res.send({
            status: false,
            message: err.message
        })
    }
});


module.exports = router;