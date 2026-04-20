

---

## 📖 Table of Contents
- [Project Overview](#-project-overview)
- [Key Features](#-key-features)
- [System Architecture](#-system-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [Local Development Setup](#-local-development-setup)
- [API Documentation](#-api-documentation)
- [Deployment Guide](#-deployment-guide)

---

## 🌟 Project Overview
This project is a complete, production-ready e-commerce platform designed with a split frontend/backend architecture residing in a single monorepo. It features a blazing-fast React storefront communicating with a robust Python FastAPI backend, handling secure payments, real-time administrative alerts, and user analytics.

## ✨ Key Features
- **Modern User Interface:** Built with React 19 and Vite, featuring smooth animations via Framer Motion and responsive design with Tailwind CSS.
- **Secure Payment Gateway:** Full Razorpay integration for seamless and secure checkout experiences.
- **Real-Time Admin Alerts:** Automated Telegram bot notifications triggered instantly upon successful order creation.
- **User Analytics:** Integrated Google Analytics 4 (GA4) for tracking user journeys and conversion rates.
- **Scalable Backend:** FastAPI core running on Uvicorn, structured for high concurrency and fast response times.
- **Authentication & Database:** Configured for Supabase and Firebase integration.

---

## 🏗️ System Architecture

This repository utilizes a **Monorepo** strategy. Both the frontend and backend live in the same repository but are deployed entirely independently.

```

````text?code_stdout&code_event_index=2
Created README-v2.md

```mermaid
graph LR
    A[Client Browser] -->|HTTPS| B(Netlify: React Frontend)
    B -->|REST API Calls| C(Render: FastAPI Backend)
    C -->|Order Created| D[Telegram API]
    D -->|Push Notification| E[Admin Phone]
    C -->|Payment Processing| F[Razorpay API]
````

-----

## 💻 Tech Stack

### Frontend (`/rvo-site`)

  - **Framework:** React 19, Vite 8
  - **Routing:** React Router DOM v7
  - **Styling:** Tailwind CSS, PostCSS
  - **Animations:** Framer Motion
  - **Analytics:** React-GA4
  - **State/Forms:** React Hook Form

### Backend (`/` Root)

  - **Framework:** FastAPI, Uvicorn
  - **Language:** Python 3.11+
  - **Integrations:** `pyTelegramBotAPI`, `httpx`, `razorpay`
  - **Validation:** Pydantic

-----

## 📂 Project Structure

```text
Eco-Friendly-e-commerce/
│
├── main.py                 # FastAPI Application Core
├── requirements.txt        # Backend Python Dependencies
├── .env                    # Backend Environment Variables (Local only)
│
├── rvo-site/               # FRONTEND DIRECTORY
│   ├── index.html          # Main HTML entry point
│   ├── package.json        # Frontend Node Dependencies
│   ├── vite.config.js      # Vite configuration
│   ├── netlify.toml        # Netlify deployment settings
│   ├── .env                # Frontend Environment Variables (Local only)
│   └── src/
│       ├── main.jsx        # React DOM rendering
│       ├── App.jsx         # Main Application Component
│       ├── components/     # Reusable UI components
│       └── pages/          # Page-level components (Home, Checkout, etc.)
│
├── .gitignore              # Git ignore rules
└── README.md               # Project documentation
```

-----

## 🔐 Environment Variables

To run this project locally or in production, you must configure the following environment variables in their respective directories.

### Backend (`/.env`)

Create a `.env` file in the **root** folder:

```env
# Telegram Integration
TELEGRAM_BOT_TOKEN=your_botfather_token_here
ADMIN_CHAT_ID=your_personal_telegram_user_id

# Server Config
PORT=10000
```

### Frontend (`/rvo-site/.env`)

Create a `.env` file inside the **`rvo-site`** folder:

```env
# API Connection
VITE_API_URL=http://localhost:10000  # Change to Render URL in production

# Payment Gateway
VITE_RAZORPAY_KEY_ID=rzp_test_your_key_here

# Analytics
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Database & Auth
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_FIREBASE_API_KEY=your_firebase_api_key
```

-----

## 🛠️ Local Development Setup

### Prerequisites

  - Node.js (v18+)
  - Python (v3.11+)
  - Git

### 1\. Start the Backend (FastAPI)

Open a terminal in the root directory:

```bash
# Clone the repository
git clone [https://github.com/AadithyaAle/Eco-Friendly-e-commerce.git](https://github.com/AadithyaAle/Eco-Friendly-e-commerce.git)
cd Eco-Friendly-e-commerce

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows use: venv\\Scripts\\activate

# Install dependencies
pip install -r requirements.txt

# Start the server
uvicorn main:app --reload --port 10000
```

*The backend API will be available at `http://localhost:10000`*

### 2\. Start the Frontend (React)

Open a **new** terminal window and navigate to the frontend folder:

```bash
# Enter the frontend directory
cd rvo-site

# Install Node modules
npm install

# Start the Vite development server
npm run dev
```

*The frontend application will be available at `http://localhost:5173`*

-----

## 📡 API Documentation

### Health Check

  - **Endpoint:** `GET /`
  - **Response:**
    ```json
    {
      "status": "Online",
      "system": "FastAPI Core Active"
    }
    ```

### Create Order

  - **Endpoint:** `POST /api/create-order`
  - **Body:**
    ```json
    {
      "cart_items": ["Item 1", "Item 2"],
      "total_amount": 1499.00
    }
    ```
  - **Response:**
    ```json
    {
      "success": true,
      "order_id": "pay_mock_123456"
    }
    ```
  - **Action:** Triggers an asynchronous Telegram alert to the Admin.

-----

## 🚀 Deployment Guide

### Frontend Deployment (Netlify)

1.  Connect your GitHub repository to Netlify.
2.  Configure the build settings:
      - **Base directory:** `rvo-site`
      - **Build command:** `npm run build`
      - **Publish directory:** `rvo-site/dist`
3.  Add your `VITE_` Environment Variables in the Netlify dashboard.
4.  Deploy\!

### Backend Deployment (Render)

1.  Connect your GitHub repository to Render and create a new **Web Service**.
2.  Configure the service:
      - **Environment:** `Python 3`
      - **Build Command:** `pip install -r requirements.txt`
      - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
3.  Add your `TELEGRAM_BOT_TOKEN`, `ADMIN_CHAT_ID`, and set `PYTHON_VERSION` to `3.11.6`.
4.  Deploy\!

-----


