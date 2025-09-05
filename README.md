# ChatGenie


## Screenshots
<img src="screenshot/Screenshot 2025-09-05 at 16-37-29 ChatGenie -elisha.png" width="300"/>
<img src="screenshot/Screenshot 2025-09-05 at 16-37-50 ChatGenie -elisha.png" width="300"/>
<img src="screenshot/Screenshot 2025-09-05 at 16-38-16 ChatGenie -elisha.png" width="300"/>
<img src="screenshot/Screenshot 2025-09-05 at 16-38-28 ChatGenie -elisha.png" width="300"/>
<img src="screenshot/Screenshot 2025-09-05 at 16-38-56 ChatGenie -elisha.png" width="300"/>
<img src="screenshot/Screenshot 2025-09-05 at 16-39-14 ChatGenie -elisha.png" width="300"/>
<img src="screenshot/pexels-anniroenkae-3109807(1).jpg" width="300"/>


**ChatGenie** is a full-stack real-time chat application built with **React, Node.js, Express, Socket.IO, and MongoDB**.  
It features **signup/login authentication**, secure password storage using **bcryptjs**, and a responsive, modern interface styled with **Tailwind CSS**. The project uses **Vite** for fast React builds and is structured as a monorepo for clean front-end/back-end separation.  
The roadmap includes a **cross-platform mobile app** for web + mobile chat experience.

---

## Features

- Real-time messaging powered by **Socket.IO**
- **Signup/Login authentication** with JWT & bcryptjs
- MongoDB database for user and message storage
- Responsive design with **Tailwind CSS**
- Fast front-end build using **Vite**
- Modular monorepo structure
- Future roadmap: **Mobile app integration**

---

## Tech Stack & Key Dependencies

**Front-end:** React, Vite, Tailwind CSS  
**Back-end:** Node.js, Express, Socket.IO, MongoDB  
**Authentication:** bcryptjs, jsonwebtoken  
**Other packages:**  
- cloudinary@2.7.0  
- cors@2.8.5  
- dotenv@17.2.1  
- nodemon@3.1.10  

---

## Folder Structure

chatgenie/
client/ ← React front-end (Vite + Tailwind CSS)
src/
public/
package.json
server/ ← Node.js back-end (Express + Socket.IO + MongoDB)
src/
package.json
README.md


---

## Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/muajjiin/Chat-Genie.git
cd Chat-Genie

2. Install dependencies

# Client
cd client
npm install

# Server
cd ../server
npm install

3. Environment Variables

Create a .env file in the server folder with:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

4. Run the app

# Start server
cd server
npm start

# Start client
cd ../client
npm start

    Open your browser at http://localhost:3000 to use ChatGenie.

Roadmap

    Cross-platform mobile app

    Group chat & chat rooms

    File sharing (images, )

    Enhanced UI/UX

Contributing

 Contributions are welcome via pull requests — please follow the project structure and code style.
