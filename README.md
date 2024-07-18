# Chat Application

## Project Overview
This is a simple real-time chat application built using Next.js, TypeScript, and Socket.io. The application allows users to join a chat room, see a list of online users, and exchange messages in real time.

## Features
- User entry: Users enter their name to join the chat.
- Chat interface: Displays a list of users and chat history.
- Real-time messaging: Users can send and receive messages in real time.
- Persistent chat history: Mock chat history displayed upon user login.
- User registration and login: Simple login by entering a name without passwords.

## Technologies Used
- **Frontend**: Next.js, TypeScript
- **Backend**: Node.js, Express.js, Socket.io
- **Styling**: CSS
- **Tooling**: Docker, Docker Compose

## Project Structure
- `client/`: Contains the Next.js frontend code.
  - `pages/`: Next.js pages for the user entry and chat interface.
  - `styles/`: Global CSS for styling the application.
- `server/`: Contains the Node.js backend code.
  - `server.js`: Main server file handling WebSocket connections and events.

## Prerequisites
- Node.js (version 14 or later)
- Docker and Docker Compose

## Setup Instructions

### Local Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/chat-app.git
   cd chat-app
