const prisma = require("../db/prisma");

async function postListGet(req, res) {
  try {
    const allPosts = await prisma.Post.findMany({
      include: { messages: true },
    });

    if (!allPosts) {
      return res.status(404).send("no posts found");
    }

    res.json(allPosts);
  } catch (err) {
    console.error("Error getting post list: ", err);
    res.status(500).send("Server error");
  }
}

async function postByUserIdPost(req, res) {
  if (!req.body.userId) {
    return res.status(400).send("Bad request");
  }
  if (!req.body.userId || !req.body.title || !req.body.text) {
    return res.status(400).send("Also bad request");
  }
  const userIdToAddPost = parseInt(req.body.userId);
  try {
    const userExists = await prisma.User.findUnique({
      where: { id: userIdToAddPost },
    });

    if (!userExists) {
      return res.status(404).send("Cant add to this user, no such userId");
    }

    const newPost = await prisma.Post.create({
      data: {
        userId: userIdToAddPost,
        title: req.body.title,
        text: req.body.text,
      },
    });

    if (!newPost) {
      return res.status(404).send("Server error adding post");
    }

    res.json(newPost);
  } catch (err) {
    console.error("Error adding post: ", err);
    res.status(500).send("Server error");
  }
}

async function postByIdPut(req, res) {
  if (!req.body.postId) {
    return res.status(400).send("Bad request");
  }
  const postIdToEdit = parseInt(req.body.postId);
  try {
    const postExists = await prisma.Post.findUnique({
      where: { id: postIdToEdit },
    });

    if (!postExists) {
      return res.status(400).send("Cant edit this post, no such postId");
    }

    const updatePost = await prisma.Post.update({
      where: { id: postIdToEdit },
      data: {
        title: req.body.title,
        text: req.body.text,
      },
    });

    if (!updatePost) {
      return res.status(404).send("Server error updating post");
    }

    res.json(updatePost);
  } catch (err) {
    console.error("Error updating post: ", err);
    res.status(500).send("Server error");
  }
}

async function postByIdDelete(req, res) {
  if (!req.body.postId) {
    return res.status(400).send("Bad request");
  }
  const postIdToDelete = parseInt(req.body.postId);
  try {
    const deletePost = await prisma.Post.delete({
      where: { id: postIdToDelete },
    });

    if (!deletePost) {
      return res.status(404).send("Server error deleting post");
    }

    res.json(deletePost);
  } catch (err) {
    console.error("Error deleting post");
    res.status(500).send("Server error");
  }
}

module.exports = {
  postListGet,
  postByUserIdPost,
  postByIdPut,
  postByIdDelete,
};
