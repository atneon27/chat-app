# 🔗 Real-Time Chat App

A simple real-time chat application built using **Socket.IO**, **Express**, and **React Native**.

## 📦 Features

- Real-time messaging using WebSockets
- Unique user assignment on connect
- Message timestamps
- In-memory tracking of connected users

---

## 🛠️ Tech Stack

- **Frontend:** React Native (Expo)
- **Backend:** Node.js + Express
- **WebSockets:** Socket.IO

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/chat-app.git
cd chat-app
```

### 2. Install Dependencies
```bash
cd server
npm install

cd client
npm install
```

### 3. Confguration
In the client folder navigate to the below file
```bash
chat-app/client/.env
```
and within the .env folder add two new env variable in the format below
```bash
SOCKET_SERVER_URL=http://your-device-ip-address
PORT=3000
```

### 4. Start the application
```bash
cd server
tsc --b
node dist/index.js

cd client
npx expo start
```
Make sure both servers are running on the correct IP & ports.