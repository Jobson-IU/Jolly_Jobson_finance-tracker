##FinTrack – Student Finance Tracker

FinTrack is a modern full-stack financial management dashboard developed to help students and individuals manage their daily income and expenses in a simple, secure, and organized way. The application provides real-time financial tracking, analytics, reporting, and transaction management through an interactive fintech-style dashboard.

The project was developed using React for the frontend and Node.js with Express for the backend. Authentication is implemented using JWT (JSON Web Token), and financial data is managed dynamically through REST APIs.

Features
Authentication System
User Registration
User Login
JWT Authentication
Protected API Routes
Secure Access Control
Logout Functionality
Dashboard Features
Add Income Transactions
Add Expense Transactions
Real-Time Financial Summary
Total Income Calculation
Total Expense Calculation
Remaining Balance Display
Recent Transaction History
Savings Rate Monitoring
Highest Spending Category Detection
Analytics Module
Expense Breakdown Pie Chart
Income vs Expense Bar Chart
Dynamic Financial Visualization
Real-Time Analytics Updates
Reports Module
Monthly Financial Summary
Financial Health Status
Savings Analysis
Smart Financial Recommendations
Expense Insights
UI Features
Responsive Dashboard Design
Modern FinTech Interface
Sidebar Navigation
KPI Summary Cards
Interactive Dashboard Layout
Dark Theme Design
Technologies Used
Frontend
React.js
Tailwind CSS
Axios
Chart.js
React ChartJS 2
Lucide React Icons
Backend
Node.js
Express.js
Prisma ORM
PostgreSQL
JWT Authentication
bcrypt.js
Project Architecture

The application follows a full-stack client-server architecture.

User Interface (React Frontend)
            ↓
REST API Requests (Axios)
            ↓
Node.js + Express Backend
            ↓
Prisma ORM
            ↓
PostgreSQL Database

The frontend handles user interaction and dashboard rendering, while the backend processes requests, handles authentication, and manages financial data.

Installation Guide
Clone Repository
git clone https://github.com/Jobson-IU/Jolly_Jobson_finance-tracker.git
Backend Setup
Navigate to Backend Folder
cd server
Install Dependencies
npm install
Create Environment Variables

Create a .env file inside the server directory:

DATABASE_URL="postgresql://username:password@localhost:5432/fintrack"
JWT_SECRET="your_secret_key"
Run Prisma Migration
npx prisma migrate dev
Start Backend Server
npm start

Backend runs on:

http://localhost:5000
Frontend Setup
Navigate to Frontend Folder
cd client
Install Dependencies
npm install
Start Frontend Application
npm start

Frontend runs on:

http://localhost:3000
API Endpoints
Authentication APIs
Register User
POST /api/auth/register
Login User
POST /api/auth/login
Transaction APIs
Get Transactions
GET /api/transactions
Add Transaction
POST /api/transactions
Dashboard Overview

The dashboard provides a complete financial overview through dynamic KPI cards and summaries.

Users can:

add new financial transactions,
monitor income and expenses,
view remaining balance,
analyze savings,
track spending patterns.

The dashboard updates automatically whenever new transactions are added.

Analytics Section

The analytics module provides graphical representation of financial data using Chart.js.

The system includes:

pie charts for expense categorization,
bar charts for income vs expense comparison,
real-time financial insights.

These analytics help users understand their financial behaviour more effectively.

Reports Section

The reports module provides detailed financial analysis and recommendations.

Features include:

savings rate calculation,
financial health evaluation,
highest expense category analysis,
smart spending recommendations.

The system dynamically generates recommendations based on user spending patterns.

Authentication Flow
User Login
    ↓
JWT Token Generated
    ↓
Token Stored in Local Storage
    ↓
Access Protected Dashboard

Protected routes ensure that users can only access their own financial data securely.

Challenges Faced During Development

Several technical challenges were encountered during development, including:

frontend-backend integration issues,
JWT authentication handling,
React rendering errors,
analytics synchronization problems,
API debugging,
state management issues.

These problems were resolved through repeated testing, debugging, and restructuring of frontend and backend components.

Future Improvements

Future enhancements planned for FinTrack include:

AI-based financial prediction,
budgeting tools,
recurring transactions,
PDF report export,
cloud deployment,
mobile application support,
multi-currency support,
notification system,
advanced analytics dashboards.
Learning Outcomes

This project helped in understanding:

full-stack web development,
REST API integration,
authentication systems,
React state management,
financial dashboard architecture,
frontend-backend communication,
debugging and testing methodologies.

The development process also provided practical experience in building scalable and interactive web applications.

Screenshots

Add screenshots here:

Login Page
Register Page
Dashboard
Analytics Section
Reports Section
API Response Testing
Database Schema
Author
Jobson Jolly

Master’s in Computer Science
IU International University of Applied Sciences
Berlin, Germany

Conclusion

FinTrack successfully demonstrates the development of a secure and interactive full-stack financial analytics dashboard system. The application provides users with a simple yet professional platform for tracking income and expenses, analyzing spending behaviour, and monitoring financial health.

The project integrates frontend development, backend APIs, authentication systems, analytics visualization, and reporting modules into a single scalable application. Throughout the development process, the project provided valuable practical experience in software engineering concepts such as REST API integration, frontend-backend communication, debugging, authentication, and responsive UI design.

Overall, FinTrack serves as both a practical financial management tool and a strong demonstration of modern full-stack application development principles.
