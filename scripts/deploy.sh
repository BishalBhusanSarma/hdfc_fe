#!/bin/bash

# Student Records App Deployment Script
set -e

# Configuration
ENVIRONMENT=${1:-dev}
STACK_NAME="student-records-$ENVIRONMENT"
REGION=${AWS_DEFAULT_REGION:-us-east-1}

echo "Deploying Student Records App to $ENVIRONMENT environment..."

# Build the React application
echo "Building React application..."
npm install
npm run build

# Deploy CloudFormation stack
echo "Deploying infrastructure..."
aws cloudformation deploy \
  --template-file infrastructure/cloudformation.yaml \
  --stack-name $STACK_NAME \
  --parameter-overrides Environment=$ENVIRONMENT \
  --capabilities CAPABILITY_IAM \
  --region $REGION

# Get stack outputs
echo "Getting stack outputs..."
BUCKET_NAME=$(aws cloudformation describe-stacks \
  --stack-name $STACK_NAME \
  --region $REGION \
  --query 'Stacks[0].Outputs[?OutputKey==`S3BucketName`].OutputValue' \
  --output text)

CLOUDFRONT_ID=$(aws cloudformation describe-stacks \
  --stack-name $STACK_NAME \
  --region $REGION \
  --query 'Stacks[0].Outputs[?OutputKey==`CloudFrontDistributionId`].OutputValue' \
  --output text)

WEBSITE_URL=$(aws cloudformation describe-stacks \
  --stack-name $STACK_NAME \
  --region $REGION \
  --query 'Stacks[0].Outputs[?OutputKey==`WebsiteURL`].OutputValue' \
  --output text)

# Upload build files to S3
echo "Uploading files to S3 bucket: $BUCKET_NAME"
aws s3 sync build/ s3://$BUCKET_NAME --delete

# Invalidate CloudFront cache
echo "Invalidating CloudFront cache..."
aws cloudfront create-invalidation \
  --distribution-id $CLOUDFRONT_ID \
  --paths "/*"

echo "Deployment completed successfully!"
echo "Website URL: $WEBSITE_URL"
echo "S3 Bucket: $BUCKET_NAME"
echo "CloudFront Distribution ID: $CLOUDFRONT_ID"