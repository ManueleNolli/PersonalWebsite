# Personal Website

## Versions

* node: 20.16.0
* yarn: 1.22.22

## Run

```bash
yarn dev
```


## Structure

```
src/ # All source code
    app/ # pages and components
        layout.tsx # Header and Footer
        page.tsx # Home Page
        error.tsx # Error Page
        not-found.tsx # Not Found Page
        components/ # Components
            header/ # Header Component
                header.tsx
public/ # static assets
```

## AWS Infrastructure Costs

This section provides an overview of the estimated costs for hosting a personal website on AWS.

### Free Tier Resources

| **Service**                            | **Free Tier Limit**                                                                                                                                                | **Sources**                                                        |
|----------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------|
| **CloudFront**                         | 10,000,000 HTTPS requests per month                                                                                                                                | [CloudFront Pricing](https://aws.amazon.com/cloudfront/pricing/)   |
| **API Gateway**                        | First 1,000,000 HTTP API calls per month                                                                                                                           | [API Gateway Pricing](https://aws.amazon.com/api-gateway/pricing/) |
| **Lambda**                             | 1,000,000 free requests per month                                                                                                                                  | [Lambda Pricing](https://aws.amazon.com/lambda/pricing/)           |
| **S3 (Amazon Simple Storage Service)** | 5GB of standard storage, 20,000 GET requests, and 2,000 PUT requests for the first 12 months. For a personal website, the cost would be less than $3.00 per month. | [S3 Pricing](https://aws.amazon.com/s3/pricing/)                   |

### Additional Resources 

Those resources are not included into the project, I configured them manually on AWS console.

| **Service**                        | **Cost**                                        | **Sources**                                                                        |
|------------------------------------|-------------------------------------------------|------------------------------------------------------------------------------------|
| **Route 53**                       | $0.50 per month for domain name management      | [Route 53 Pricing](https://aws.amazon.com/route53/pricing/)                        |
| **Budgets**                        | $0.01 per report to monitor costs and usage     | [Budgets Pricing](https://aws.amazon.com/aws-cost-management/aws-budgets/pricing/) |
| **Certificate Manager (SSL)**      | Free SSL certificates for use with AWS services | [Certificate Manager Pricing](https://aws.amazon.com/certificate-manager/pricing/) |
| **WAF (Web Application Firewall)** | $5.00 per month for web security protection     | [WAF Pricing](https://aws.amazon.com/waf/pricing/)                                 |

The total monthly cost for the AWS infrastructure is estimated to be less than **\$5.00** per month (plus **\$5.00** for security), considering the resources used and the free tier limits.

Not bad for a personal website! 🚀

### Additional Information

- [AWS Free Tier Overview](https://aws.amazon.com/free/)
- [S3 Cost Calculator for Personal Websites](https://calculator.aws/#/createCalculator/S3)

## GraphQL
https://docs.github.com/en/graphql/reference/interfaces#repositoryinfo