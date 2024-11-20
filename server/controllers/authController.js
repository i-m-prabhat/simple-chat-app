const router = require('express').Router();
const bcrypt = require('bcryptjs');
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

module.exports = router;