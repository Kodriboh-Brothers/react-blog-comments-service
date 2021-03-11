'use strict';

require('dotenv').config();
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const app = require('express')();
app.use(bodyParser.json());

const port = process.env.COMMENT_SERVER_PORT || 4001

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    const comments = commentsByPostId[req.params.id] || [];

    comments.push({
        id: commentId, content
    });

    commentsByPostId[req.params.id] = comments;

    res.status(201).send(comments);
});

app.listen(port, () => {
    console.log(`Comments service listening on port: ${port}`)
})