require('dotenv').config();
const AWS = require('aws-sdk');
const express = require('express');

AWS.config.update({ region: process.env.AWS_REGION });

const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

const queueURL = process.env.QUEUE_URL;

const params = {
    MessageBody: JSON.stringify({ message: 'Hello from SQS' }),
    QueueUrl: queueURL
}

const app = express();
const port = process.env.PORT || 3000;

app.get('/send-message', (req, res) => {
    sqs.sendMessage(params, (err, data) => {
        if (err) {
            console.error('Error sending message to SQS', err);
            res.status(500).send('Error sending message to SQS');
        } else {
            console.log('Message sent successfully', data.MessageId);
            res.send(`Message sent successfully: ${data.MessageId}`);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});