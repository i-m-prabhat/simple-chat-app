const router = require('express').Router();
const User = require('../model/user');
const Chat = require('../model/chat');
const Message = require('../model/message');
const authMiddleware = require('../middlewares/authMiddleware');


router.post('/create-new-chat', authMiddleware, async (req, res) =>
{
    try
    {
        // const { name, users } = req.body;
        const chat = new Chat();
        const savedChat = await chat.save(req.body);
        return res.status(201).send({ status: true, message: 'Chat created successfully', data: savedChat });
    } catch (err)
    {
        return res.status(400).json({ status: false, message: 'Error creating chat', error: err });
    }
})


module.exports = router;