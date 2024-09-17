# Introduction to Amazon Simple Storage Service (S3)

**Amazon Simple Storage Service (Amazon S3)** is an object storage service that offers scalable, durable, and secure storage for any type of data. It is designed to store and retrieve large amounts of data from anywhere on the web, making it ideal for a wide variety of use cases, including backup and restore, archiving, big data analytics, and hosting static websites.

With Amazon S3, data is stored as **objects** in **buckets**. A bucket is a container for storing data, and each object within a bucket is identified by a unique key. S3 provides virtually unlimited storage, with a robust security framework to control access to the data.

Key features of Amazon S3:
- **Scalability**: S3 automatically scales to meet your data storage needs.
- **Durability and Availability**: S3 is designed for 99.999999999% (11 nines) durability, ensuring that your data is stored redundantly across multiple physical locations.
- **Security**: Data can be secured using AWS Identity and Access Management (IAM) policies, bucket policies, and encryption.
- **Cost-effectiveness**: S3 offers tiered pricing through different storage classes, allowing you to optimize costs based on how frequently data is accessed.
---
### Introduction to S3 Policies

**Amazon S3 Policies** are a way to manage access control to your S3 buckets and objects. These policies define who can access your data, under what conditions, and what actions they are allowed to perform. There are three main types of policies you can use to control access:

1. **Bucket Policies**: A bucket policy is a resource-based policy that is attached directly to an S3 bucket. It allows you to grant access to the bucket and its contents to specific AWS accounts or users. Bucket policies are written in JSON and can define permissions such as reading, writing, or listing the objects in a bucket.

2. **IAM Policies**: IAM policies are identity-based policies attached to AWS users, groups, or roles. These policies define what S3 resources a user can access and the actions they are allowed to perform (e.g., upload, download, delete files).

3. **Access Control Lists (ACLs)**: ACLs are legacy methods for granting permissions on individual objects or buckets. ACLs define permissions at a more granular level but are generally considered less flexible than bucket policies and IAM policies.

By configuring S3 policies, you can enforce data security, ensure proper access management, and define specific permissions that align with your business needs. These policies can also integrate with encryption standards, logging, and monitoring to ensure compliance with industry regulations.

---
### Introduction to S3 Storage Classes

Amazon S3 offers several **storage classes** that allow you to store your data in the most cost-effective way, based on how frequently the data is accessed and its lifecycle requirements. Each storage class provides different pricing models and features to optimize cost and performance. Below are the most commonly used S3 storage classes:

1. **S3 Standard**:
   - Designed for frequently accessed data.
   - High durability, availability, and performance.
   - Suitable for applications requiring low-latency and high throughput.

2. **S3 Intelligent-Tiering**:
   - Automatically moves data between two access tiers (frequent and infrequent) based on usage patterns.
   - Ideal for data with unpredictable or changing access patterns.

3. **S3 Standard-IA (Infrequent Access)**:
   - Suitable for data that is accessed less frequently but requires fast access when needed.
   - Lower storage cost compared to S3 Standard, but higher retrieval costs.

4. **S3 One Zone-IA**:
   - Similar to Standard-IA, but data is stored in a single availability zone.
   - Suitable for data that can be recreated easily or that is non-critical.

5. **S3 Glacier**:
   - Designed for long-term archival storage.
   - Lower storage costs but longer retrieval times (minutes to hours).
   - Suitable for infrequently accessed data, such as backups or compliance data.

6. **S3 Glacier Deep Archive**:
   - The lowest-cost storage class for long-term data storage.
   - Retrieval times are slower (up to 12 hours), making it ideal for data that is rarely accessed.

- Amazon S3 provides flexible, secure, and highly durable storage for a wide range of use cases.
- By understanding the various **S3 policies**, you can control who has access to your data, ensuring that sensitive information is protected. Meanwhile, **storage classes** allow you to optimize costs based on how frequently your data is accessed.
- Together, these features make S3 a powerful tool for data management and storage in the cloud.
---
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


| **Backup & Recovery**  | Built-in redundancy across regions/AZs; versioning and lifecycle policies are available. | Snapshots can be created manually and stored in S3, allowing backups to persist beyond a single AZ. |
### Difference Between Amazon S3 and Amazon EBS

**Amazon S3 (Simple Storage Service)** and **Amazon EBS (Elastic Block Store)** are both storage services offered by AWS, but they serve different use cases and have distinct characteristics. Below is a comparison of the two:

| **Feature**           | **Amazon S3**                                  | **Amazon EBS**                                 |
|-----------------------|------------------------------------------------|------------------------------------------------|
| **Storage Type**       | Object storage                                | Block storage                                 |
| **Use Case**           | Storing unstructured data such as backups, media, documents, logs, etc. | Attaching storage to an EC2 instance for use as a hard drive (e.g., for operating systems, databases, and applications). |
| **Access Method**      | Access via HTTP/HTTPS with REST API            | Access via an EC2 instance as mounted storage (similar to a disk) using the file system or raw block device access. |
| **Durability**         | Extremely high durability (99.999999999% or 11 nines). Data is replicated across multiple Availability Zones. | High durability within a single Availability Zone, but can be backed up to S3 using snapshots for cross-AZ protection. |
| **Performance**        | Best suited for large-scale data retrieval with high throughput. | Designed for low-latency, high-performance access, like a physical hard disk. |
| **Scalability**        | Automatically scales to virtually unlimited storage. | Capacity must be provisioned and expanded manually as needed. |
| **Pricing Model**      | Pay for the amount of storage used, with additional costs for data retrieval and access frequency. | Pay for the storage provisioned (even if not fully used), with performance-based pricing for storage types. |
| **Data Access Pattern**| Data is typically accessed in chunks (objects), not partial or random access. | Supports random read/write operations and is typically used for OS or application storage. |
| **Use Cases**          | Static websites, backups, media storage, data lakes, big data analytics, logging. | Running databases, hosting OS and applications, storing frequently modified data. |
| **Availability**       | Available across multiple regions and AZs by default. | Restricted to a single AZ, though snapshots can be used to restore in other AZs. |
| **Storage Classes**    | Multiple storage classes (Standard, Intelligent-Tiering, Glacier, etc.) for cost-optimization based on access frequency. | Different volume types (General Purpose SSD, Provisioned IOPS SSD, Throughput Optimized HDD, Cold HDD) based on performance needs. |
