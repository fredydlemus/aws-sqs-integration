require('dotenv').config();
const AWS = require('aws-sdk');

AWS.config.update({ region: process.env.AWS_REGION });

const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

const queueURL = process.env.QUEUE_URL;

const params = {
    QueueUrl: queueURL,
    MaxNumberOfMessages: 1,
    VisibilityTimeout: 20,
    WaitTimeSeconds: 0
};

function receiveMessage() {
    sqs.receiveMessage(params, (err, data) => {
        if (err) {
            console.error('Error receiving message from SQS', err);
        } else if (data.Messages && data.Messages.length > 0) {
            const message = data.Messages[0];
            console.log('This is the message:', message);
            console.log('Message received:', message.Body);

            const deleteParams = {
                QueueUrl: queueURL,
                ReceiptHandle: message.ReceiptHandle
            };

            sqs.deleteMessage(deleteParams, (err, data) => {
                if (err) {
                    console.error('Error deleting message from SQS', err);
                } else {
                    console.log('Message deleted successfully', data);
                }
            });
        } else {
            console.log('No messages to receive');
        }
    });
}

// Poll for messages every 10 seconds
setInterval(receiveMessage, 10000);