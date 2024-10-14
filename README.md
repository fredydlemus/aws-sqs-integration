# SQS Project

This project demonstrates how to use AWS SQS (Simple Queue Service) with Node.js. It includes a producer that sends messages to an SQS queue and a consumer that receives and processes messages from the queue.

## Project Structure

.env .github/ workflows/ deploy-infrastructure.yml .gitignore consumer.js infrastructure/ sqs-stack.yml package.json producer.js


## Prerequisites

- Node.js
- AWS CLI
- AWS account with appropriate permissions

## Setup

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add your AWS configuration:
    ```
    AWS_REGION=your-aws-region
    QUEUE_URL=your-sqs-queue-url
    ```

## Deploying the CloudFormation Stack

The CloudFormation stack can be deployed using GitHub Actions.

1. Ensure you have the necessary AWS IAM permissions:
    - `cloudformation:ValidateTemplate`
    - `cloudformation:CreateStack`
    - `cloudformation:UpdateStack`
    - `sqs:CreateQueue"`
    - `sqs:GetQueueUrl`
    - `sqs:GetQueueAttributes`
    - `sqs:SetQueueAttributes`
    - `sqs:DeleteQueue`

2. Configure the GitHub Actions workflow in `.github/workflows/deploy-infrastructure.yml`:
    ```yml
    name: Deploy CloudFormation Stack
    on:
        workflow_dispatch:
    permissions:
        id-token: write
        contents: read
    jobs:
        validate-and-deploy:
            runs-on: ubuntu-latest
            steps:
                - name: Checkout repository
                  uses: actions/checkout@v2
                - name: Set up AWS CLI
                  uses: aws-actions/configure-aws-credentials@v3
                  with:
                    role-to-assume: ${{ secrets.AWS_ROLE_ARN }}
                    aws-region: us-east-1
                - name: Validate CloudFormation template
                  run: aws cloudformation validate-template --template-body file://infrastructure/sqs-stack.yml
                - name: Deploy CloudFormation stack
                  run: aws cloudformation deploy --stack-name sqs-stack --template-file [sqs-stack.yml](http://_vscodecontentref_/#%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2FUsers%2Ffrflores%2Flearning%2Faws-integrations%2FSQS%2Finfrastructure%2Fsqs-stack.yml%22%2C%22path%22%3A%22%2FUsers%2Ffrflores%2Flearning%2Faws-integrations%2FSQS%2Finfrastructure%2Fsqs-stack.yml%22%2C%22scheme%22%3A%22file%22%7D%7D)
    ```

3. Trigger the workflow manually from the GitHub Actions tab.

## Running the Producer

The producer sends messages to the SQS queue.

1. Ensure your `.env` file is configured correctly.
2. Run the producer:
    ```sh
    node [producer.js](http://_vscodecontentref_/#%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2FUsers%2Ffrflores%2Flearning%2Faws-integrations%2FSQS%2Fproducer.js%22%2C%22path%22%3A%22%2FUsers%2Ffrflores%2Flearning%2Faws-integrations%2FSQS%2Fproducer.js%22%2C%22scheme%22%3A%22file%22%7D%7D)
    ```

## Running the Consumer

The consumer receives and processes messages from the SQS queue.

1. Ensure your `.env` file is configured correctly.
2. Run the consumer:
    ```sh
    node [consumer.js](http://_vscodecontentref_/#%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2FUsers%2Ffrflores%2Flearning%2Faws-integrations%2FSQS%2Fconsumer.js%22%2C%22path%22%3A%22%2FUsers%2Ffrflores%2Flearning%2Faws-integrations%2FSQS%2Fconsumer.js%22%2C%22scheme%22%3A%22file%22%7D%7D)
    ```

## Files

- **[producer.js](producer.js)**: Sends messages to the SQS queue.
- **[consumer.js](consumer.js)**: Receives and processes messages from the SQS queue.
- **[infrastructure/sqs-stack.yml](infrastructure/sqs-stack.yml)**: CloudFormation template for creating the SQS queue.
- **[.github/workflows/deploy-infrastructure.yml](.github/workflows/deploy-infrastructure.yml)**: GitHub Actions workflow for deploying the CloudFormation stack.

## Dependencies

- `aws-sdk`: AWS SDK for JavaScript
- `dotenv`: Loads environment variables from a `.env` file

## License

This project is licensed under the ISC License.