# Student Records Web Application

A scalable, cloud-native web application for managing university student records, built with React and deployed on AWS following Well-Architected Framework principles.

## Features

- **Student Management**: View, add, edit, and delete student records
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: Instant feedback for all operations
- **Form Validation**: Client-side validation for data integrity
- **Modern UI**: Clean, professional interface matching university branding

## Architecture

This application follows AWS Well-Architected Framework principles:

### Frontend Architecture
- **React SPA**: Single Page Application for optimal user experience
- **S3 Static Hosting**: Highly available and scalable static content delivery
- **CloudFront CDN**: Global content distribution for low latency
- **Responsive Design**: Mobile-first approach for accessibility

### Infrastructure (AWS)
- **S3 Bucket**: Static website hosting with public read access
- **CloudFront**: CDN for global content delivery and HTTPS termination
- **Application Load Balancer**: Ready for future API backend integration
- **VPC**: Isolated network environment for backend services
- **Multi-AZ Deployment**: High availability across multiple availability zones

### Well-Architected Pillars Addressed

1. **Operational Excellence**
   - Infrastructure as Code (CloudFormation)
   - Automated deployment pipeline
   - Monitoring and logging capabilities

2. **Security**
   - HTTPS enforcement via CloudFront
   - S3 bucket policies for controlled access
   - VPC isolation for backend services
   - Security groups for network access control

3. **Reliability**
   - Multi-AZ deployment
   - CloudFront global distribution
   - S3 99.999999999% (11 9's) durability
   - Auto-scaling capabilities (future backend)

4. **Performance Efficiency**
   - CloudFront edge caching
   - Optimized React build
   - Lazy loading and code splitting ready
   - CDN for static assets

5. **Cost Optimization**
   - S3 for cost-effective static hosting
   - CloudFront pricing tiers
   - Pay-as-you-go model
   - Efficient resource utilization

## Getting Started

### Prerequisites
- Node.js 16+ and npm
- AWS CLI configured with appropriate permissions
- AWS account with necessary service access

### Local Development

1. **Clone and install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm start
   ```

3. **Open browser**: Navigate to `http://localhost:3000`

### AWS Deployment

1. **Configure AWS CLI**:
   ```bash
   aws configure
   ```

2. **Deploy to AWS**:
   ```bash
   chmod +x scripts/deploy.sh
   ./scripts/deploy.sh dev
   ```

3. **Access your application**: Use the CloudFront URL provided in the deployment output

### Manual Deployment Steps

If you prefer manual deployment:

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Deploy infrastructure**:
   ```bash
   aws cloudformation deploy \
     --template-file infrastructure/cloudformation.yaml \
     --stack-name student-records-dev \
     --parameter-overrides Environment=dev \
     --capabilities CAPABILITY_IAM
   ```

3. **Upload to S3**:
   ```bash
   aws s3 sync build/ s3://your-bucket-name --delete
   ```

4. **Invalidate CloudFront cache**:
   ```bash
   aws cloudfront create-invalidation \
     --distribution-id YOUR_DISTRIBUTION_ID \
     --paths "/*"
   ```

## Project Structure

```
student-records-app/
├── public/                 # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── StudentList.js
│   │   └── StudentModal.js
│   ├── services/          # API service layer
│   │   └── studentService.js
│   ├── App.js            # Main application component
│   ├── index.js          # Application entry point
│   └── index.css         # Global styles
├── infrastructure/        # AWS CloudFormation templates
│   └── cloudformation.yaml
├── scripts/              # Deployment scripts
│   └── deploy.sh
├── buildspec.yml         # AWS CodeBuild specification
├── package.json          # Node.js dependencies
└── README.md
```

## Scaling for Peak Admissions Period

The architecture is designed to handle thousands of concurrent users:

### Current Capabilities
- **CloudFront**: Automatically scales to handle traffic spikes
- **S3**: Virtually unlimited scalability for static content
- **Global Distribution**: Edge locations worldwide for low latency

### Future Enhancements (Backend API)
- **Auto Scaling Groups**: Automatically scale EC2 instances based on demand
- **RDS Multi-AZ**: Database high availability and read replicas
- **ElastiCache**: Redis/Memcached for session management and caching
- **API Gateway**: Rate limiting and request throttling
- **Lambda Functions**: Serverless compute for specific operations

## Security Considerations

- **HTTPS Only**: All traffic encrypted in transit
- **CORS Configuration**: Proper cross-origin resource sharing setup
- **Input Validation**: Client and server-side validation
- **Access Controls**: IAM roles and policies for AWS resources
- **Security Headers**: Implemented via CloudFront

## Monitoring and Observability

- **CloudWatch**: Metrics and logging for all AWS services
- **CloudFront Metrics**: Request counts, error rates, cache hit ratios
- **S3 Access Logs**: Detailed request logging
- **Custom Dashboards**: Real-time monitoring of application health

## Cost Estimation

For a typical university with moderate traffic:
- **S3 Hosting**: ~$1-5/month
- **CloudFront**: ~$5-20/month (depending on traffic)
- **Data Transfer**: ~$5-15/month
- **Total**: ~$11-40/month for frontend hosting

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For issues and questions:
- Check the AWS CloudFormation documentation
- Review React documentation for frontend issues
- Monitor CloudWatch logs for deployment issues

## License

This project is licensed under the MIT License - see the LICENSE file for details.