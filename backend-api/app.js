const cors = require('cors');
const express = require('express');
// const prisma = require('./db/prisma');
const routes = require('./routes');

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', routes.userRouter);
app.use('/post', routes.postRouter);
app.use('/message', routes.messageRouter);

// General error handler
app.use((err, req, res, next) => {
    let msg = err.message;
    msg = req.app.get("env") === 'development' ? err : {};
    res.status(err.status || 500);
    res.json({ error: msg });
});

const PORT = process.env.HOST_PORT || 3000;
app.listen(PORT, () => {
    console.log(`API listening at port ${PORT}`);
});