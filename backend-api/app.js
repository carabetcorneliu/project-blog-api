const cors = require('cors');
const express = require('express');
// const prisma = require('./db/prisma');
const routes = require('./routes');

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', routes.user);
// app.use('/post', routes.post);
// app.use('/messages', routes.messages);

const PORT = process.env.HOST_PORT || 3000;
app.listen(PORT, () => {
    console.log(`API listening at port ${PORT}`);
});