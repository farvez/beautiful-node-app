Beautiful Node App
A visually appealing Node.js web application deployed on AWS EC2 using Docker and GitHub Actions. This project demonstrates a full-stack development and DevOps workflow, featuring a responsive design with Bootstrap styling and automated CI/CD deployment.

Live URL: http://100.25.170.215
Technologies: Node.js, Express, Docker, AWS (EC2, ECR), GitHub Actions, Bootstrap
Status: Successfully deployed as of September 04, 2025

Table of Contents

Overview
Features
Project Setup
Development Steps
Dockerization
AWS EC2 Setup
GitHub Actions CI/CD
Troubleshooting and Optimization
Enhancements
Contributing
License

Overview
This project showcases a "Beautiful Node App" built with Node.js and Express.js, styled with Bootstrap, and deployed on an AWS EC2 instance. The app is containerized with Docker and deployed automatically using GitHub Actions, providing a seamless CI/CD pipeline. The deployment process includes building the app, pushing it to AWS ECR, and running it on EC2.
Features

Responsive hero section with a gradient background.
Three feature cards with placeholder images and descriptions.
Automated deployment via GitHub Actions.
Dockerized for consistency across environments.
Accessible via HTTP on port 80.

Project Setup
Prerequisites

Node.js (v18 or later)
Docker
AWS account with EC2 and ECR access
GitHub account
AWS CLI configured locally
Basic knowledge of Node.js, Docker, and AWS

Installation

Clone the repository:
bashgit clone https://github.com/yourusername/beautiful-node-app.git
cd beautiful-node-app

Install dependencies:
bashnpm install


Development Steps

Initialize the Project:

Created a new Node.js project:
bashnpm init -y

Installed Express.js:
bashnpm install express



Develop the Application:

Created app.js to serve a styled HTML page:

Used Express.js to handle HTTP requests.
Incorporated Bootstrap via CDN for responsive design.
Defined a hero section with a gradient background and feature cards using inline HTML with placeholder images (https://via.placeholder.com/300x200).


Sample app.js content:
javascriptconst express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Beautiful Node App</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
        <style>
            body { background-color: #f8f9fa; }
            .hero { background: linear-gradient(to right, #6a11cb, #2575fc); color: white; padding: 100px 0; text-align: center; }
        </style>
    </head>
    <body>
        <div class="hero">
            <h1 class="display-4">Welcome to My Beautiful App!</h1>
            <p class="lead">Deployed seamlessly with Docker and GitHub Actions on AWS EC2.</p>
            <button class="btn btn-light">Get Started</button>
        </div>
        <div class="container mt-5">
            <div class="row">
                <div class="col-md-4"><div class="card"><img src="https://via.placeholder.com/300x200" class="card-img-top"><div class="card-body"><h5 class="card-title">Feature 1</h5><p>Stunning visuals.</p></div></div></div>
                <div class="col-md-4"><div class="card"><img src="https://via.placeholder.com/300x200" class="card-img-top"><div class="card-body"><h5 class="card-title">Feature 2</h5><p>Responsive design.</p></div></div></div>
                <div class="col-md-4"><div class="card"><img src="https://via.placeholder.com/300x200" class="card-img-top"><div class="card-body"><h5 class="card-title">Feature 3</h5><p>Easy deployment.</p></div></div></div>
            </div>
        </div>
    </body>
    </html>
    `);
});

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
});

Tested locally:
bashnode app.js

Accessed at http://localhost:3000 to verify the UI.




Commit to GitHub:

Initialized a Git repository and pushed to GitHub:
bashgit init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/beautiful-node-app.git
git push -u origin main




Dockerization

Create Dockerfile:

Added a Dockerfile in the project root:
dockerfile# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy app source code
COPY . .

# Expose port
EXPOSE 3000

# Start the app
CMD ["node", "app.js"]



Build and Test Locally:

Built the image:
bashdocker build -t beautiful-node-app .

Ran the container:
bashdocker run -p 3000:3000 beautiful-node-app

Verified at http://localhost:3000.


Prepare for ECR:

Planned to push to AWS ECR, automated later via GitHub Actions.



AWS EC2 Setup

Launch EC2 Instance:

Created an EC2 instance (t2.micro, Amazon Linux 2 AMI) via AWS Console.
Configured security group to allow ports 22 (SSH), 80 (HTTP), and 3000.
Downloaded the PEM key (e.g., your-key.pem).


Connect and Install Docker:

Connected via SSH:
bashssh -i your-key.pem ec2-user@your-ec2-public-ip

Installed Docker:
bashsudo yum update -y
sudo yum install docker -y
sudo service docker start
sudo usermod -a -G docker ec2-user

Reconnected after group change.


Manual Deployment Test:

Pulled and ran the image:
bashdocker pull your-account-id.dkr.ecr.your-region.amazonaws.com/beautiful-node-app:latest
docker run -d -p 80:3000 beautiful-node-app:latest

Accessed via the EC2 public IP (e.g., http://100.25.170.215).



GitHub Actions CI/CD

Generate SSH Key Pair:

Created keys locally:
bashssh-keygen -t rsa -b 4096 -C "github-actions" -f github-actions-key

Added github-actions-key.pub to ~/.ssh/authorized_keys on EC2.


Store Secrets in GitHub:

Added secrets in GitHub repository settings:

EC2_HOST: EC2 public IP (e.g., 100.25.170.215).
EC2_USER: ec2-user.
EC2_SSH_KEY: Content of github-actions-key.
AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_ACCOUNT_ID, AWS_REGION: AWS credentials and details.




Create Workflow:

Added .github/workflows/deploy.yml:
yamlname: Deploy to EC2

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v3

    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: 18

    - name: Install dependencies
      run: npm install

    - name: Configure AWS credentials
      uses: aws-actions/configure-aws-credentials@v2
      with:
        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: ${{ secrets.AWS_REGION }}

    - name: Login to AWS ECR
      id: login-ecr
      uses: aws-actions/amazon-ecr-login@v1
      with:
        registry-type: private

    - name: Build, tag, and push Docker image
      env:
        REPO_NAME: beautiful-node-app
        IMAGE_TAG: latest
      run: |
        docker build -t $REPO_NAME:$IMAGE_TAG .
        ECR_URL=${{ secrets.AWS_ACCOUNT_ID }}.dkr.ecr.${{ secrets.AWS_REGION }}.amazonaws.com/$REPO_NAME:$IMAGE_TAG
        docker tag $REPO_NAME:$IMAGE_TAG $ECR_URL
        docker push $ECR_URL

    - name: Deploy to EC2 via SSH
      uses: appleboy/ssh-action@master
      with:
        host: ${{ secrets.EC2_HOST }}
        username: ${{ secrets.EC2_USER }}
        key: ${{ secrets.EC2_SSH_KEY }}
        script: |
          aws ecr get-login-password --region ${{ secrets.AWS_REGION }} | docker login --username AWS --password-stdin ${{ secrets.AWS_ACCOUNT_ID }}.dkr.ecr.${{ secrets.AWS_REGION }}.amazonaws.com
          docker pull ${{ secrets.AWS_ACCOUNT_ID }}.dkr.ecr.${{ secrets.AWS_REGION }}.amazonaws.com/beautiful-node-app:latest
          docker stop $(docker ps -q --filter "ancestor=${{ secrets.AWS_ACCOUNT_ID }}.dkr.ecr.${{ secrets.AWS_REGION }}.amazonaws.com/beautiful-node-app:latest" --filter "publish=80") || true
          docker rm $(docker ps -a -q --filter "ancestor=${{ secrets.AWS_ACCOUNT_ID }}.dkr.ecr.${{ secrets.AWS_REGION }}.amazonaws.com/beautiful-node-app:latest" --filter "publish=80") || true
          docker run -d -p 80:3000 ${{ secrets.AWS_ACCOUNT_ID }}.dkr.ecr.${{ secrets.AWS_REGION }}.amazonaws.com/beautiful-node-app:latest

Pushed to trigger the workflow.



Troubleshooting and Optimization

SSH Authentication Issue:

Fixed by ensuring EC2_SSH_KEY contained the correct private key (not the public key).
Tested locally with ssh -i github-actions-key ec2-user@100.25.170.215.


Port 80 Conflict:

Resolved by updating the script to stop and remove existing containers with proper filters.
Manually checked for other services on port 80 with sudo netstat -tulnp | grep :80.


Verification:

Confirmed app live at http://100.25.170.215 on September 04, 2025.



Enhancements

HTTPS: Plan to use AWS Certificate Manager and NGINX for SSL.
Monitoring: Integrate AWS CloudWatch.
Scaling: Add Auto Scaling Group and Load Balancer.
Images: Replace placeholders with custom assets.

Contributing
Contributions are welcome! Please fork the repository and submit pull requests.
