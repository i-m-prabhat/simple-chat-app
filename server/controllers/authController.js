const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user');


router.post('/signup', async (req, res) =>
{
    try
    {
        let { firstName, lastName, email, password } = req.body;
        const isUserExist = await User.findOne({ email });
        if (isUserExist)
        {
            return res.send({
                status: false,
                message: 'User Already Exist!'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ firstName, lastName, email, password: hashedPassword });
        await user.save();
        return res.send({
            status: true,
            message: 'User Created Successfully!'
        });
    } catch (error)
    {
        return res.send({
            status: false,
            message: error.message
        });
    }
});

router.post('/login', async (req, res) =>
{
    try
    {
        let { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user)
        {
            return res.send({
                status: false,
                message: 'User Not Found!'
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
        {
            return res.send({
                status: false,
                message: 'Invalid Password!'
            });
        }
        const token = await jwt.sign(
            user.toObject(),
            process.env.SECRET_KEY,
            {
                expiresIn: '1h'
            }
        );
        return res.send({
            status: true,
            message: 'User Login Successfully!',
            token
        });
    }
    catch (error)
    {
        return res.send({
            status: false,
            message: error.message
        });
    }
})

module.exports = router;