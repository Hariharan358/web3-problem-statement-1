# Blockchain-Based Insurance Fraud Prevention System
TEAM GHASA

1.Overview

•This project aims to prevent insurance fraud by leveraging blockchain, IPFS, machine learning, and secure payment gateways. It includes two main websites: one for users to manage claims and policies, and one for issuers to verify and process claims securely

2.Features

•User Website

•Login Authentication: Users authenticate with Aptos coin to ensure secure access.

•Dashboard: Shows detailed policy information to keep users informed.

•View & Apply for Policies: Users can view all available policies and apply directly.

•Document Submission: Required documents are encrypted and stored on the Polygon blockchain via IPFS.

•Monthly Premium Payments: Users can make regular payments through Razorpay

3.Issuer Website

•Claim Management: Displays all user-applied claims for review.

•Fraud Detection: Machine learning model identifies potential hacker activity.

•Blockchain Document Verification: Confirms document integrity using blockchain.

•Manual Verification: Issuers can manually inspect claims as needed.

•Claim Payment: Approved claims are processed through Razorpay for secure payouts to users.

4.Admin Page

•Claim Verification: Admins can verify, accept, or reject claims.

•Machine Learning Integration: An ML model is used for fraud detection, assisting admins in identifying suspicious claims.


5.Technologies Used

•Blockchain: Aptos coin for login, Polygon for data storage

•IPFS: Secure, decentralized file storage

•Machine Learning: Fraud detection and verification system

•Razorpay: Payment processing for claims and premium payments

•Flask: Backend framework for the admin page.

6.Installation

•Clone the repository:
bash
Copy code
git clone https://github.com/Hariharan358/web3-problem-statement-1.git

•Install dependencies for each website:
bash
Copy code
npm install
Configure your blockchain and Razorpay API keys in .env.
Usage

•Start the user and issuer websites:
bash
Copy code
npm start
Access the user website at http://localhost:3000/.
Contributing
Please submit issues and pull requests to help improve the system.


7.Run the admin page:

bash
Copy code

cd admin

python app.py
