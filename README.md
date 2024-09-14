# S3 Static Website Setup

## Steps to Create an S3 Static Website

### 1. Create an S3 Bucket

1. Log in to the [AWS Management Console](https://aws.amazon.com/console/).
2. Navigate to the **S3** service.
3. Click **Create Bucket**.
4. Enter a **Bucket name** (this should be globally unique, for example, `my-static-site.com`).
5. Select a **region** close to your users.
6. **Uncheck** "Block all public access" (we will enable public access later with a bucket policy).
7. Click **Create bucket**.

### 2. Upload Your Website Files

1. In your newly created bucket, click the **Upload** button.
2. Drag and drop your static website files (e.g., HTML, CSS, JavaScript, images) or use the **Add files** option.
3. Click **Upload**.

### 3. Enable Static Website Hosting

1. Inside the S3 bucket, go to the **Properties** tab.
2. Scroll down to **Static website hosting**.
3. Click **Edit** and choose **Enable**.
4. Select **Host a static website**.
5. Specify your **index document** (e.g., `index.html`).
6. Optionally, specify an **error document** (e.g., `404.html`).
7. Save changes.

### 4. Set Bucket Policy for Public Access

To make your website publicly accessible, you need to configure a bucket policy.

1. Go to the **Permissions** tab of your S3 bucket.
2. Scroll down to **Bucket Policy** and click **Edit**.
3. Paste the following bucket policy, replacing `YOUR-BUCKET-NAME` with your actual bucket name:

    ```json
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "PublicReadGetObject",
                "Effect": "Allow",
                "Principal": "*",
                "Action": "s3:GetObject",
                "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
            }
        ]
    }
    ```

4. Save the changes.

### 5. Test the Static Website

1. After enabling static website hosting and applying the bucket policy, your site will be publicly available.
2. Go to the **Properties** tab, scroll down to **Static website hosting**, and copy the **Bucket website endpoint**.
3. Paste the URL into your browser to verify that the website is live.

## Optional: Use a Custom Domain with Route 53

If you have a custom domain and wish to point it to your S3 website:

1. Navigate to **Route 53** and create a new hosted zone for your domain.
2. Add an **A record** or **CNAME record** pointing to your S3 website endpoint.

## Important Notes

- S3 static websites only support HTTP, not HTTPS. For HTTPS, you can use CloudFront as a Content Delivery Network (CDN) in combination with your S3 bucket.
- Make sure you understand the security implications of making your bucket publicly accessible. If you're concerned about unauthorized access, consider limiting public access to only the necessary files.

## Troubleshooting

- Ensure the **Bucket Policy** is correctly applied to allow public access.
- Double-check that your **index document** matches the file name uploaded to the S3 bucket.
- If using a custom domain, ensure DNS settings are configured correctly in Route 53.


