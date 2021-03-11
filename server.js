'use strict';

require('dotenv').config();
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = require('express')();
app.use(bodyParser.json());
app.use(cors());

const port = process.env.COMMENT_SERVER_PORT || 4001

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    const comments = commentsByPostId[req.params.id] || [];

    comments.push({
        id: commentId, content
    });

    commentsByPostId[req.params.id] = comments;

    await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId, 
            content, 
            postId: req.params.postId,
        }
    });

    res.status(201).send(comments);
});

app.post('/events', (req, res) => {
    console.log('ReceivedEvent', req.body.type);

    res.send({});
});

app.listen(port, () => {
    console.log(`Comments service listening on port: ${port}`)
})