# Student Finance-Tracker



## Overview
This project presents a centralized personal finance tracking platform designed for students. The system allows users to record, manage, and monitor their financial transactions in a simple and efficient way.

---

## Problem Statement
Students often struggle to manage their daily expenses due to a lack of simple and accessible tools. Existing financial applications are often too complex or not tailored to student needs, leading to poor financial awareness and overspending.

---

## Proposed Solution
A web-based application that:

- Enables users to track income and expenses
- Provides a simple interface for managing transactions
- Organizes expenses into categories
- Offers real-time access to financial data

---

## Features
- User authentication (Register/Login)
- Add and manage financial transactions
- Categorization of expenses (Food, Rent, etc.)
- View transaction history
- REST API-based backend system
- Modular backend structure

---

## Tech Stack

Frontend: React  
Backend: Node.js (Express)  
Authentication: JWT + bcryptjs  
Communication: REST API  
Tools: Git, GitHub, Thunder Client  

---

## System Architecture

- React frontend communicates with Express backend via REST API  
- Backend handles authentication and transaction logic  
- Data is currently stored in memory (temporary storage)  
- Future integration planned with a database (PostgreSQL)

---

## How to Run

### Backend
```
cd backend
npm install
node server.js
```

### Frontend
```
cd frontend
npm install
npm start
```

---

## Future Improvements
- Database integration (PostgreSQL + Prisma)
- Secure routes with JWT middleware
- Dashboard with charts and analytics
- Cloud deployment (AWS / Vercel)
- Mobile-friendly UI improvements

---

## Conclusion
The Student Finance Tracker provides a simple and effective solution for managing personal finances. It demonstrates a full-stack architecture with clear separation between frontend and backend. Future enhancements will improve scalability, data persistence, and user experience.
