const prisma = require('../db/prisma');

async function allUsersGet(req, res) {
    try {
        const allUsers = await prisma.User.findMany()

        if (!allUsers) {
            return res.status(404).send('no users found');
        }

        res.json(allUsers);
    } catch (err) {
        console.error('Error getting user list: ', err);
        res.status(500).send('Server error');
    }
};

async function userByIdGet(req, res) {
    if (!req.params.userId) {
        return res.status(400).send('Bad request');
    }
    const userIdToFind = parseInt(req.params.userId);
    try {
        const user = await prisma.User.findUnique({
            where: { id: userIdToFind },
            include: { posts: true },
        });

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.json(user);
    } catch (err) {
        console.error('Error getting user by id: ', err);
        res.status(500).send('Server error');
    }
};

async function userByIdPost(req, res) {
    if (!req.body.username || !req.body.password) {
        return res.status(400).send('Bad request');
    }
    try {
        const newUser = await prisma.User.create({
            data: {
                username: req.body.username,
                password: req.body.password,
            }
        })

        if (!newUser) {
            return res.status(500).send('Server error adding user');
        }

        res.json(newUser);
    } catch (err) {
        console.error('Error adding user: ', err);
        res.status(500).send('Server error');
    }
};

async function userByIdPut(req, res) {
    if (!req.params.userId || !req.body.username || !req.body.password) {
        return res.status(400).send('Bad request');
    }
    const userIdToEdit = parseInt(req.params.userId);
    try {
        const updateUser = await prisma.User.update({
            where: { id: userIdToEdit },
            data: { password: req.body.password },
        });

        if (!updateUser) {
            return res.status(404).send('Error updating user');
        }

        res.json(updateUser);
    } catch(err) {
        console.error('Error editing this user: ', err);
        res.status(500).send('Server error');
    }
};

async function userByIdDelete(req, res) {
    if (!req.params.userId) {
        return res.status(400).send('Bad request');
    }
    const userIdToDelete = parseInt(req.params.userId);
    try {
        const deletedUser = await prisma.User.delete({
            where: { id: userIdToDelete },
        })

        if (!deletedUser) {
            res.status(404).send('Error deleting user');
        }

        res.json(deletedUser);
    } catch(err) {
        console.error('Error deleting user: ', err);
        res.status(500).send('Server error');
    }
};

module.exports = { 
    allUsersGet,
    userByIdGet,
    userByIdPost,
    userByIdPut,
    userByIdDelete,
};