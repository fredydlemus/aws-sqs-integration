require('dotenv').config();
const AWS = require('aws-sdk');

AWS.config.update({ region: process.env.AWS_REGION });

const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

const queueURL = process.env.QUEUE_URL;

const params = {
    MessageBody: JSON.stringify({ message: 'Hello from SQS' }),
    QueueUrl: queueURL
}

sqs.sendMessage(params, (err, data) =>{
    if(err){
        console.error('Error sending message to SQS', err);
    }else{
        console.log('Message sent successfully', data.MessageId);
    }
})