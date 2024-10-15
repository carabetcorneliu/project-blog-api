const prisma = require('../db/prisma');

async function messageListByPostIdGet(req, res) {
    if (!req.body.postId) {
        return res.status(400).send('Bad request');
    }
    const postIdFilter = parseInt(req.body.postId);
    try {
        const allMessages = await prisma.Message.findMany({
            where: { postId: postIdFilter },
        });

        if (!allMessages) {
            return res.status(404).send('no messages found');
        }

        res.json(allMessages);
    } catch (err) {
        console.error('Error getting message list by post id: ', err);
        res.status(500).send('Server error');
    }
};

async function messageByPostIdPost(req, res) {
    if (!req.body.postId) {
        return res.status(400).send('Bad request');
    }
    const postIdFilter = parseInt(req.body.postId);
    try {
        const postExists = await prisma.Post.findUnique({
            where: { id: postIdFilter },
        })
        if (!postExists) {
            return res.status(404).send('Error creating new message, post inexistent');
        }

        const newMessage = await prisma.Message.create({
            data: {
                postId: postIdFilter,
                text: req.body.text,
            },
        })

        if (!newMessage) {
            return res.status(404).send('Error creating new message by post id');
        }

        res.json(newMessage);
    } catch (err) {
        console.error('Error getting message by post id: ', err);
        res.status(500).send('Server error');
    }
};

async function messageByIdPut(req, res) {
    if (!req.body.id) {
        return res.status(400).send('Bad request');
    }
    const messageIdFilter = parseInt(req.body.id);
    try {
        const messageExists = await prisma.Message.findUnique({
            where: { id: messageIdFilter },
        })
        if (!messageExists) {
            return res.status(404).send('Error editing message, it doesnt exist');
        }

        const updatedMessage = await prisma.Message.update({
            where: { id: messageIdFilter },
            data: {
                text: req.body.text,
            }
        })
        if (!updatedMessage) {
            return res.status(404).send('Error updating message');
        }

        res.json(updatedMessage);
    } catch (err) {
        console.error('Error editing message: ', err);
        res.status(500).send('Server error');
    }
};

async function messageByIdDelete(req, res) {
    if (!req.body.id) {
        return res.status(400).send('Bad request');
    }
    const messageIdFilter = parseInt(req.body.id);
    try {
        const messageExists = await prisma.Message.findUnique({
            where: { id: messageIdFilter },
        })
        if (!messageExists) {
            return res.status(404).send('Error deleting message, it doesnt exist');
        }

        const deletedMessage = await prisma.Message.delete({
            where: { id: messageIdFilter },
        })

        res.json(deletedMessage);
    } catch (err) {
        console.error('Error deleting message: ', err);
        res.status(500).send('Server error');
    }
};

module.exports = {
    messageListByPostIdGet,
    messageByPostIdPost,
    messageByIdPut,
    messageByIdDelete,
};